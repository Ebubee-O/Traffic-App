Traffic App Backend
Flask backend with SQLite for user authentication and traffic reports.
Setup

Install: pip install -r requirements.txt
Upload .env with secrets.
Initialize DB: python -c "from unizik_traffic import create_app; app = create_app();"
Deploy: Configure WSGI to wsgi.py.

Endpoints

POST /api/signup: Create user
POST /api/login: Get JWT
POST /api/reports: Submit report
GET /api/reports/recent: Get last 10 reports
