Deploy instructions

1) Push this folder to a GitHub repo (e.g., user/tg-webhook).
2) Deploy to Render (recommended):
   - Create -> Web Service -> Connect your GitHub repo -> branch: main
   - Build Command: npm install
   - Start Command: npm start
   - Set Environment Variables in Render dashboard:
       TELEGRAM_BOT_TOKEN = <your bot token>
       WEBHOOK_SECRET = <long random string>
   - After deploy, you'll get a URL like https://your-app.onrender.com
   - Set Telegram webhook:
       curl -X POST "https://api.telegram.org/bot<YOUR_TOKEN>/setWebhook" \
         -d "url=https://your-app.onrender.com/webhook/<WEBHOOK_SECRET>" \
         -d "max_connections=40"

3) Alternatively use Fly.io or Vercel (instructions in assistant message).

Notes:
- Paste your bot token into the TELEGRAM_BOT_TOKEN env var on the cloud provider dashboard.
- Use a long random string for WEBHOOK_SECRET and keep it secret.
