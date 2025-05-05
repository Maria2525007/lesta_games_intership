import { useState } from 'react';
import { FileUploader } from './components/FileUploader';
import { ResultsTable } from './components/ResultsTable';
import { processTextFile } from './utils/textProcessor';
import { Layout } from './components/Layout';
import { WordData } from './types';

function App() {
  const [results, setResults] = useState<WordData[] | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      const text = await file.text();
      const processedData = processTextFile(text);
      setResults(processedData);
    } catch (err) {
      setError('Failed to process the file. Please try again with a different file');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetResults = () => {
    setResults(null);
    setError(null);
  };

  return (
    <Layout>
      {!results ? (
        <FileUploader 
          onFileUpload={handleFileUpload} 
          isProcessing={isProcessing} 
          error={error} 
        />
      ) : (
        <ResultsTable data={results} resetResults={resetResults} />
      )}
    </Layout>
  );
}

export default App;