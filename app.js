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
  var htmlReturn = showcase.GenerateAllTemplates(htmlContent, filePath, contentId);

  res.setHeader('Content-Type', 'text/html'); // Set content type to HTML
  //console.log(res);
  res.send(htmlReturn); // Send the updated HTML back to the client
});

app.post('/images', async (req, res) => {
  try {
    var filePath = (req.body.imagePath).replace(/%20/g, ' ');
    var newPath = await showcase.CycleImage(filePath, req.body.direction);

    res.status(200).json({ imgSrc: newPath });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read image folder' });
  }
});

app.listen(port, () => {
  console.log(`Web service listening at http://localhost:${port}`);
});