import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const Links: React.FC = () => {
  const [links, setLinks] = useState<{ url: string; title: string; description: string; category: string }[]>([]);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLinks([...links, { url, title, description, category }]);
    setUrl('');
    setTitle('');
    setDescription('');
    setCategory('');
  };

  return (
    <div>
      <h1>Links</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value as string)}
            label="Category"
          >
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="Personal">Personal</MenuItem>
            <MenuItem value="Research">Research</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Add Link
        </Button>
      </form>
      <div>
        <h2>Collected Links</h2>
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <strong>{link.title}</strong> - {link.description} ({link.category})
              <br />
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.url}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Links;
