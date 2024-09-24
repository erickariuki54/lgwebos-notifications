const express = require("express");
const app = express();
require("body-parser");

app.use(express.json());

app.post("/tvnotification", async (req, res) => {
    const message = req.body.message;
    
    // Require and connect to the LG TV
    const lgtv = require('lgtv2')({
        url: 'ws://192.168.88.11:3000'  // Update this to your TV's IP address
    });
    
    lgtv.on('error', (err) => {
        console.log('Error connecting to TV:', err);
        res.status(500).send({ error: 'Error connecting to TV' });
    });
    
    lgtv.on('connect', () => {
        console.log('Connected to TV');
    
        // Send a notification (toast message)
        lgtv.request('ssap://system.notifications/createToast', { message: message}, (err, response) => {
            if (err) {
                console.error('Error sending notification:', err);
                res.status(500).send({ error: 'Error sending notification' });
            } else {
                console.log('Notification sent:', response);
                res.status(200).send({ message: 'Notification sent successfully!' });
            }
    
            // Disconnect from the TV after sending the notification
            lgtv.disconnect();
        });
    });
});

// Start the server on a specific port
const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server listening at http://localhost:${port}`);
});
