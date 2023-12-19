import { envs } from "../../config";
import { CategoryModel, MongoDatabase, ProducModel, userModel } from "../mongo";
import { seedData } from "./data";

(async()=>{
    MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL
    });
    await main();

    await MongoDatabase.disconnect();
})();


const randomBetween0AndX = (x:number)=>{
    return Math.floor(Math.random()*x);
}
async function main(){
    // 0. Borrar Todo
    await Promise.all([
        userModel.deleteMany(),
        CategoryModel.deleteMany(),
        ProducModel.deleteMany(),
    ])
    // 1. Crear usuarios 
    const users = await userModel.insertMany(seedData.users);

    // 2. Crear categories
    const categories = await CategoryModel.insertMany(
        seedData.categories.map(category=>{
            return{
                ...category,
                user: users[0]._id
            }
        })
    );
    // 3. Crear productos
    const produtct = await ProducModel.insertMany(
        seedData.products.map(product=>{
            return{
                ...product,
                user:users[randomBetween0AndX(seedData.users.length-1)]._id,
                category:categories[randomBetween0AndX(seedData.categories.length-1)]._id
            }
        })
    )

}