import express from 'express';
import bodyParser from 'body-parser';
import FormData from 'form-data';
import fetch from 'node-fetch';
import cors from 'cors'; 

const apiKey = 'xxx';
const apiUrl = 'https://api.codepal.ai/v1/code-generator/query';
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use the cors middleware to allow requests from any origin
app.use(cors());

app.post('/expression', (req, res) => {
  const formData = new FormData();
  formData.append('language', 'javascript');
  formData.append('instructions', req.body.instructions);

  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`
    },
    body: formData
  };

  fetch(apiUrl, options)
    .then(response => response.json())
    .then(data => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

      res.json(data);
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while making the request' });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
