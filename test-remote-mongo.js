const { MongoClient } = require('mongodb');

async function test() {
    const uri = "mongodb+srv://benterprise:Souro%402007@benterprise.tp70wbd.mongodb.net/?appName=benterprise";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('main-db'); // based on the database alias mapping in user config
        const count = await db.collection('roles-4').countDocuments();
        console.log(`roles-4 count in main-db: ${count}`);
        if (count > 0) {
            const docs = await db.collection('roles-4').find().toArray();
            console.log("Docs:", JSON.stringify(docs, null, 2));
        }
    } catch (e) {
        console.log("Error:", e.message);
    } finally {
        await client.close();
    }
}
test();
