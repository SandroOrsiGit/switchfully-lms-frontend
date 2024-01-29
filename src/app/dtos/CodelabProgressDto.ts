import {CodelabNoCommentDto} from "./CodelabNoCommentDto";
import {ProgressDto} from "./ProgressDto";

export interface CodelabProgressDto {
  id: number,
  codelab: CodelabNoCommentDto,
  progress: ProgressDto
}
