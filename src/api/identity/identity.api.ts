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
import { API_URL } from "../../enum/api.enum";

export default class IdentityApi {
    static apiURL = API_URL;

    static login(body: any): Observable<any> {
        const api = `${IdentityApi.apiURL.HOST}/${this.apiURL.LOGIN}`;
        return HttpClient.post(api, body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static reqister(body: any): Observable<any> {
        const api = `${IdentityApi.apiURL.HOST}/${this.apiURL.REGISTER}`;
        return HttpClient.post(api, body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getUserInfo(token: any): Observable<any> {
        const api = `${IdentityApi.apiURL.HOST}/${this.apiURL.GET_USER_INFO}`;
        return HttpClient.get(api, { headers: { Authorization: `Bearer ${token}` } }).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }
}
