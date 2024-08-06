const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const Document = require('./Models/Document');
const socketHandler = require('./Controllers/socket');
const { getData, createNewPage, deletePage } = require('./Controllers/journalPage');
const valid=require('./Controllers/Auth')

const AuthRouter = require('./Routes/AuthRouter');
require('dotenv').config();
require('./Models/db');
const PORT = 8080;

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);

app.get('/ping', (req, res) => {
    res.send('PONG');
});


app.post('/data',getData );
app.post('/newPage',createNewPage);
app.post('/delete',deletePage);
app.post('/auth/valid',valid);

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "https://wellness-app-5f6y.onrender.com/",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    socketHandler(socket);
});

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});