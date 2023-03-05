import { IQuestion } from "./define-question";

export interface ISetOfQuestions{
    id: string;
    content: string;
    questionLst: IQuestion[]
}