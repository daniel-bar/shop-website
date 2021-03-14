"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.HTTP_ACCESS_IP);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PATCH, DELETE');
    next();
});
app.get('/alive', function (req, res, next) { return res.status(200).send('Shop server is alive'); });
exports.default = app;
