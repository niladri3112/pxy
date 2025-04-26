const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 8000;

app.get('/proxy', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).send('Missing URL');
    }

    try {
        const response = await fetch(url);
        const text = await response.text();
        res.set('Content-Type', 'application/xml');
        res.send(text);
    } catch (error) {
        console.error('Error fetching URL:', error);
        res.status(500).send('Failed to fetch URL');
    }
});

app.listen(PORT, () => {
    console.log(`CORS Proxy Server running at http://localhost:${PORT}`);
});

