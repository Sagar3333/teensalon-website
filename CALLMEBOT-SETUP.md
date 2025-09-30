# CallMeBot Setup (Free WhatsApp API)

## Why CallMeBot?
- ✅ **Completely FREE**
- ✅ **No credit card required**
- ✅ **Setup in 5 minutes**
- ✅ **Works immediately**

## Step 1: Create CallMeBot Account

1. **Go to:** https://www.callmebot.com/
2. **Click "Sign up"**
3. **Fill out the form:**
   - Email address
   - Password
   - Your phone number: `+918810596216`

## Step 2: Get Your API Key

1. **After signing up, go to:** https://www.callmebot.com/api/
2. **Click "Get API Key"**
3. **Copy your API key** (looks like: `1234567890`)

## Step 3: Add Your Phone Number

1. **Go to:** https://www.callmebot.com/whatsapp/
2. **Click "Add your phone number"**
3. **Enter your phone:** `+918810596216`
4. **Send the verification message** to the provided number

## Step 4: Update Your Website Code

### Update the script.js file:

```javascript
// Replace this line in script.js:
apikey: 'YOUR_API_KEY' // You'll need to get this from callmebot.com

// With your actual API key:
apikey: '1234567890' // Your actual CallMeBot API key
```

### Or update the webhook:

```javascript
// In whatsapp-webhook.js, replace:
apikey: process.env.CALLMEBOT_API_KEY

// With:
apikey: '1234567890' // Your actual API key
```

## Step 5: Test the Integration

1. **Fill out the appointment form on your website**
2. **Check your WhatsApp (8810596216)**
3. **You should receive the message automatically!**

## Step 6: Deploy to Production

### For Vercel:
1. **Go to Vercel dashboard**
2. **Select your project**
3. **Go to Settings → Environment Variables**
4. **Add:**
   ```
   CALLMEBOT_API_KEY=1234567890
   ```

### For Netlify:
1. **Go to Netlify dashboard**
2. **Select your site**
3. **Go to Site settings → Environment variables**
4. **Add the same variable**

## Pricing: FREE! 🎉

- **No monthly fees**
- **No per-message charges**
- **Unlimited messages**
- **Perfect for small businesses**

## Troubleshooting

### "API key not working"
- Make sure you copied the correct API key
- Check that your phone number is verified

### "Phone number not verified"
- Send the verification message to the provided number
- Wait a few minutes for verification

### "Message not received"
- Check your WhatsApp is working
- Make sure the phone number format is correct: `+918810596216`

## Support

- **CallMeBot Documentation:** https://www.callmebot.com/api/
- **Email Support:** Available on their website
- **Community Forum:** Check their website for help

## Quick Setup (3 Minutes)

1. **Sign up at callmebot.com**
2. **Get your API key**
3. **Add your phone number**
4. **Update the code with your API key**
5. **Deploy and test!**

That's it! You'll be receiving WhatsApp messages on 8810596216 within minutes, completely free!
