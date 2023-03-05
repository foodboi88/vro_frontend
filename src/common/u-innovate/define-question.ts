import { ISetOfQuestions } from "./define-setOfQuestions";

export interface IGetAllQuestionsByCriteriaResponse{
    id: string;
    criteriaName: string;
    setOfQuestionsLst: ISetOfQuestions[];
}

export interface IAnswerOfQuestion{
    id: string;
    content: string;
    description: string;
    point: string;
}

export interface IQuestion{
    id: string;
    content: string;
    answerLst: IAnswerOfQuestion[];
    pickedAnswer: IAnswerOfQuestion | null;
}