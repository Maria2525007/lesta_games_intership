import { useState } from 'react';
import { ArrowUpDown, ArrowLeft, Download } from 'lucide-react';
import { WordData } from '../types';

interface ResultsTableProps {
  data: WordData[];
  resetResults: () => void;
}

export const ResultsTable = ({ data, resetResults }: ResultsTableProps) => {
  const [sortField, setSortField] = useState<'word' | 'tf' | 'idf'>('idf');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const sortedData = [...data].sort((a, b) => {
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    return multiplier * (a[sortField] > b[sortField] ? 1 : -1);
  });

  const handleSort = (field: 'word' | 'tf' | 'idf') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleDownloadCSV = () => {
    const csvContent = [
      ['Word', 'TF', 'IDF'].join(','),
      ...sortedData.map(item => [
        item.word,
        item.tf.toString(),
        item.idf.toFixed(6)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'tf-idf-results.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getSortIcon = (field: 'word' | 'tf' | 'idf') => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 ml-1 text-gray-400" />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUpDown className="h-4 w-4 ml-1 text-blue-500 rotate-180" />
    ) : (
      <ArrowUpDown className="h-4 w-4 ml-1 text-blue-500" />
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Analysis Results</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Top 50 words sorted by {sortField.toUpperCase()}
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleDownloadCSV}
              className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Download className="h-4 w-4 mr-1" />
              Export CSV
            </button>
            <button
              onClick={resetResults}
              className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </button>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
                    onClick={() => handleSort('word')}
                  >
                    <div className="flex items-center">
                      Word
                      {getSortIcon('word')}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
                    onClick={() => handleSort('tf')}
                  >
                    <div className="flex items-center">
                      TF
                      <span className="text-[10px] text-gray-400 ml-1">(term frequency)</span>
                      {getSortIcon('tf')}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
                    onClick={() => handleSort('idf')}
                  >
                    <div className="flex items-center">
                      IDF
                      <span className="text-[10px] text-gray-400 ml-1">(inverse document frequency)</span>
                      {getSortIcon('idf')}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedData.map((item, idx) => (
                  <tr 
                    key={item.word}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.word}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.tf}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.idf.toFixed(6)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};