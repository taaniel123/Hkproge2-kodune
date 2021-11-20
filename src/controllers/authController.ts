import express, { Request, Response } from 'express';
import loginService from '../services/loginService';
import responseCodes from '../responseCodes';


const authController = {
    login: async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const token = await loginService.login(email, password);
        if (!token) {
            return res.status(responseCodes.notAuthorized).json({
                error: 'Check credentials'
            });
        }
        return res.status(responseCodes.ok).json({
            token
        });
    },
}

export default authController;