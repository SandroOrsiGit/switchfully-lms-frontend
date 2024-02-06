import { CommentDto } from "./CommentDto";

export interface CodelabDto {
    id: number,
    name: string,
    comments: CommentDto[]
}
