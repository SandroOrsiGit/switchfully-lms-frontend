import { CreateUser } from "../model/createUser";
import { User } from "../models/User";

export class UserMapper {
    static toCreateUser(form: Partial<any>): CreateUser {
        return { displayName: form["displayName"], 
                 email:form["email"], 
                 password: form["password"] }
    }

    static toUser(form: Partial<any>): User {
        return {
            id: form["id"],
            displayName: form["displayName"], 
            email: form["email"]
        }
    }
}