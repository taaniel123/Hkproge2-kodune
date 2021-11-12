"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let datetime = new Date();
const logger = (req, res, next) => {
    console.log('Request (' + req.method + ') made at: ' + datetime);
    next();
};
exports.default = logger;
//# sourceMappingURL=logger.js.map