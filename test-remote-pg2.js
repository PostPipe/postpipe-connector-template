const { Client } = require('pg');

async function test() {
    const client = new Client({ connectionString: 'postgresql://neondb_owner:npg_PKOawF8LZeg5@ep-patient-hall-ahrot7c3-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require' });
    try {
        await client.connect();
        const res = await client.query('SELECT * FROM "roles"');
        console.log("Roles table in PG:", JSON.stringify(res.rows, null, 2));
    } catch (e) {
        console.log("Error querying PG:", e.message);
    } finally {
        await client.end();
    }
}
test();
