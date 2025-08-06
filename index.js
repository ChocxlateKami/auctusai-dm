const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));
app.use(express.json());

// Webhook verification
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  
  if (mode === 'subscribe' && token === process.env.WEBHOOK_VERIFY_TOKEN) {
    console.log('Webhook verified');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Webhook events
app.post('/webhook', (req, res) => {
  console.log('Webhook event received:', req.body);
  res.status(200).send('OK');
});

// Auth callback
app.get('/auth/callback', (req, res) => {
  res.send('Instagram authentication successful');
});

app.get('/deauth', (req, res) => {
  console.log('Deauth route hit');
  res.send('Deauthorization endpoint reached');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`AuctusAI DM server running on port ${PORT}`);
});
