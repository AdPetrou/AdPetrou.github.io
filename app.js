const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

var showcase = require('./scripts/showcase.js')
app.use(express.static(__dirname));

app.get('/', async(req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/finished', (req, res) => {
  console.log('Received notification from client');
  // Execute server-side tasks here
  showcase.generateAllTemplates();
  res.send('Server notified');
});

app.listen(port, () => {
  console.log(`Web service listening at http://localhost:${port}`);
});