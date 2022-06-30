import {dbConnect} from '../../../lib/mongodb';
import {ObjectId} from 'mongodb';
import jwt from 'jsonwebtoken';
import {validateAuth} from '../../../lib/serverAuth';

export default async function handler(req, res) {
    const validAuth = validateAuth(req);
    if (!validAuth.success) return res.status(401).json(validAuth);
    const db = await dbConnect();
    if (req.method === 'PATCH') {
        console.log(req.body);
        await db.collection('items').updateOne(
            {_id: new ObjectId(req.query.id)},
            {
                $set: {
                    ...req.body,
                    lastUpdated: Date.now(),
                }
            }
        );
        return res.status(200).json({success: true});
    } else if (req.method === 'DELETE') {
        await db.collection('items').deleteOne({_id: new ObjectId(req.query.id)});
        return res.status(200).json({success: true});
    }
}