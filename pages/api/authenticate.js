import jwt from 'jsonwebtoken';

export default function handler(req, res) {
    if (req.method === 'GET') {
        // return if token is valid
        // console.log(req.headers);
        const token = req.headers['authorization'];
        if (!token) return res.status(401).json({success: false, message: 'No token provided.'});
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decoded);
            if (!decoded.username || decoded.username !== process.env.USERNAME) return res.status(401).json({
                success: false,
                message: 'Invalid token.'
            });
            return res.status(200).json({success: true});
        } catch {
            res.status(401).json({success: false, message: 'Invalid token.'});
        }
    } else if (req.method === 'POST') {
        // return a token based on username and password
        const username = req.body.username;
        const password = req.body.password;
        if (username === process.env.USERNAME && password === process.env.PASSWORD) {
            const token = jwt.sign({username}, process.env.JWT_SECRET, {
                expiresIn: 24 * 60 * 60,
            });
            res.status(200).json({success: true, token});
        } else {
            res.status(401).json({success: false, message: 'Invalid username or password.'});
        }
    }
}