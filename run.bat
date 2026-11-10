@echo off
title Prakruthi Restaurant Server
color 0E
echo ========================================================
echo         PRAKRUTHI RESTAURANT WEB APPLICATION
echo ========================================================
echo.
echo Starting application...
cd /d "%~dp0"

echo Checking requirements...
python -m pip install -r requirements.txt >nul 2>&1

echo Opening browser...
start http://localhost:5000

echo.
echo Server running at http://localhost:5000
echo Admin Portal at http://localhost:5000/admin/login (admin / admin123)
echo.
echo Press Ctrl+C in this window anytime to stop the server.
echo ========================================================
echo.

python app.py
pause
