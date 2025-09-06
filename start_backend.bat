@echo off
cd /d "C:\Users\shaba\rag\backend"
call venv\Scripts\activate.bat
set MISTRAL_API_KEY=your-mistral-api-key-here
echo Starting backend server from backend directory...
echo Current directory: %CD%
uvicorn main:app --host 0.0.0.0 --port 8000
pause
