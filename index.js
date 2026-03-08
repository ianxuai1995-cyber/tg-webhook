// Simple Express webhook server for Telegram
const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'change-me-please-use-a-random-string';

if (!TELEGRAM_BOT_TOKEN) {
  console.error('ERROR: TELEGRAM_BOT_TOKEN not set');
  process.exit(1);
}

app.post(`/webhook/${WEBHOOK_SECRET}`, async (req, res) => {
  try {
    const update = req.body;
    console.log('Received update:', JSON.stringify(update, null, 2));

    if (update.message && update.message.chat && update.message.text) {
      const chatId = update.message.chat.id;
      const text = update.message.text;

      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const body = { chat_id: chatId, text: `你說：${text}` };
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }).catch(err => console.error('sendMessage error', err));
    }

    res.status(200).send('OK');
  } catch (err) {
    console.error(err);
    res.status(500).send('ERR');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
