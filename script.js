const axios = require('axios');
const express = require('express');

const app = express();
const port = 3000;

// List of websites to ping
const websites = [
    'https://aboard-fluffy-brush.glitch.me/',
    'https://accurate-spectrum-ricotta.glitch.me/',
    'https://facebook.com'
];


// Custom request headers
const customHeaders = {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'max-age=0',
    'Priority': 'u=0, i',
    'Referer': 'https://glitch.com/',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1'
};

// Function to ping websites
async function pingWebsites() {
    try {
        for (const website of websites) {
            const response = await axios.get(website, { headers: customHeaders });
            console.log(`${website} is reachable, status: ${response.status}`);
        }
        console.log('All websites pinged successfully.');
    } catch (error) {
        console.error('Error pinging websites:', error.message);
    }
}

// Ping websites every 5 minutes
setInterval(pingWebsites, 5 * 60 * 1000);

// Initial ping when script starts
pingWebsites();

// Express routes
app.get('/', (req, res) => {
    res.send('Server is running and pinging websites every 5 minutes.');
});

// Start Express server
app.listen(port, () => {
    console.log(`Express server listening at http://localhost:${port}`);
});
