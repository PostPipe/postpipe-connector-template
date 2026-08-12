import { createPostPipeServer } from '@postpipe-official/connector-core';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3002;
const app = createPostPipeServer();

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🔒 PostPipe Connector Template listening on port ${PORT}`);
        console.log(`📝 Default Mode: ${process.env.DB_TYPE || 'InMemory'}`);
        console.log(`🌐 Health Check: http://localhost:${PORT}/`);
    });
}

export default app;
