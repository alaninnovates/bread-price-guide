import {validateAuth} from '../../../lib/serverAuth';
import {dbConnect} from '../../../lib/mongodb';

export default async function handler(req, res) {
    const validAuth = validateAuth(req);
    if (!validAuth.success) return res.status(401).json(validAuth);
    const db = await dbConnect();
    if (req.method === 'POST') {
        const item = req.body;
        if (!item.name || !item.price) return res.status(400).json({success: false, message: 'Missing name or price.'});
        const doc = await db.collection('items').insertOne(Object.assign(item, {
            lastUpdated: new Date().getTime()
        }));
        console.log(doc);
        return res.status(200).json({success: true});
    }
}
