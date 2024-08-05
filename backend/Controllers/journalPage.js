// Controllers/documentController.js

const Document = require('../Models/Document');

async function getData(req, res){
    try {
        const { email } = req.body.data;
        const data = await Document.find({ email: email });
        res.json({ data });
    } catch (error) {
        res.status(505).json({ message: 'error occurred: ', error: error.message });
    }
};

const createNewPage = async (req, res) => {
    try {
        const { email, _id, date, data } = req.body.data;
        console.log(req.body.data);
        await Document.create({ _id: _id, data: data, date: date, email: email });
        res.send("success");
    } catch (error) {
        res.status(505).json({ message: 'error occurred: ', error: error.message });
    }
};

const deletePage = async (req, res) => {
    try {
        const { _id } = req.body.data;
        await Document.findByIdAndDelete(_id);
        res.send("success");
    } catch (error) {
        res.status(505).json({ message: 'error occurred: ', error: error.message });
    }
};

module.exports = {
    getData,
    createNewPage,
    deletePage
};