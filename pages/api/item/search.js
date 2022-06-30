import {dbConnect} from '../../../lib/mongodb';
import {createItemData} from '../../../lib/itemUtil';

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export default async function handler(req, res) {
    const db = await dbConnect();
    if (req.method === 'POST') {
        if (!req.body.query) return res.status(400).json({success: false, message: 'Missing query.'});
        return res.status(200).json(await createItemData(db.collection('items').find({
            'name': new RegExp(escapeRegex(req.body.query), 'gi')
        })));
    }
}
