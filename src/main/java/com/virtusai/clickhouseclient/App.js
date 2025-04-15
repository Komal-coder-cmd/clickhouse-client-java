import logo from './logo.svg';
import './App.css';
import App from './src/App';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [sourceType, setSourceType] = useState('');
  const [targetType, setTargetType] = useState('');
  const [jwtToken, setJwtToken] = useState('');
  const [columns, setColumns] = useState('');
  const [filePath, setFilePath] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/ingest', {
        jwt_token: jwtToken,
        source_type: sourceType,
        target_type: targetType,
        columns: columns.split(','),
        file_path: filePath,
      });
      setStatus(response.data.message);
    } catch (error) {
      setStatus('Error: ' + error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h1>Bidirectional Data Ingestion Tool</h1>
      <label>
        Source Type:
        <select onChange={(e) => setSourceType(e.target.value)}>
          <option value="ClickHouse">ClickHouse</option>
          <option value="FlatFile">Flat File</option>
        </select>
      </label>
      <label>
        Target Type:
        <select onChange={(e) => setTargetType(e.target.value)}>
          <option value="ClickHouse">ClickHouse</option>
          <option value="FlatFile">Flat File</option>
        </select>
      </label>
      <input type="text" placeholder="JWT Token" onChange={(e) => setJwtToken(e.target.value)} />
      <input type="text" placeholder="Columns (comma-separated)" onChange={(e) => setColumns(e.target.value)} />
      <input type="text" placeholder="File Path" onChange={(e) => setFilePath(e.target.value)} />
      <button onClick={handleSubmit}>Start Ingestion</button>
      <p>Status: {status}</p>
    </div>
  );
}
export default App;
