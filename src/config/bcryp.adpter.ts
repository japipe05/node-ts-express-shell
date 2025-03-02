import {genSaltSync, hashSync,compareSync} from 'bcryptjs';

export const bycryptAdapter={
    hash:(password:string)=>{
        const salt = genSaltSync();
        return hashSync(password,salt)
    },
    compare:(password:string, hashed: string)=>{
        return compareSync(password,hashed)
    }
}