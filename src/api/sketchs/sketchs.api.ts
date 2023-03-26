/* eslint-disable new-parens */
import HttpClient from "../http-client";
import SYSTEM_CONSTANTS from "../../common/constants";

import {
    GetAllMemberReq,
    GetAllMembersWithRoleReq,
} from "../../common/define-type";
import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import { API_URL } from "../../enum/api.enum";
import { IReqGetLatestSketchs } from "../../common/sketch.interface";

export default class SketchsApi {
    static apiURL = API_URL;

    static getLatestSketchs(params: IReqGetLatestSketchs): Observable<any> {
        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.GET_LATEST_SKETCH}?size=${params.size}&offset=${params.offset}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getMostViewsSketchs(params: IReqGetLatestSketchs): Observable<any> {
        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.GET_MOST_VIEWS_SKETCH}?size=${params.size}&offset=${params.offset}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static createMeetings(body: any): Observable<any> {
        const api = `${SketchsApi.apiURL}/${SYSTEM_CONSTANTS.API.MEETINGS.CREATE_MEETINGS}`;
        return HttpClient.post(api, body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static updateMeetings(meetingId: string, body: any): Observable<any> {
        const api = `${
            SketchsApi.apiURL.HOST
        }/${SYSTEM_CONSTANTS.API.MEETINGS.UPDATE_MEETINGS.replace(
            "{meetingId}",
            meetingId
        )}`;
        return HttpClient.put(api, body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static deleteMeetings(meetingId: string): Observable<any> {
        const api = `${
            SketchsApi.apiURL.HOST
        }/${SYSTEM_CONSTANTS.API.MEETINGS.DELETE_MEETINGS.replace(
            "{meetingId}",
            meetingId
        )}`;
        return HttpClient.delete(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }
}
