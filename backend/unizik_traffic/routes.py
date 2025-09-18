from flask import request, jsonify
from . import db, bcrypt, jwt
from .models import User, Report
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

def init_routes(app):
    @app.route('/api/signup', methods=['POST'])
    def signup():
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        if not email or not password:
            return jsonify({'error': 'Email and password required'}), 400
        if User.query.filter_by(email=email).first():
            return jsonify({'error': 'Email exists'}), 400
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        user = User(email=email, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'User created'}), 201

    @app.route('/api/login', methods=['POST'])
    def login():
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        user = User.query.filter_by(email=email).first()
        if not user or not bcrypt.check_password_hash(user.password, password):
            return jsonify({'error': 'Invalid credentials'}), 401
        access_token = create_access_token(identity=user.id)
        return jsonify({'token': access_token}), 200

    @app.route('/api/reports', methods=['POST'])
    @jwt_required()
    def submit_report():
        data = request.get_json()
        if not data or 'text' not in data:
            return jsonify({'error': 'Report text required'}), 400
        user_id = get_jwt_identity()
        report = Report(text=data['text'], user_id=user_id)
        db.session.add(report)
        db.session.commit()
        return jsonify({'id': report.id, 'text': report.text}), 201

    @app.route('/api/reports/recent', methods=['GET'])
    @jwt_required()
    def get_recent_reports():
        reports = Report.query.order_by(Report.timestamp.desc()).limit(10).all()
        return jsonify([{'id': r.id, 'text': r.text, 'timestamp': r.timestamp.isoformat(), 'user_id': r.user_id} for r in reports])
