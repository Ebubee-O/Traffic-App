#!/bin/bash
cd frontend
npm install
npm run build
cp -r dist/* ../backend/unizik_traffic/static/
cd ..
git add .
git commit -m "Deploy new build"
git push origin main
