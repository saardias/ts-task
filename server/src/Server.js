import express from 'express';
import * as configs from './config/config.js';

class Server {
    constructor() {
        this.configs = configs;
        this.app = express();
        console.log('Starting server...');
        this.init();
    }

    async init() {
        this.configs.configMiddlewares(this.app);
        this.configs.configRoutes(this.app);
        // start server
        this.app.listen(8080, () => {
            console.log(`Listening on port 8080`);
        });

    }
}

export default new Server().app;