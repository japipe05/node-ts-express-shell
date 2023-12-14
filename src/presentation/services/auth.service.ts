import { JwtAdpater, bycryptAdapter, envs } from "../../config";
import { userModel } from "../../data/mongo";
import { CustonError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { EmailService } from "./email.service";

export class AuthService{
    //DI
    constructor(
        private readonly emailservice:EmailService,
    ){}

    public async registerUser(registerUserDto:RegisterUserDto){
        const existsUser = await userModel.findOne({email: registerUserDto.email});
        if(existsUser) throw CustonError.badRequest('Email Already Exists');

        try {
            const user = new userModel(registerUserDto);
            // Encriptar la contraseña
            user.password = bycryptAdapter.hash(registerUserDto.password);
            await user.save();
            //JWT <----para manterner la autenticacacion
            const token = await JwtAdpater.generateToken({id: user.id});
            if(!token) throw CustonError.internalServer('Error while creating JWT');
            // Email de confirmacion
            await this.sendEmailVAlidationLink(user.email);

            const {password,...userEntity} = UserEntity.fromObject(user);
            return {
                user: userEntity,
                token:token
            };

            //return user;
        } catch (error) {
            throw CustonError.internalServer(`${error}`)
        }
        //return 'Todo Ok';
    }
    public async LoginUser(loginUserDto:LoginUserDto){
        // Finedone para verificar si existe
        const user = await userModel.findOne({email: loginUserDto.email});
        if(!user) throw CustonError.badRequest('Email Not Exists');
        // isMAtch.. bycryp..compare(12313215, dkjlkjdsfkjaosidf)
        const hasMatch = bycryptAdapter.compare(loginUserDto.password, user.password);
        if(!hasMatch) throw CustonError.badRequest('Password is not valid');

        const {password,...userEntity} = UserEntity.fromObject(user);

        const token = await JwtAdpater.generateToken({id: user.id});
        if(!token) throw CustonError.internalServer('Error while creating JWT');
        return{
            user:userEntity,
            token: token,
        }
    }

    private sendEmailVAlidationLink = async(email:string)=>{
        const token = await JwtAdpater.generateToken({email});
        if(!token) throw CustonError.internalServer('Error getting Token');

        const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;
        const htmlbody = `
            <h3>login register validatiosn Sistema Noc</h3>
            <p>Ex ea est do labore irure Lorem pariatur nostrud esse aliqua. Officia eiusmod officia duis tempor commodo do pariatur aliquip aliqua esse reprehenderit. Nostrud magna anim velit dolor ea irure laborum. Velit sint ea sint consequat et labore dolore excepteur excepteur pariatur ullamco.</p>
            <p>Ver logs</p>
            <a href="${link}">validate your email ${email}</a>
        `;

        const options = {
            to:email,
            subject:'Validate your Email',
            htmlBody:htmlbody,
        }

        const isSent = await this.emailservice.sendEmail(options);
        if(!isSent) throw CustonError.internalServer('Error Sending Email ');

        return true;
    }

    public validateEmail = async (token:string)=>{
        const payload = await JwtAdpater.validateToken(token);
        if(!payload) throw CustonError.unauthorized('Invalid Token');

        const {email} = payload as {email: string};
        if(!email) throw CustonError.internalServer('Email not in Token');

        const user = await userModel.findOne({email});
        if(!user) throw CustonError.internalServer('Email not exists');

        user.emailValidated = true;
        await user.save();

        return true;
    }
}