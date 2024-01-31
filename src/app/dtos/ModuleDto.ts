import { CodelabDto } from "./CodelabDto";

export interface ModuleDto {
    id: number,
    name: string,
    codelabs: CodelabDto[],
    subModules: any[],
}
