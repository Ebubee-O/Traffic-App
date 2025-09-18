Traffic App
A vibrant, lightweight web app for real-time traffic updates around UNIZIK/Ifite, built with React, Flask, and SQLite. Uses OpenStreetMap for maps.
Setup

Backend: cd backend && pip install -r requirements.txt
Frontend: cd frontend && npm install && npm run build && cp -r dist/* ../backend/unizik_traffic/static/
GitHub: Push to https://github.com/Ebubee-O/Traffic-App
PythonAnywhere:
Clone: git clone https://github.com/Ebubee-O/Traffic-App.git
Upload backend/.env
Virtualenv: mkvirtualenv unizik-traffic-env && pip install -r backend/requirements.txt
Run: cd backend && python -c "from unizik_traffic import create_app; app = create_app();"
Web app: Configure WSGI to backend/wsgi.py, static files to backend/unizik_traffic/static/



Features

Login/signup with secure authentication
Submit/view traffic reports
Interactive UNIZIK/Ifite map (OpenStreetMap)
Colorful, modern UI with Tailwind CSS

