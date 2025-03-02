import { Request,Response } from "express";
import { CustonError, LoginUserDto, RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";

export class AuthController {
    constructor(
        public readonly authService:AuthService,
    ){}
    
    private handleError = (error:unknown, res: Response)=>{
        if(error instanceof CustonError){
            return res.status(error.statusCode).json({error:error.message});
        }
        return res.status(500).json({error:'Internal Server Error'});
    }
    registerUser = (req: Request,res: Response)=>{
        const [error, registerDto] = RegisterUserDto.create(req.body);
        if(error) return res.status(400).json({error});

        //res.json(registerDto);
        this.authService.registerUser(registerDto!)
            .then((user)=>res.json(user))
            .catch(error=>this.handleError(error,res));
    }

    LoginUser = (req: Request,res: Response)=>{
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if(error) return res.status(400).json({error});

        //res.json(registerDto);
        this.authService.LoginUser(loginUserDto!)
            .then((user)=>res.json(user))
            .catch(error=>this.handleError(error,res));
    }

    validateEmail = (req: Request,res: Response)=>{
        //res.json('validateEmail');
        const {token} = req.params;
     //   res.json(token);
        //console.log(token)
        this.authService.validateEmail(token)
            .then(()=>res.json('Email Validated'))
            .catch(error=>this.handleError(error,res));
            
    }
}