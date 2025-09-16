UNIZIK Traffic Updates Backend
Overview
Flask backend for UNIZIK Traffic Updates, using SQLite for user authentication and report storage, deployed on PythonAnywhere.
Setup

Install dependencies: pip install -r requirements.txt
Set environment variables in .env.
Deploy on PythonAnywhere with wsgi.py.

API Endpoints

POST /api/signup: Create a new user.
POST /api/login: Authenticate user and return JWT.
POST /api/reports: Submit a traffic report (JWT required).
GET /api/reports/recent: Fetch last 10 reports (JWT required).
