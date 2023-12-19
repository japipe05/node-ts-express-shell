import {  ProducModel } from '../../data/mongo';
import {  CreateProductDto, CustonError, PaginationDto } from '../../domain';
export class ProductService{
    constructor(){}


    async createProduct(createProductDto: CreateProductDto){
        const productExists = await ProducModel.findOne({name:createProductDto.name});
        if( productExists) throw CustonError.badRequest('Product already exists');
        try {
            const product = new ProducModel({
                ...createProductDto,
            });
            await product.save();

            return product;
        } catch (error) {
            throw CustonError.internalServer(`Internal Server`);
        }
    }

    async getProduct(paginationDto:PaginationDto){
        const {page,limit}=paginationDto;

        try {
            const [total,products] = await Promise.all([
                ProducModel.countDocuments(),
                ProducModel.find()
                .skip((page-1)*limit)
                .limit(limit)
                .populate('user')
                .populate('category')
            ])
            return {
                page:page,
                limit:limit,
                total:total,
                next:`/api/products?page=${page+1}&limit=${limit}`,
                prev:(page-1>0)?`/api/products?page=${page-1}&limit=${limit}`:null,
                products: products,
            }
            
        } catch (error) {
            throw CustonError.internalServer('Internal Server Error');
        }
    }
}


