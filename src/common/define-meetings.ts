export interface MemberMeeting {
    memberId: string;
    roleId?: string;
}

export interface IGetMeetingsReq{
    title?: string;
    startTime: Date;
    endTime: Date;
    memberMeetings?: MemberMeeting[];
    tasks?: string[]
}

export interface IMember {
    email: string;
    fullName: string;
    dob: Date | null;
    id: string;
    avatar: string;
    roleIdTemporary?: string;
}

export interface IMeetingAndRole{
    meeting?: Omit<IMeetings, 'memberMeetings'>
}

export interface IMemberInMeetings extends IMember{
    memberMeetings: IMeetingAndRole[]
}

export interface IMemberWithRole extends IMember{
    memberMeetings: IRole[]
}

export interface IRole {
    id: string;
    name: string;
}

export interface IMemberMeeting {
    id: string;
    member: IMember;
    role?: IRole;
}

export interface ITask {
    name: string;
    note?: string;
    id: string;
    color: string;
    createTime?: Date;
    updateTime?: Date;

}

export interface IMeetings {
    title: string;
    startTime: Date | string;
    endTime: Date | string;
    location: string;
    note: string;
    memberMeetings: IMemberMeeting[];
    id: string;
    task: ITask;
}
export interface IDataResponse<T> {
    data: {
        items: T[],
        total: number
    };
    statusCode: string;
}

export interface IDataObjectResponse<T> {
    data: T,
    statusCode: string;
}

export interface MemberReq {
    memberId: string;
    roleId: string;
}

export interface ICreateMeetingsReq {
    title: string;
    startTime: Date;
    endTime: Date;
    location?: string;
    userId?: string;
    taskId: string;
    members?: MemberReq[];
    note?: string;
}


