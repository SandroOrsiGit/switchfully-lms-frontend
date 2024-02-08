import {CourseDto} from "./CourseDto";

export interface StudentWithCoursesDto {
  id: number,
  email: string,
  displayName: string,
  courseDtoList: CourseDto[]
}
