export interface ITask {
    name: string;
    note?: string;
    color?: string;
    id: string;
}
export interface ICreateTasksReq {
    name: string;
    note?: string;
    color?: string;
}
export interface IDataResponse<T> {
    data: {
        items: T[],
        total: number
    };
    statusCode: string;
}