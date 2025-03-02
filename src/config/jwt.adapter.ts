import jwt from 'jsonwebtoken';
import { envs } from './envs';
const JWT_SEED = envs.JWT_SEED;
export class JwtAdpater{
    // DI  inyeccion de dependencias
    static generateToken(payload:any, duration: string='2h'){
        
        return new Promise((resolve)=>{
            
            jwt.sign(payload, JWT_SEED, {expiresIn: duration}, (err, token)=>{
                if(err) return resolve(null);

                resolve(token);
            });
        });
    }

    static validateToken<T>(token:string):Promise<T|null>{
        //throw new Error('Not implemented');
        return new Promise((resolve)=>{
            jwt.verify(token, JWT_SEED,(err, decoded)=>{
                if(err) return  resolve(null);
                resolve(decoded as T);
            });
        });
    }

}