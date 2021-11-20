import { Request, Response, NextFunction } from 'express';
import jwtService from '../../jwtService';
import responseCodes from '../../responseCodes';

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { user } = res.locals;
    if (user.role !== 'Admin') {
        return res.status(responseCodes.notAuthorized).json({ error: 'Not an admin' });
    }
    return next();
};
 
export default isAdmin;