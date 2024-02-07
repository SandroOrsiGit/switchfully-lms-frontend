import {ClassGroupDto} from '../dtos/ClassGroupDto';

export interface User {
    id: number,
    email: string,
    displayName: string,
    role?: string,
    classes: ClassGroupDto[],
    password?: string
}
