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
        const data = await document.find({ email: email });
        
        res.json({ data });
    } catch (error) {
        res.status(505).json({ message: 'error occurred: ', error: error.message });
    }
});
app.post('/newPage',async(req,res)=>{
    try{
        const{email,_id,date,data}=req.body.data;
        console.log(req.body.data);
    await document.create({ _id: _id, data: data, date: date, email: email });
    res.send("sucess");
    }
catch (error) {
    res.status(505).json({ message: 'error occurred: ', error: error.message });
}  
})

app.post('/delete',async(req,res)=>{
    try{
        const{_id}=req.body.data;
        await document.findByIdAndDelete(_id);
    res.send("sucess");
    }
catch (error) {
    res.status(505).json({ message: 'error occurred: ', error: error.message });
}  
})
const server = http.createServer(app);
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

module.exports={server};