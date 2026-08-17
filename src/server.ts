import { createPostPipeServer } from '@postpipe-official/connector-core';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3002;
const app = createPostPipeServer();

app.get('/api/postpipe/health', (req, res) => {
    const authHeader = req.headers.authorization;
    let token = '';
    if (authHeader) {
        const match = authHeader.match(/^Bearer\s+(.+)$/i);
        if (match) token = match[1];
    }
    
    // Simple verification (actual core uses timingSafeEqual and JWT, but simple match is fine for health check)
    if (token === process.env.POSTPIPE_CONNECTOR_SECRET) {
        return res.status(200).json({ status: 'ok', message: 'Connector is healthy and authenticated' });
    }
    
    return res.status(401).json({ error: 'Unauthorized: Invalid or missing token' });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🔒 PostPipe Connector Template listening on port ${PORT}`);
        console.log(`📝 Default Mode: ${process.env.DB_TYPE || 'InMemory'}`);
        console.log(`🌐 Health Check: http://localhost:${PORT}/`);
    });
}

export default app;
