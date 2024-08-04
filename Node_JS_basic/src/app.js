const express = require('express');
const readDatabase = require('./readDatabase');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Read and log the database on startup
readDatabase((data) => {
  console.log('Database contents:', data);
});

// Example route to get all students
app.get('/students', (req, res) => {
  readDatabase((data) => {
    res.json(data);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
