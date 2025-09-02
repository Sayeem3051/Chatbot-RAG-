from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import tempfile
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.chains import RetrievalQA
from langchain_openai import ChatOpenAI
import os

app = FastAPI()

# Allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Store vector DB globally
vector_db = None
qa_chain = None

class QueryRequest(BaseModel):
    question: str

@app.post("/upload")
async def upload_file(file: UploadFile):
    global vector_db, qa_chain
    
    try:
        # Validate file type
        if not file.filename.lower().endswith('.pdf'):
            return {"status": "error", "message": "Please upload a PDF file."}
        
        # Save PDF temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            content = await file.read()
            if len(content) == 0:
                return {"status": "error", "message": "The uploaded file is empty."}
            tmp.write(content)
            tmp_path = tmp.name

        # Load and split PDF
        try:
            loader = PyPDFLoader(tmp_path)
            docs = loader.load()
            
            if not docs:
                return {"status": "error", "message": "No text could be extracted from the PDF. The file might be corrupted or password-protected."}
                
        except Exception as e:
            return {"status": "error", "message": f"Error reading PDF: {str(e)}. Please ensure the PDF is not corrupted or password-protected."}
        
        splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        chunks = splitter.split_documents(docs)

        # Create embeddings + FAISS vector DB
        embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
        vector_db = FAISS.from_documents(chunks, embeddings)

        # Create QA chain with Mistral
        retriever = vector_db.as_retriever()
        llm = ChatOpenAI(
            model="open-mistral-7b",  # Can also use mistral-medium, mistral-large
            openai_api_key=os.getenv("MISTRAL_API_KEY"),
            openai_api_base="https://api.mistral.ai/v1"
        )
        qa_chain = RetrievalQA.from_chain_type(
            llm=llm,
            retriever=retriever
        )

        # Clean up temporary file
        os.unlink(tmp_path)
        
        return {"status": "success", "message": "PDF processed successfully."}
        
    except Exception as e:
        return {"status": "error", "message": f"An error occurred: {str(e)}"}

@app.post("/chat")
async def chat_with_doc(request: QueryRequest):
    global qa_chain
    if qa_chain is None:
        return {"error": "No document uploaded yet."}

    answer = qa_chain.run(request.question)
    return {"answer": answer}
