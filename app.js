const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;

var showcase = require('./scripts/showcase.js')
app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/', async(req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/process-html', (req, res) => {
  const htmlContent = req.body.htmlContent;
  const filePath = req.body.filePath;
  const contentId = req.body.contentId;
  // Execute server-side tasks here
  var htmlReturn = showcase.generateAllTemplates(htmlContent, filePath, contentId);

  res.setHeader('Content-Type', 'text/html'); // Set content type to HTML
  //console.log(res);
  res.send(htmlReturn); // Send the updated HTML back to the client
});

app.listen(port, () => {
  console.log(`Web service listening at http://localhost:${port}`);
});