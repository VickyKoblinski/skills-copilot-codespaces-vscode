// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Read comments from file
const readComments = () => {
  const comments = fs.readFileSync('comments.json');
  return JSON.parse(comments);
};

// Write comments to file
const writeComments = (comments) => {
  fs.writeFileSync('comments.json', JSON.stringify(comments));
};

// Get all comments
app.get('/comments', (req, res) => {
  const comments = readComments();
  res.send(comments);
});

// Add a new comment
app.post('/comments', (req, res) => {
  const comments = readComments();
  comments.push(req.body);
  writeComments(comments);
  res.send('Comment added');
});

// Start server
app.listen(3000, () => {
  console.log('Server started');
});