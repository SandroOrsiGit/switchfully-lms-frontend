import { CoachDto } from "../dtos/CoachDto";
import { StudentDto } from "../dtos/StudentDto";

export interface ClassGroup {
  id: number,
  name: string,
  course_id: number,
  coachDtoList: CoachDto[],
  studentNoCodelabProgressDtoList: StudentDto[],
}
