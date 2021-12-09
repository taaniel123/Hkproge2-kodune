import jwt from 'jsonwebtoken';
import { IUser } from './interfaces/usersInterface';

const jwtPassword = 'asdasdasdasdasd';

const jwtService = {
    sign: async (user: IUser) => {
        const payload = {
            id: user.id,
            role: user.role,
        };
        const token = await jwt.sign(payload, jwtPassword, {expiresIn: '1h'})
        return token;
    },
    verify: async (token: string) => {
        try {
            const verify = await jwt.verify(token, jwtPassword);
            return verify;
        } catch (e) {
            return false;
        }   
    },
};

export default jwtService;

