# AI Document Search (RAG Chatbot)

A powerful AI-powered document search application that allows you to upload PDF documents and ask questions about their content using Retrieval-Augmented Generation (RAG) technology.

## Features

- 📄 **PDF Upload**: Upload PDF documents for processing
- 🤖 **AI Chat**: Ask questions about your documents using Mistral AI
- 🔍 **Vector Search**: Uses FAISS for efficient document retrieval
- 🎨 **Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- 🐳 **Docker Support**: Easy deployment with Docker Compose

## Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **LangChain**: Framework for building LLM applications
- **FAISS**: Vector database for similarity search
- **Mistral AI**: Large language model for question answering
- **HuggingFace Embeddings**: Sentence transformers for document embeddings

### Frontend
- **React**: JavaScript library for building user interfaces
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework

## Prerequisites

- **Node.js** (v14 or higher) and npm
- **Python** (3.9 or higher)
- **Mistral API key** (get one from [Mistral AI](https://console.mistral.ai/))
- **Docker and Docker Compose** (optional, for containerized deployment)

## Quick Start

### 🚀 **Easiest Method: Using Batch Scripts (Windows)**

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sayeem3051/Chatbot-RAG-.git
   cd Chatbot-RAG-
   ```

2. **Get your Mistral API key**
   - Sign up at [Mistral AI](https://console.mistral.ai/)
   - Copy your API key

3. **Edit the batch script**
   - Open `start_backend.bat` in a text editor
   - Replace `your-mistral-api-key-here` with your actual API key

4. **Start the application**
   ```cmd
   # Option A: Start both frontend and backend automatically
   start_all.bat
   
   # Option B: Start them separately
   start_backend.bat
   # Then in another terminal: cd frontend && npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

### 🐳 **Docker Method**

1. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp env.example .env
   
   # Edit .env and add your Mistral API key
   MISTRAL_API_KEY=your-actual-api-key-here
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## Manual Setup (Development)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   
   # Activate virtual environment
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set environment variable**
   ```bash
   # Windows PowerShell:
   $env:MISTRAL_API_KEY="your-mistral-api-key-here"
   
   # Windows Command Prompt:
   set MISTRAL_API_KEY=your-mistral-api-key-here
   
   # macOS/Linux:
   export MISTRAL_API_KEY="your-mistral-api-key-here"
   ```

5. **Run the server (IMPORTANT: Must be run from backend directory)**
   ```bash
   # Make sure you're in the backend directory!
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

### ⚠️ **Important Notes:**
- **Backend**: Always run `uvicorn` from the `backend` directory, not the project root
- **Frontend**: Always run `npm run dev` from the `frontend` directory, not the project root
- **API Key**: Make sure your Mistral API key is set before starting the backend

## Usage

1. **Upload a PDF**: Click "Choose File" and select a PDF document, then click "Upload PDF"
2. **Ask Questions**: Type your question in the input field and click "Ask"
3. **View Responses**: The AI will provide answers based on the content of your uploaded document

## API Endpoints

### POST `/upload`
Upload a PDF file for processing.

**Request**: Multipart form data with PDF file
**Response**: 
```json
{
  "status": "success",
  "message": "PDF processed successfully."
}
```

### POST `/chat`
Ask a question about the uploaded document.

**Request**:
```json
{
  "question": "Your question here"
}
```

**Response**:
```json
{
  "answer": "AI-generated answer based on document content"
}
```

## Configuration

### Environment Variables

- `MISTRAL_API_KEY`: Your Mistral AI API key (required)

### Security Notes

⚠️ **Important Security Information:**
- Never commit your actual API key to version control
- The `.env` file is already included in `.gitignore` to prevent accidental commits
- Use the `env.example` file as a template for your environment variables
- Keep your API keys secure and rotate them regularly

### Model Configuration

The application uses the following models by default:
- **Embeddings**: `sentence-transformers/all-MiniLM-L6-v2`
- **LLM**: `open-mistral-7b`

You can modify these in `backend/main.py` if needed.

## Batch Scripts (Windows)

This project includes convenient batch scripts to simplify startup:

### `start_backend.bat`
- Automatically navigates to the backend directory
- Activates the Python virtual environment
- Sets the Mistral API key
- Starts the FastAPI server

### `start_all.bat`
- Starts both backend and frontend servers automatically
- Opens two terminal windows (one for each server)
- Handles all directory navigation and environment setup

**To customize the API key:**
1. Open `start_backend.bat` in a text editor
2. Replace `your-mistral-api-key-here` with your actual Mistral API key
3. Save the file

**Usage:**
```cmd
# Start both servers
start_all.bat

# Or start backend only
start_backend.bat
```

## Troubleshooting

### Common Issues

1. **"Could not import module 'main'" error**
   - **Cause**: Running uvicorn from the wrong directory
   - **Solution**: Always run `uvicorn main:app` from the `backend` directory, not the project root
   - **Check**: Your terminal should show `C:\path\to\project\backend>` not `C:\path\to\project>`

2. **"Missing script: 'dev'" error**
   - **Cause**: Running `npm run dev` from the wrong directory
   - **Solution**: Always run `npm run dev` from the `frontend` directory, not the project root
   - **Check**: Your terminal should show `C:\path\to\project\frontend>` not `C:\path\to\project>`

3. **"localhost refused to connect" (ERR_CONNECTION_REFUSED)**
   - **Backend not running**: Check if backend is running on http://localhost:8000
   - **Frontend not running**: Check if frontend is running on http://localhost:3000
   - **Solution**: Use `start_all.bat` to start both servers automatically

4. **"No document uploaded yet" error**
   - Make sure to upload a PDF file before asking questions

5. **API key issues**
   - Verify your Mistral API key is correctly set
   - Check that the API key has sufficient credits
   - Make sure the API key is set before starting the backend

6. **CORS errors**
   - The backend is configured to allow all origins for development
   - For production, update the CORS settings in `backend/main.py`

### Quick Fixes

**If you see any import errors:**
```bash
# Navigate to the correct directory first!
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

**If frontend won't start:**
```bash
# Navigate to the correct directory first!
cd frontend
npm run dev
```

**Easy solution - Use the batch scripts:**
```cmd
# This handles everything automatically
start_all.bat
```

### Success Indicators

**Backend is working correctly when you see:**
```
INFO:     Started server process [XXXX]
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     127.0.0.1:XXXXX - "POST /upload HTTP/1.1" 200 OK
INFO:     127.0.0.1:XXXXX - "POST /chat HTTP/1.1" 200 OK
```

**Frontend is working correctly when you see:**
```
VITE v4.5.14  ready in XXX ms
➜  Local:   http://localhost:3000/
➜  Network: http://192.168.1.X:3000/
```

**Normal log messages (not errors):**
- `"GET / HTTP/1.1" 404 Not Found` - This is normal, the root path doesn't exist
- `LangChainDeprecationWarning` - This is just a warning, the app still works

### Performance Tips

- For large PDFs, the processing time may be longer
- The vector database is stored in memory and will be lost when the server restarts
- Consider implementing persistent storage for production use

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue on GitHub.
