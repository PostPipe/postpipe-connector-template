import express from 'express';
import { createPostPipeServer } from '@postpipe-official/connector-core';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3002;

const mainApp = express();

const postpipeApp = createPostPipeServer();
mainApp.use(postpipeApp);

if (require.main === module) {
    mainApp.listen(PORT, () => {
        console.log(`🔒 PostPipe Connector Template listening on port ${PORT}`);
        console.log(`📝 Default Mode: ${process.env.DB_TYPE || 'InMemory'}`);
    });
}

export default mainApp;
