/* eslint-disable new-parens */
import HttpClient from "../http-client";
import SYSTEM_CONSTANTS from "../../common/constants";
import { ICreateMeetingsReq, IDataObjectResponse, IDataResponse, IGetMeetingsReq, IMeetings, IMemberInMeetings, IMemberWithRole, ITask } from "../../common/define-meetings";
import { GetAllMemberReq, GetAllMembersWithRoleReq, GetAllTaskReq } from "../../common/define-type";
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from "rxjs/operators";

export default class MeetingsApi {
    static host = '';

    static getTasks(params: GetAllTaskReq): Observable<IDataResponse<ITask> | null> {
        const api = `${MeetingsApi.host}/${SYSTEM_CONSTANTS.API.TASK.GET_ALL}?size=${params.size}${params.name ? `&name=${params.name}` : ''}`;
        return HttpClient.get(api).pipe(
            map((res) => res as IDataResponse<ITask> || null, catchError((error) => new Observable)));

    }
    static getTasksByName(params: String): Observable<IDataResponse<ITask> | null> {
        const api = `${MeetingsApi.host}/${SYSTEM_CONSTANTS.API.TASK.GET_ALL}?name=${params}`;
        return HttpClient.get(api).pipe(
            map((res) => res as IDataResponse<ITask> || null, catchError((error) => new Observable)));

    }
    static getRoles(): Observable<IDataResponse<ITask> | null> {
        const api = `${MeetingsApi.host}/${SYSTEM_CONSTANTS.API.ROLE.GET_ALL}`;
        return HttpClient.get(api).pipe(
            map((res) => res as IDataResponse<ITask> || null, catchError((error) => new Observable)));

    }

    static getMeetings(body: IGetMeetingsReq): Observable<IDataResponse<IMeetings> | null> {
        const api = `${MeetingsApi.host}/${SYSTEM_CONSTANTS.API.MEETINGS.FILTER_MEETINGS}`;
        return HttpClient.post(api, body).pipe(
            map((res) => res as IDataResponse<IMeetings> || null, catchError((error) => new Observable)));

    }
    static getMeetingsById(meetingId: string): Observable<IDataResponse<any> | null> {
        const api = `${MeetingsApi.host}/${SYSTEM_CONSTANTS.API.MEETINGS.GET_MEETING_BY_ID.replace('{meetingId}', meetingId)}`;
        return HttpClient.get(api).pipe(
            map((res) => res as IDataResponse<IMeetings> || null, catchError((error) => new Observable)));
    }
    static createMeetings(body: ICreateMeetingsReq): Observable<IDataResponse<any> | null> {
        const api = `${MeetingsApi.host}/${SYSTEM_CONSTANTS.API.MEETINGS.CREATE_MEETINGS}`;
        return HttpClient.post(api, body).pipe(
            map((res) => res as IDataResponse<IMeetings> || null, catchError((error) => new Observable)));
    }

    static updateMeetings(meetingId: string, body: ICreateMeetingsReq): Observable<IDataResponse<any> | null> {
        const api = `${MeetingsApi.host}/${SYSTEM_CONSTANTS.API.MEETINGS.UPDATE_MEETINGS.replace('{meetingId}', meetingId)}`;
        return HttpClient.put(api, body).pipe(
            map((res) => res as IDataResponse<IMeetings> || null, catchError((error) => new Observable)));
    }

    static deleteMeetings(meetingId: string): Observable<IDataObjectResponse<any> | null> {
        const api = `${MeetingsApi.host}/${SYSTEM_CONSTANTS.API.MEETINGS.DELETE_MEETINGS.replace('{meetingId}', meetingId)}`;
        return HttpClient.delete(api).pipe(
            map((res) => res as IDataObjectResponse<IMeetings> || null, catchError((error) => new Observable)));
    }

    static getMembers(body: GetAllMemberReq): Observable<IDataResponse<IMemberInMeetings> | null> {
        const api = `${MeetingsApi.host}/${SYSTEM_CONSTANTS.API.MEMBER.GET_ALL}`;
        return HttpClient.post(api, body).pipe(
            map((res) => res as IDataResponse<IMemberInMeetings> || null, catchError((error) => new Observable)));
    }

    static getAllMembersWithRole(body: GetAllMembersWithRoleReq): Observable<IDataResponse<IMemberWithRole> | null> {
        const api = `${MeetingsApi.host}/${SYSTEM_CONSTANTS.API.MEMBER.GET_ALL_WITH_ROLE}?offset=${body.offset}&size=${body.size}`;
        return HttpClient.get(api).pipe(
            map((res) => res as IDataResponse<IMemberWithRole> || null, catchError((error) => new Observable)));
    }
}