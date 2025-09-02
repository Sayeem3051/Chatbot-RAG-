import { useState, useEffect } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isAsking, setIsAsking] = useState(false);

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const uploadPDF = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      
      if (data.status === "success") {
        alert("PDF uploaded successfully!");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert(`Upload failed: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const askQuestion = async () => {
    if (!question.trim()) {
      alert("Please enter a question!");
      return;
    }

    setIsAsking(true);
    const currentQuestion = question;
    setQuestion("");

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: currentQuestion }),
      });

      const data = await res.json();
      
      if (data.error) {
        setChat([...chat, { q: currentQuestion, a: `Error: ${data.error}` }]);
      } else {
        setChat([...chat, { q: currentQuestion, a: data.answer }]);
      }
    } catch (error) {
      setChat([...chat, { q: currentQuestion, a: `Error: ${error.message}` }]);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      {/* Header */}
      <header className="w-full p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-xl ${
              isDarkMode ? 'bg-blue-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'
            }`}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                AI Document Search
              </h1>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Upload PDFs and ask questions with AI
              </p>
            </div>
          </div>
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                : 'bg-white hover:bg-gray-50 text-gray-600 shadow-lg'
            }`}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <div className={`lg:col-span-1 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } rounded-2xl shadow-xl p-6 transition-colors duration-300`}>
            <h2 className={`text-xl font-semibold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Upload Document
            </h2>
            
            <div className="space-y-4">
              <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors duration-300 ${
                file 
                  ? (isDarkMode ? 'border-green-500 bg-green-900/20' : 'border-green-400 bg-green-50')
                  : (isDarkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400')
              }`}>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer block"
                >
                  <svg className={`w-12 h-12 mx-auto mb-3 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {file ? file.name : 'Click to upload PDF'}
                  </p>
                </label>
              </div>

              <button
                onClick={uploadPDF}
                disabled={!file || isUploading}
                className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                  !file || isUploading
                    ? (isDarkMode ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white hover:scale-105 shadow-lg'
                }`}
              >
                {isUploading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Uploading...</span>
                  </div>
                ) : (
                  'Upload PDF'
                )}
              </button>
            </div>
          </div>

          {/* Chat Section */}
          <div className={`lg:col-span-2 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } rounded-2xl shadow-xl transition-colors duration-300`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className={`text-xl font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Chat with Document
              </h2>
            </div>

            {/* Chat Messages */}
            <div className={`h-96 overflow-y-auto p-6 ${
              isDarkMode ? 'bg-gray-900/50' : 'bg-gray-50/50'
            }`}>
              {chat.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <svg className={`w-16 h-16 mx-auto mb-4 ${
                      isDarkMode ? 'text-gray-600' : 'text-gray-400'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <p className={`text-lg ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Upload a PDF and start asking questions!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {chat.map((c, i) => (
                    <div key={i} className="space-y-2">
                      {/* Question */}
                      <div className="flex justify-end">
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          isDarkMode 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-blue-500 text-white'
                        }`}>
                          <p className="text-sm">{c.q}</p>
                        </div>
                      </div>
                      
                      {/* Answer */}
                      <div className="flex justify-start">
                        <div className={`max-w-xs lg:max-w-2xl px-4 py-2 rounded-2xl ${
                          isDarkMode 
                            ? 'bg-gray-700 text-gray-200' 
                            : 'bg-white text-gray-800 border border-gray-200'
                        }`}>
                          <p className="text-sm whitespace-pre-wrap">{c.a}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isAsking && (
                    <div className="flex justify-start">
                      <div className={`max-w-xs lg:max-w-2xl px-4 py-2 rounded-2xl ${
                        isDarkMode 
                          ? 'bg-gray-700 text-gray-200' 
                          : 'bg-white text-gray-800 border border-gray-200'
                      }`}>
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                          <span className="text-sm">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Input Section */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && askQuestion()}
                  placeholder="Ask a question about your document..."
                  className={`flex-1 px-4 py-3 rounded-xl border transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                      : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                  }`}
                  disabled={isAsking}
                />
                <button
                  onClick={askQuestion}
                  disabled={!question.trim() || isAsking}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    !question.trim() || isAsking
                      ? (isDarkMode ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                      : 'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white hover:scale-105 shadow-lg'
                  }`}
                >
                  {isAsking ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
