import { AppDataSource } from "../data-source";
import { User } from "../entity/UsersEntity/User";

export default class UserRepo {
        
    private constructor() { }
    
    public static async getUserById(id: number): Promise<User | null> {
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOne({
            where: {
                id: id
            },
        }).catch((err) => {
            throw new Error(err);
        });
        if (user == null) {
            throw new Error("User not found");
        }
        return user;
    }

    public static async checkUserLogin(id: number, password: string){
        const userRepository = AppDataSource.getRepository(User)
    
        const user = await userRepository.findOne({
            where: {
                id: id,
                password: password
            },
        }).catch((err) => {
            throw new Error(err);
        });
        if (user == null) {
            throw new Error("User not found");
        }
        return user;
    }
}