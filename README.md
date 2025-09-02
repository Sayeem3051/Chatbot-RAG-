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

- Docker and Docker Compose
- Mistral API key (get one from [Mistral AI](https://console.mistral.ai/))

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-doc-search
   ```

2. **Set up environment variables**
   ```bash
   export MISTRAL_API_KEY="your-mistral-api-key-here"
   ```

3. **Run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
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
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set environment variable**
   ```bash
   export MISTRAL_API_KEY="your-mistral-api-key-here"
   ```

5. **Run the server**
   ```bash
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

### Model Configuration

The application uses the following models by default:
- **Embeddings**: `sentence-transformers/all-MiniLM-L6-v2`
- **LLM**: `open-mistral-7b`

You can modify these in `backend/main.py` if needed.

## Troubleshooting

### Common Issues

1. **"No document uploaded yet" error**
   - Make sure to upload a PDF file before asking questions

2. **API key issues**
   - Verify your Mistral API key is correctly set
   - Check that the API key has sufficient credits

3. **CORS errors**
   - The backend is configured to allow all origins for development
   - For production, update the CORS settings in `backend/main.py`

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
