import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import chalk from 'chalk'; // for easy 
import routes from './routes';

const app = express();

/** Logging */
morgan.token('methodColored', (req) => {
    const method = req.method;
    switch (method) {
        case 'GET':
            return chalk.green(method);
        case 'POST':
            return chalk.blue(method);
        case 'PUT':
            return chalk.yellow(method);
        case 'DELETE':
            return chalk.red(method);
        case 'PATCH':
            return chalk.magenta(method);
        default:
            return chalk.white(method);
    }
});

app.use(morgan(':methodColored :url :status :res[content-length] - :response-time ms'));

/** Request parsing */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/** Routes */
app.use('/', routes);

/** Error handling */
app.use((req, res, next) => {
    const error = new Error('Not found');
    next(error);
});
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(404).json({
        message: err.message
    });
});

/** Server */
const httpServer = http.createServer(app);
const PORT: any = process.env.PORT ?? 8080;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
