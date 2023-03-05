import { IMeetingAndRole } from "./define-meetings";
import { Paging } from "./define-type";

export interface IMember {
    email: string;
    fullName: string;
    dob: Date;
    avatar: string;
    id: string;
}

export interface ICreateMemberReq {
    email: string;
    fullName: string;
    dob: Date;
    avatar: string
}
export interface IDataResponse<T> {
    data: {
        items: T[],
        total: number
    };
    statusCode: string;
}
export interface GetAllMemberReq extends Paging{
    startTime: Date,
    endTime: Date
}
export interface IMemberInMeetings extends IMember {
    memberMeetings: IMeetingAndRole[]
}