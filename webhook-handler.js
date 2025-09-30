// Webhook handler for TeenSalon website forms
// This file can be deployed to services like Vercel, Netlify, or any server

const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// WhatsApp Business API integration
const sendWhatsAppMessage = async (phoneNumber, message) => {
    // Using Twilio WhatsApp API (you'll need to set up Twilio account)
    const accountSid = AC841e6fec0abbc4351d6d539bbaef068a;
    const authToken = 1fd339ca3e42fe53b3c47b28593bdde2;
    const client = require('twilio')(accountSid, authToken);
    
    try {
        const message = await client.messages.create({
            from: 'whatsapp:+14155238886', // Twilio sandbox number
            to: `whatsapp:+${phoneNumber}`,
            body: message
        });
        
        console.log('WhatsApp message sent:', message.sid);
        return { success: true, messageId: message.sid };
    } catch (error) {
        console.error('WhatsApp API error:', error);
        throw error;
    }
};

// Email notification using Nodemailer
const sendEmailNotification = async (to, subject, message) => {
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
        to: to,
        subject: subject,
        html: `<pre>${message}</pre>`
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

// Webhook endpoint for form submissions
app.post('/api/send-notification', async (req, res) => {
    try {
        const { phoneNumber, message, type } = req.body;
        
        // Send WhatsApp message
        const whatsappResult = await sendWhatsAppMessage('918810596216', message);
        
        // Send email notification
        const emailResult = await sendEmailNotification(
            'teensalon01@gmail.com',
            `New ${type} - TeenSalon`,
            message
        );
        
        res.json({
            success: true,
            whatsapp: whatsappResult,
            email: emailResult
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
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Webhook server running on port ${PORT}`);
});

module.exports = app;
