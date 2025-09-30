// Direct WhatsApp Setup Script for TeenSalon
// This script helps you set up direct WhatsApp message sending

// Step 1: Get your CallMeBot API key
console.log('🚀 Setting up direct WhatsApp messaging...');
console.log('');
console.log('📋 STEP 1: Get your CallMeBot API key');
console.log('1. Go to: https://www.callmebot.com/');
console.log('2. Sign up (free)');
console.log('3. Go to: https://www.callmebot.com/api/');
console.log('4. Click "Get API Key"');
console.log('5. Copy your API key');
console.log('');

// Step 2: Add your phone number to CallMeBot
console.log('📱 STEP 2: Add your phone number');
console.log('1. Go to: https://www.callmebot.com/whatsapp/');
console.log('2. Click "Add your phone number"');
console.log('3. Enter: +918810596216');
console.log('4. Send the verification message');
console.log('');

// Step 3: Update the code
console.log('💻 STEP 3: Update your code');
console.log('Replace this line in script.js:');
console.log('apikey: \'1234567890\' // Replace with your actual CallMeBot API key');
console.log('');
console.log('With your actual API key:');
console.log('apikey: \'YOUR_ACTUAL_API_KEY_HERE\'');
console.log('');

// Step 4: Test the integration
console.log('🧪 STEP 4: Test the integration');
console.log('1. Fill out the appointment form');
console.log('2. Check your WhatsApp (8810596216)');
console.log('3. You should receive the message automatically!');
console.log('');

// API Key placeholder - replace with your actual key
const CALLMEBOT_API_KEY = 'YOUR_API_KEY_HERE';

// Test function
async function testWhatsAppSending() {
    if (CALLMEBOT_API_KEY === 'YOUR_API_KEY_HERE') {
        console.log('❌ Please replace YOUR_API_KEY_HERE with your actual CallMeBot API key');
        return;
    }
    
    const testMessage = 'Test message from TeenSalon website!';
    
    try {
        const response = await fetch('https://api.callmebot.com/whatsapp.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                phone: '918810596216',
                text: testMessage,
                apikey: CALLMEBOT_API_KEY
            })
        });
        
        if (response.ok) {
            console.log('✅ Test message sent successfully!');
            console.log('Check your WhatsApp (8810596216) for the test message');
        } else {
            console.log('❌ Test failed. Check your API key and phone number setup');
        }
    } catch (error) {
        console.log('❌ Test failed:', error.message);
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CALLMEBOT_API_KEY,
        testWhatsAppSending
    };
}

console.log('🎉 Setup complete! Your WhatsApp messages will be sent directly to 8810596216');
