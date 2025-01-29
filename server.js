const express = require('express');
const app = express();

app.get('/Ping', (req, res) => {
    res.send('Pong');
    });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    });
