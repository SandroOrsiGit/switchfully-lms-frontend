import { User } from "../model/user";

export class UserMapper {
    static toUser(form: Partial<any>): User {
        return { displayName: form["displayName"], 
                 email:form["email"], 
                 password: form["password"] }
    }
}