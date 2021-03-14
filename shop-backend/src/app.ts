import express from 'express';

const app: express.Application = express();

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.HTTP_ACCESS_IP as string);
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PATCH, DELETE'
    );
    next();
});

app.get(
    '/alive',
    (req: express.Request, res: express.Response, next: express.NextFunction) => res.status(200).send('Shop server is alive'),
);

export default app;