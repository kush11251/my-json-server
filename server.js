const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const assetsPath = path.join(__dirname, 'assets');
const data = {};

// Load JSON data from assets folder
fs.readdirSync(assetsPath).forEach(file => {
  if (file.endsWith('.json')) {
    const key = file.replace('.json', '');
    try {
      data[key] = JSON.parse(fs.readFileSync(path.join(assetsPath, file), 'utf8'));
    } catch (err) {
      console.error(`Error loading ${file}:`, err);
      data[key] = [];
    }
  }
});

// Create routes for each JSON file
Object.keys(data).forEach(key => {
  // GET /key - Get all items
  app.get(`/${key}`, (req, res) => {
    res.json(data[key]);
  });

  // GET /key/:id - Get single item
  app.get(`/${key}/:id`, (req, res) => {
    const id = parseInt(req.params.id);
    const item = data[key].find(i => i.id === id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  });

  // POST /key - Create new item
  app.post(`/${key}`, (req, res) => {
    const newItem = req.body;
    if (Array.isArray(data[key])) {
      // Assume items have id, auto-increment
      const maxId = data[key].length > 0 ? Math.max(...data[key].map(i => i.id || 0)) : 0;
      newItem.id = maxId + 1;
      data[key].push(newItem);
    } else {
      data[key] = newItem;
    }
    res.status(201).json(newItem);
  });

  // PUT /key/:id - Update item
  app.put(`/${key}/:id`, (req, res) => {
    const id = parseInt(req.params.id);
    const item = data[key].find(i => i.id === id);
    if (item) {
      Object.assign(item, req.body);
      res.json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  });

  // DELETE /key/:id - Delete item
  app.delete(`/${key}/:id`, (req, res) => {
    const id = parseInt(req.params.id);
    const index = data[key].findIndex(i => i.id === id);
    if (index !== -1) {
      data[key].splice(index, 1);
      res.json({ message: 'Item deleted' });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`JSON Server running on port ${port}`);
  console.log('Available endpoints:');
  Object.keys(data).forEach(key => {
    console.log(`  GET, POST /${key}`);
    console.log(`  GET, PUT, DELETE /${key}/:id`);
  });
});