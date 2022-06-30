import jwt from 'jsonwebtoken';

export const validateAuth = (req) => {
    const token = req.headers['authorization'];
    if (!token) return {success: false, message: 'No token provided.'};
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.username || decoded.username !== process.env.USERNAME) return {
            success: false,
            message: 'Invalid token.'
        };
        return {success: true};
    } catch {
        return {success: false, message: 'Invalid token.'};
    }
};