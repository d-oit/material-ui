import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<{ url: string; title: string; description: string; category: string }[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate search results
    const mockResults = [
      { url: 'https://example.com', title: 'Example', description: 'An example link', category: 'Work' },
      { url: 'https://example2.com', title: 'Example 2', description: 'Another example link', category: 'Personal' },
    ];
    setResults(mockResults);
  };

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSearch}>
        <TextField
          label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </form>
      <div>
        <h2>Search Results</h2>
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              <strong>{result.title}</strong> - {result.description} ({result.category})
              <br />
              <a href={result.url} target="_blank" rel="noopener noreferrer">
                {result.url}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;
