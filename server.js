const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '')));

// Endpoint to retrieve JSON data
app.get('/api/data', (req, res) => {
  const dataPath = path.join(__dirname, 'data.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading data file');
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Parse incoming data with middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// POST endpoint to append JSON data
app.post('/api/feedback', (req, res) => {
  const dataPath = path.join(__dirname, 'data.json');
  const newData = req.body;
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading data file');
      return;
    }
    const currentData = JSON.parse(data);
    currentData.push(newData);
    fs.writeFile(dataPath, JSON.stringify(currentData), err => {
      if (err) {
        console.error(err);
        res.status(500).send('Error writing to data file');
        return;
      }
      res.send('Data successfully appended');
    });
  });
});

// Handles any requests that don't match the above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port);

console.log(`App is listening on port ${port}`);
