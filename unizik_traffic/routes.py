from flask import request, jsonify, render_template, redirect, url_for, flash
from flask_login import login_user, logout_user, current_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash
from .models import Report, User, db
from .forms import LoginForm, SignupForm, ReportForm
from datetime import datetime

def init_routes(app):
    @app.route('/', methods=['GET', 'POST'])
    @login_required
    def index():
        form = ReportForm()
        if form.validate_on_submit():
            report = Report(text=form.text.data, timestamp=datetime.utcnow(), user_id=current_user.id, latitude=form.latitude.data, longitude=form.longitude.data)
            db.session.add(report)
            db.session.commit()
            flash('Report submitted successfully!', 'success')
            return redirect(url_for('index'))
        reports = Report.query.order_by(Report.timestamp.desc()).limit(10).all()
        return render_template('index.html', form=form, reports=reports, current_user=current_user)

    @app.route('/login', methods=['GET', 'POST'])
    def login():
        form = LoginForm()
        if form.validate_on_submit():
            user = User.query.filter_by(email=form.email.data).first()
            if user and check_password_hash(user.password_hash, form.password.data):
                login_user(user)
                flash('Login successful!', 'success')
                return redirect(url_for('index'))
            else:
                flash('Invalid email or password', 'danger')
        return render_template('login.html', form=form)

    @app.route('/signup', methods=['GET', 'POST'])
    def signup():
        form = SignupForm()
        if form.validate_on_submit():
            if User.query.filter_by(email=form.email.data).first():
                flash('Email already exists', 'danger')
            else:
                hashed_password = generate_password_hash(form.password.data)
                user = User(email=form.email.data, password_hash=hashed_password)
                db.session.add(user)
                db.session.commit()
                flash('Signup successful! Please log in.', 'success')
                return redirect(url_for('login'))
        return render_template('signup.html', form=form)

    @app.route('/logout')
    @login_required
    def logout():
        logout_user()
        flash('Logged out successfully', 'success')
        return redirect(url_for('login'))

    @app.route('/api/reports', methods=['POST'])
    @login_required
    def submit_report():
        data = request.get_json()
        if not data or 'text' not in data:
            return jsonify({'error': 'Report text is required'}), 400
        report = Report(text=data['text'], timestamp=datetime.utcnow(), user_id=current_user.id, latitude=data.get('latitude'), longitude=data.get('longitude'))
        db.session.add(report)
        db.session.commit()
        return jsonify({'id': report.id, 'text': report.text}), 201

    @app.route('/api/reports/recent', methods=['GET'])
    def get_recent_reports():
        reports = Report.query.order_by(Report.timestamp.desc()).limit(10).all()
        return jsonify([{'id': r.id, 'text': r.text, 'timestamp': r.timestamp.isoformat(), 'user_id': r.user_id, 'latitude': r.latitude, 'longitude': r.longitude} for r in reports])
