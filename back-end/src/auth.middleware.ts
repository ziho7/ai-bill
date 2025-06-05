import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearerxxx ", "");
    console.log('token', token)
    const {user_id: userId} = req.body
    if (!token) {
        res.status(401).json({
            error: 'Unauthorized'
        })
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!)
        if (decoded.sub !== userId) {
            res.status(401).json({
                error: 'Unauthorized'
            })
            return
        }

        next()
        
    } catch (error) {
        console.log('error', error)
        res.status(401).json({
            error: 'Unauthorized'
        })
        return
    }
}