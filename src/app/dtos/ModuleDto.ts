import { CodelabDto } from "./CodelabDto";
import {CourseDto} from "./CourseDto";

export interface ModuleDto {
    id: number,
    name: string,
    courses: CourseDto[],
    codelabs: CodelabDto[],
    subModules: any[],
}
