import { Validator } from "../../../config";

export class CreateProductDto{
    private constructor(
        public readonly name: string,
        public readonly available: boolean,
        public readonly price: number,
        public readonly description: string,
        public readonly user: string,
        public readonly category: string
    ){}

    static create(props: {[key:string]:any}): [string?, CreateProductDto?]{
        const {
            name,
            available,
            price,
            description,
            user,
            category
        }= props;

        if(!name) return ['Missing Name'];
        if(!user) return ['Missing Namusere'];
        if(!Validator.isMongoID(user)) return ['Invalid User ID'];
        if(!category) return ['Missing category'];
        
        return [
            undefined,
            new CreateProductDto(
                name,
                !!available,
                price,
                description,
                user,
                category
            )
        ]
    }
}

