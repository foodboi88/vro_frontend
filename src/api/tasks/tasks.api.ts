/* eslint-disable new-parens */

import HttpClient from "../http-client";
import SYSTEM_CONSTANTS from "../../common/constants";
import { IDataResponse, ITask } from "../../common/define-task";
import { ICreateTasksReq } from "../../common/define-task";
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from "rxjs/operators";

export default class TasksApi {
    static host = '';

    static getTasks(): Observable<IDataResponse<ITask> | null> {
        const api = `${TasksApi.host}/${SYSTEM_CONSTANTS.API.TASK.GET_ALL}`;
        return HttpClient.get(api).pipe(
            map((res) => res as IDataResponse<ITask> || null, catchError((error) => new Observable)));

    }

    static createTasks(body: ICreateTasksReq): Observable<IDataResponse<any> | null> {
        const api = `${TasksApi.host}/${SYSTEM_CONSTANTS.API.TASK.CREATE_TASK}`;
        return HttpClient.post(api, body).pipe(
            map((res) => res as IDataResponse<ITask> || null, catchError((error) => new Observable)));
    }

}