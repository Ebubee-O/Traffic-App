# Real-Time Traffic & Road Updates (UNIZIK Area)

A beautiful Flask app with SQLite for user authentication, report submission with geo-location, and Leaflet map displaying markers for UNIZIK, Ifite, and Temp Site. Users can click on the map to attach locations to reports. Recent reports are listed and shown as map markers.

## Setup
1. Clone repo and cd into folder.
2. Create virtualenv: `python -m venv venv` and activate.
3. Install dependencies: `pip install -r requirements.txt`.
4. Run locally: `python run.py`.
5. Access at `http://127.0.0.1:5000/`.

## Features
- Secure authentication with password hashing.
- Interactive Leaflet map with markers and click-to-select location.
- Responsive Bootstrap design.
- Form validation and flash messages.
- API for reports.

For deployment to PythonAnywhere, use wsgi.py.
