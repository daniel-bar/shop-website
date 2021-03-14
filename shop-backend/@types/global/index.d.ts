export { };

import winston from 'winston';

declare global {
    declare namespace NodeJS {
        interface Global {
            logger: winston.Logger;
        }
    }
}