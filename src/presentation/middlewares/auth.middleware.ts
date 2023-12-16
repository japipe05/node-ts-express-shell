import { NextFunction, Request, Response } from "express";
import { JwtAdpater } from "../../config";
import { userModel } from "../../data/mongo";
import { UserEntity } from "../../domain";

export class AuthMiddleware{
    // DI
    constructor(){

    }

    static async validateJWT(req: Request,res: Response,next: NextFunction ){
        const authorization = req.header('Authorization');
        if(!authorization) return res.status(401).json({error: 'No token provided'});
        if(!authorization.startsWith('Bearer ')) return res.status(401).json({error:'Invalid Bearer token'});

        const token = authorization.split(' ').at(1)||'';

        try {
            const payload = await JwtAdpater.validateToken<{id:string}>(token)
            if(!payload) return res.status(401).json({error:'Invalid Token'});
            const user = await userModel.findById(payload.id);
            if(!user) return res.status(400).json({error:'Invalid token -user'});
            req.body.user = UserEntity.fromObject(user);

            next();
        } catch (error) {
            console.log(error);
            res.status(500).json({error: 'Internal server error'});
        }
        
    }
}