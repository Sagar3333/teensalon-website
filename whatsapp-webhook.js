// WhatsApp Webhook Handler for TeenSalon
// This can be deployed to Vercel, Netlify, or any serverless platform

const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// WhatsApp Business API integration
const sendWhatsAppMessage = async (phoneNumber, message) => {
    try {
        // Using Twilio WhatsApp API (you'll need to set up Twilio account)
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER; // Your Twilio WhatsApp number
        
        if (!accountSid || !authToken || !fromNumber) {
            throw new Error('Twilio credentials not configured');
        }
        
        const client = require('twilio')(accountSid, authToken);
        
        const messageResult = await client.messages.create({
            from: `whatsapp:${fromNumber}`,
            to: `whatsapp:+${phoneNumber}`,
            body: message
        });
        
        console.log('WhatsApp message sent:', messageResult.sid);
        return { success: true, messageId: messageResult.sid };
    } catch (error) {
        console.error('WhatsApp API error:', error);
        throw error;
    }
};

// Alternative: Using WhatsApp API service
const sendWhatsAppViaAPI = async (phoneNumber, message) => {
    try {
        // Using a WhatsApp API service like CallMeBot
        const response = await fetch('https://api.callmebot.com/whatsapp.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                phone: phoneNumber,
                text: message,
                apikey: process.env.CALLMEBOT_API_KEY
            })
        });
        
        if (response.ok) {
            const result = await response.text();
            console.log('CallMeBot response:', result);
            return { success: true, response: result };
        } else {
            throw new Error('CallMeBot API failed');
        }
    } catch (error) {
        console.error('CallMeBot API error:', error);
        throw error;
    }
};

// Email notification fallback
const sendEmailNotification = async (phoneNumber, message) => {
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'teensalon01@gmail.com',
        subject: 'New Website Inquiry - TeenSalon',
        html: `
            <h2>New Website Inquiry</h2>
            <p><strong>Phone:</strong> ${phoneNumber}</p>
            <p><strong>Message:</strong></p>
            <pre>${message}</pre>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Website:</strong> teensalsi.com</p>
        `
    };
    
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Email error:', error);
        throw error;
    }
};

// Main webhook endpoint
app.post('/api/send-whatsapp', async (req, res) => {
    try {
        const { phoneNumber, message, type } = req.body;
        
        console.log('Received WhatsApp request:', { phoneNumber, type });
        
        // Try multiple methods
        let result = null;
        
        // Method 1: Try Twilio WhatsApp API
        try {
            result = await sendWhatsAppMessage(phoneNumber, message);
        } catch (error) {
            console.log('Twilio method failed, trying CallMeBot...');
            
            // Method 2: Try CallMeBot API
            try {
                result = await sendWhatsAppViaAPI(phoneNumber, message);
            } catch (error) {
                console.log('CallMeBot method failed, trying email...');
                
                // Method 3: Send email notification
                result = await sendEmailNotification(phoneNumber, message);
            }
        }
        
        res.json({
            success: true,
            method: result.method || 'email',
            messageId: result.messageId,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        service: 'WhatsApp Webhook'
    });
});

// For Vercel deployment
module.exports = app;

// For other platforms
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`WhatsApp webhook server running on port ${PORT}`);
    });
}
