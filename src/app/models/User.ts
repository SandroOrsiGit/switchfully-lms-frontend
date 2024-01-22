import {Classgroup} from './Classgroup';

export interface User {
    id: number,
    email: string,
    displayName: string,
    role?: string,
    classes?: Classgroup[],
    password?: string
}
