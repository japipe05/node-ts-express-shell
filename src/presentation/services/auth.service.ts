import { JwtAdpater, bycryptAdapter } from "../../config";
import { userModel } from "../../data/mongo";
import { CustonError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";

export class AuthService{
    //DI
    constructor(){}

    public async registerUser(registerUserDto:RegisterUserDto){
        const existsUser = await userModel.findOne({email: registerUserDto.email});
        if(existsUser) throw CustonError.badRequest('Email Already Exists');

        try {
            const user = new userModel(registerUserDto);
            // Encriptar la contraseña
            user.password = bycryptAdapter.hash(registerUserDto.password);
            await user.save();
            //JWT <----para manterner la autenticacacion

            // Email de confirmacion


            const {password,...userEntity} = UserEntity.fromObject(user);
            return {
                user: userEntity,
                token:'ABC'
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
}