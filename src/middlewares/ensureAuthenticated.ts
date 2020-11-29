import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../errors/AppError';

import authConfig from '../config/auth';

interface TokenPayLoad {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAutenticated(
    request: Request,
    response: Response,
    next: NextFunction
): void {
    // Validacao do toke JWT
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }

    const [, token] = authHeader.split(' ');

    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayLoad;

    request.user = {
        id: sub,
    };

    return next();
}
