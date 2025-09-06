@echo off
echo Starting RAG Chatbot Application...
echo.

echo [1/2] Starting Backend Server...
cd /d "C:\Users\shaba\rag"
start "Backend" cmd /k "cd backend && call venv\Scripts\activate.bat && set MISTRAL_API_KEY=your-mistral-api-key-here && uvicorn main:app --host 0.0.0.0 --port 8000"

echo [2/2] Starting Frontend Server...
start "Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ✅ Both servers are starting...
echo ✅ Backend will be available at: http://localhost:8000
echo ✅ Frontend will be available at: http://localhost:3000
echo.
echo Press any key to continue...
pause > nul
