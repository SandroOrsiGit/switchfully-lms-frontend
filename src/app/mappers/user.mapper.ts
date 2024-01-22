import { CreateUserDto } from "../dtos/CreateUserDto";
import { User } from "../models/User";

export class UserMapper {
    static toCreateUser(form: Partial<any>): CreateUserDto {
        return { displayName: form["displayName"],
                 email:form["email"],
                 password: form["password"] }
    }

    static toUser(form: Partial<any>): User {
        return {
            id: form["id"],
            displayName: form["displayName"],
            email: form["email"],
        }
    }
}
