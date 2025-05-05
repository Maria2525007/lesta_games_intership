import { ReactNode } from 'react';
import {BarChart, FileText} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
          <header className="bg-white shadow-sm">
              <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                  <div className="flex items-center">
                      <BarChart className="h-8 w-8 text-blue-500"/>
                      <h1 className="ml-3 text-2xl font-semibold text-gray-900">TextAnalyzer</h1>
                  </div>
                  <a
                      href="https://en.wikipedia.org/wiki/Tf%E2%80%93idf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                  >
                      <FileText className="h-4 w-4 mr-1"/>
                      About TF-IDF
                  </a>
              </div>
          </header>

          <main className="max-w-7xl mx-auto py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
              {children}
          </main>

          <footer className="bg-white mt-auto border-t border-gray-200">
              <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                  <p className="text-center text-sm text-gray-500">
                      Text analysis tool for calculating TF-IDF metrics
                  </p>
              </div>
          </footer>
      </div>
  );
};