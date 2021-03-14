
import http from 'http';
import Debug from 'debug';
import net from 'net';
import path from 'path';

import winston, { info } from 'winston';

import app from './app';

const debug: Debug.Debugger = Debug('node-angular');

const normalizePort = (val: string): string | number | null => {
    var port: number = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return null;
};

const onError = (error: NodeJS.ErrnoException): void => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const addr: string | net.AddressInfo | null = server.address();
    const bind: string = typeof addr === 'string' ? ('pipe ' + addr) : ('port ' + port);

    switch (error.code) {
        case 'EACCES':
            console.error(bind + 'requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const onListening = (): void => {
    const addr: string | net.AddressInfo | null = server.address();
    const bind: string = typeof addr === 'string' ? ('pipe ' + addr) : ('port ' + port);

    debug("Listening on " + bind);
};


const port: string | number | null = normalizePort(process.env.PORT as string);

app.set('port', port);

const server: http.Server = http.createServer(app);

global.logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: path.join(__dirname, '../logs.log'),
            level: 'info',
        }),
    ],
});

server.on('error', onError);
server.on('listening', onListening);
server.listen(port);

global.logger.info(`Server is running on port ${process.env.PORT}`);