const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const document=require('./Models/Document');


const AuthRouter = require('./Routes/AuthRouter');
require('dotenv').config();
require('./Models/db');
const PORT = 8080;

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);

app.post('/data', async (req, res) => {
    try {
        const { email } = req.body.data;
        console.log(email);
        const data = await document.find({ email: email });
        
        res.json({ data });
    } catch (error) {
        res.status(505).json({ message: 'error occurred: ', error: error.message });
    }
});
const server = http.createServer(app);
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

module.exports={server};