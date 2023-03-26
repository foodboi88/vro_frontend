/* eslint-disable new-parens */
import HttpClient from "../http-client";
import SYSTEM_CONSTANTS from "../../common/constants";

import {
    GetAllMemberReq,
    GetAllMembersWithRoleReq,
    GetAllTaskReq,
} from "../../common/define-type";
import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";

export default class IdentityApi {
    static host = "";

    static login(body: any): Observable<any> {
        const api = `${IdentityApi.host}/${SYSTEM_CONSTANTS.API.MEETINGS.CREATE_MEETINGS}`;
        return HttpClient.post(api, body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static register(body: any): Observable<any> {
        const api = `${IdentityApi.host}/${SYSTEM_CONSTANTS.API.MEETINGS.CREATE_MEETINGS}`;
        return HttpClient.post(api, body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }
}
