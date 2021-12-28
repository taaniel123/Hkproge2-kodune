import { Request, Response, NextFunction } from 'express';

let datetime = new Date();
const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log('endpoint: ' + `${req.url} `, 'Request (' + req.method + ') made at: ' + datetime);
    next();
};

export default logger;