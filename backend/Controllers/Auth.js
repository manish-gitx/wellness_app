const jwt = require('jsonwebtoken');


const ensureAuthenticated = (req, res) => {
    const auth = req.headers['authorization'];
    const token = auth.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        res.status(200).json({ message: "success", user: decoded });
    } catch (err) {
        return res.status(403)
            .json({ message: 'Unauthorized, Bearer token is wrong or expired', errorMessage: err.message });
    }
}

module.exports = ensureAuthenticated;