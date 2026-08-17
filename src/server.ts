import express from 'express';
import { createPostPipeServer } from '@postpipe-official/connector-core';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3002;

const mainApp = express();

mainApp.get('/api/postpipe/health', (req, res) => {
    const authHeader = req.headers.authorization;
    let token = '';
    if (authHeader) {
        const match = authHeader.match(/^Bearer\s+(.+)$/i);
        if (match) token = match[1];
    }
    
    if (token === process.env.POSTPIPE_CONNECTOR_SECRET) {
        return res.status(200).json({ status: 'ok', message: 'Connector is healthy and authenticated' });
    }
    
    return res.status(401).json({ error: 'Unauthorized: Invalid or missing token' });
});

const postpipeApp = createPostPipeServer();
mainApp.use(postpipeApp);

if (require.main === module) {
    mainApp.listen(PORT, () => {
        console.log(`🔒 PostPipe Connector Template listening on port ${PORT}`);
        console.log(`📝 Default Mode: ${process.env.DB_TYPE || 'InMemory'}`);
        console.log(`🌐 Health Check: http://localhost:${PORT}/api/postpipe/health`);
    });
}

export default mainApp;
