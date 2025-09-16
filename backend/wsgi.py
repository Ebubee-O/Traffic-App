import sys
import os
from flask import send_from_directory
from unizik_traffic import create_app

# Add the backend directory to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

app = create_app()

# Serve frontend static files
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    static_dir = '/home/yourusername/Real-Time-Traffic-Updates/backend/unizik_traffic/static'
    if path != "" and os.path.exists(os.path.join(static_dir, path)):
        return send_from_directory(static_dir, path)
    return send_from_directory(static_dir, 'index.html')

application = app
