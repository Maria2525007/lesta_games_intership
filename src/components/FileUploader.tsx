import React, { useCallback, useState } from 'react';
import { Upload, FileWarning, Loader } from 'lucide-react';

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
  isProcessing: boolean;
  error: string | null;
}

export const FileUploader = ({ onFileUpload, isProcessing, error }: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        setFileName(file.name);
        onFileUpload(file);
      } else {
        alert('Please upload a text file (.txt)');
      }
    }
  }, [onFileUpload]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        setFileName(file.name);
        onFileUpload(file);
      } else {
        alert('Please upload a text file (.txt)');
      }
    }
  }, [onFileUpload]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white overflow-hidden shadow-md rounded-lg transition-all duration-300">
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Text File Analysis</h2>
            <p className="text-sm text-gray-500 mb-6">
              Upload a text file to analyze term frequency and inverse document frequency
            </p>
          </div>
          
          <div 
            className={`mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors duration-300 ${
              isDragging 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-blue-500'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="space-y-1 text-center">
              {isProcessing ? (
                <div className="mx-auto flex flex-col items-center">
                  <Loader className="h-12 w-12 text-blue-500 animate-spin" />
                  <p className="mt-4 text-sm text-gray-600">Processing your file...</p>
                  {fileName && <p className="mt-1 text-xs text-gray-500">{fileName}</p>}
                </div>
              ) : (
                <>
                  <div className="mx-auto flex justify-center">
                    <Upload className={`h-12 w-12 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
                  </div>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept=".txt,text/plain"
                        onChange={handleFileChange}
                        disabled={isProcessing}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">TEXT files up to 10MB</p>
                </>
              )}
            </div>
          </div>

          {error && (
            <div className="mt-4 flex items-center justify-center text-red-600">
              <FileWarning className="h-5 w-5 mr-2" />
              <span>{error}</span>
            </div>
          )}

          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900">What will you get?</h3>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-blue-600">Word Frequency</h4>
                <p className="text-sm text-gray-600 mt-1">See how many times each word appears in your text</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-blue-600">TF (Term Frequency)</h4>
                <p className="text-sm text-gray-600 mt-1">How often a word appears in the document</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-blue-600">IDF (Inverse Document Frequency)</h4>
                <p className="text-sm text-gray-600 mt-1">How unique or rare a word is in the document</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};