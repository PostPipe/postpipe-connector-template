const { MongoClient } = require('mongodb');

async function test() {
    const uri = "mongodb://localhost:27017/postpipe";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('postpipe');
        const count = await db.collection('roles-4').countDocuments();
        console.log(`roles-4 count: ${count}`);
        if (count > 0) {
            const docs = await db.collection('roles-4').find().toArray();
            console.log("Docs:", docs);
        }
    } catch (e) {
        console.log("Error:", e.message);
    } finally {
        await client.close();
    }
}
test();
