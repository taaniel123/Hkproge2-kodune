import { Request, Response, NextFunction } from 'express';

let datetime = new Date();
const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log('Request (' + req.method + ') made at: ' + datetime);
    next();
};

export default logger;