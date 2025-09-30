# Twilio WhatsApp Setup Guide

## Step-by-Step Guide to Get Twilio Credentials

### Step 1: Create Twilio Account

1. **Go to:** https://www.twilio.com/
2. **Click "Sign up"** (it's free to start)
3. **Fill out the registration form:**
   - Email address
   - Password
   - Phone number for verification
4. **Verify your email and phone number**

### Step 2: Get Your Account Credentials

#### After logging into Twilio Console:

1. **Go to:** https://console.twilio.com/
2. **On the dashboard, you'll see:**
   - **Account SID** - This is your `TWILIO_ACCOUNT_SID`
   - **Auth Token** - This is your `TWILIO_AUTH_TOKEN` (click the eye icon to reveal it)

### Step 3: Set Up WhatsApp Sandbox

#### Method 1: WhatsApp Sandbox (Free for Testing)

1. **In Twilio Console, go to:**
   - **Messaging** → **Try it out** → **Send a WhatsApp message**

2. **Follow the WhatsApp Sandbox setup:**
   - You'll get a sandbox number like: `+1 415 523 8886`
   - Send a message to this number from your WhatsApp: `join <sandbox-code>`
   - This is your `TWILIO_WHATSAPP_NUMBER`

#### Method 2: WhatsApp Business API (Production)

1. **Go to:** https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn
2. **Click "Get started with WhatsApp"**
3. **Follow the approval process** (takes 1-2 business days)
4. **Once approved, you'll get your WhatsApp Business number**

### Step 4: Get Your Credentials

#### From Twilio Console Dashboard:

```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=+14155238886  (Sandbox number)
```

#### For Production (after WhatsApp Business approval):

```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=+1234567890  (Your approved WhatsApp Business number)
```

### Step 5: Test Your Setup

#### Test Message Format:
```javascript
// Test message to your phone (8810596216)
const testMessage = {
    to: "whatsapp:+918810596216",
    from: "whatsapp:+14155238886", // Your Twilio WhatsApp number
    body: "Test message from TeenSalon website!"
};
```

### Step 6: Pricing Information

#### WhatsApp Sandbox (Free):
- **Free for testing**
- **Limited to sandbox conversations**
- **Perfect for development**

#### WhatsApp Business API (Production):
- **$0.005 per message** (very cheap)
- **No monthly fees**
- **Pay only for messages sent**

### Step 7: Alternative - CallMeBot (Free Option)

If you don't want to use Twilio, you can use CallMeBot (completely free):

1. **Go to:** https://www.callmebot.com/
2. **Create account**
3. **Get your API key**
4. **Add your phone number to their system**

### Step 8: Environment Variables Setup

#### For Vercel Deployment:
1. **Go to your Vercel dashboard**
2. **Select your project**
3. **Go to Settings → Environment Variables**
4. **Add these variables:**

```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=+14155238886
```

#### For Netlify Deployment:
1. **Go to your Netlify dashboard**
2. **Select your site**
3. **Go to Site settings → Environment variables**
4. **Add the same variables**

### Step 9: Test the Integration

#### Test Steps:
1. **Deploy your website**
2. **Fill out the appointment form**
3. **Check your WhatsApp (8810596216)**
4. **Check your email (teensalon01@gmail.com)**

### Troubleshooting

#### Common Issues:

1. **"WhatsApp number not verified"**
   - Make sure you've joined the sandbox
   - Send `join <sandbox-code>` to the sandbox number

2. **"Invalid phone number format"**
   - Use format: `+918810596216` (with country code)
   - No spaces or special characters

3. **"Authentication failed"**
   - Check your Account SID and Auth Token
   - Make sure they're correct in environment variables

### Support Resources

- **Twilio Documentation:** https://www.twilio.com/docs/whatsapp
- **Twilio Support:** https://support.twilio.com/
- **WhatsApp Business API:** https://business.whatsapp.com/

### Quick Start (5 Minutes)

1. **Sign up for Twilio** (free)
2. **Get your Account SID and Auth Token**
3. **Set up WhatsApp Sandbox**
4. **Add environment variables to your hosting**
5. **Test with your phone number**

That's it! You'll be receiving WhatsApp messages on 8810596216 within minutes.
