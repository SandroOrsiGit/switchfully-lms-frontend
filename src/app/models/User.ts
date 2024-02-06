import {ClassGroup} from './ClassGroup';

export interface User {
    id: number,
    email: string,
    displayName: string,
    role?: string,
    classes: ClassGroup[],
    password?: string
}
