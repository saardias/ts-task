import express from 'express';
import cors from 'cors';

export const configRoutes = (app) => {
    app.use('/api', require('../routes/api'));
    app.use('/', require('../routes').default);

    app.use((req, res, next) => {
        res.status(404).send({ error: "API Not Found" });
    });
}

export const configMiddlewares = (app) => {
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json())

}