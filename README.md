# TextAnalyzer - TF-IDF Analysis Tool

Autor: Makhumdova Maria

A modern web application for analyzing text documents using TF-IDF (Term Frequency-Inverse Document Frequency) metrics. This tool helps you understand the importance and frequency of words in your text documents.

## Features

- 📤 Drag-and-drop file upload
- 📊 TF-IDF analysis of text documents
- 📑 Paginated results table
- 📈 Word frequency statistics
- ⬇️ Export results to CSV
- 🎨 Modern, responsive UI

## Prerequisites

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Maria2525007/lesta_games_intership.git
```

2. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Usage

1. Open the application in your web browser
2. Upload a text file using drag-and-drop or the file browser
3. Click "Analyze Text" to process the file
4. View the results in the table:
   - Word: The analyzed term
   - TF (Term Frequency): How often the word appears in the document
   - IDF (Inverse Document Frequency): Measure of word importance
5. Use the pagination controls to navigate through results
6. Export results to CSV for further analysis

## Technical Details

- Built with React 18 and TypeScript
- Styled using Tailwind CSS
- File processing with Web File API
- TF-IDF calculation implementation in TypeScript
