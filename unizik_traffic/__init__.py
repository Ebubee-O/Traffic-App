from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from .routes import init_routes

db = SQLAlchemy()
login_manager = LoginManager()

def create_app():
    app = Flask(__name__)
    app.config.from_pyfile('../config.py')
    db.init_app(app)
    login_manager.init_app(app)
    login_manager.login_view = 'login'
    init_routes(app)
    with app.app_context():
        db.create_all()  # Create SQLite tables
    return app

@login_manager.user_loader
def load_user(user_id):
    from .models import User
    return User.query.get(int(user_id))
