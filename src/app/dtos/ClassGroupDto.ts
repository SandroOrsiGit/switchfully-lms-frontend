import { CoachDto } from "./CoachDto";
import { StudentDto } from "./StudentDto";

export interface ClassGroupDto {
  id: number,
  name: string,
  course_id: number,
  coaches: CoachDto[],
  students: StudentDto[],
}
