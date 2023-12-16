import { Response, Request } from "express";
import { CreateCategoryDto, CustonError, PaginationDto } from "../../domain";
import { CategoryService } from "../services/categoty.service";

export class CategoryController{
    constructor(
        private readonly categoryService: CategoryService,
    ){}
    
    
    private handleError = (error:unknown, res: Response)=>{
        if(error instanceof CustonError){
            return res.status(error.statusCode).json({error:error.message});
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    createCategory = async(req: Request, res: Response)=>{
        const [error,createCategoryDto] = CreateCategoryDto.create(req.body);
        if(error) return res.status(400).json({error});
        this.categoryService.createCategory(createCategoryDto!,req.body)
            .then(category=> res.status(201).json(category))
            .catch(error => this.handleError(error,res));
        //res.json(createCategoryDto);
        //res.json(req.body);
    }

    getCategory = async(req: Request, res: Response)=>{
        //res.json('Get Category');
        const {page=1, limit=10}= req.query;
        const [error, paginationDto] = PaginationDto.create(+page,+limit);
        if(error) return res.status(400).json({error})
        //res.json(paginationDto);
        this.categoryService.getCategories(paginationDto!)
                .then(categories => res.json(categories))
                .catch(error=> this.handleError(error, res));
    }

}