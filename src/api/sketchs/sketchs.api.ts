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

    static getSketchById(sketchId: string): Observable<any> {
        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.GET_DETAIL_SKETCH}?id=${sketchId}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getLatestSketchs(params: IReqGetLatestSketchs): Observable<any> {
        console.log(params);
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

    static advancedSearching(body: any): Observable<any> {
        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.ADVANCED_SEARCHING}}`;
        return HttpClient.post(api, body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static uploadSketchContent(body: any): Observable<any> {
        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.UPLOAD_CONTENT_OF_SKETCH}}`;
        return HttpClient.post(api, body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static uploadSketchFile(body: any): Observable<any> {
        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.UPLOAD_FILES_OF_SKETCH}}`;
        return HttpClient.post(api, body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }
}
