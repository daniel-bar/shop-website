"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var debug_1 = __importDefault(require("debug"));
var path_1 = __importDefault(require("path"));
var winston_1 = __importDefault(require("winston"));
var app_1 = __importDefault(require("./app"));
var debug = debug_1.default('node-angular');
var normalizePort = function (val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return null;
};
var onError = function (error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var addr = server.address();
    var bind = typeof addr === 'string' ? ('pipe ' + addr) : ('port ' + port);
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
var onListening = function () {
    var addr = server.address();
    var bind = typeof addr === 'string' ? ('pipe ' + addr) : ('port ' + port);
    debug("Listening on " + bind);
};
var port = normalizePort(process.env.PORT);
app_1.default.set('port', port);
var server = http_1.default.createServer(app_1.default);
global.logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    transports: [
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.File({
            filename: path_1.default.join(__dirname, '../logs.log'),
            level: 'info',
        }),
    ],
});
server.on('error', onError);
server.on('listening', onListening);
server.listen(port);
global.logger.info("Server is running on port " + process.env.PORT);
