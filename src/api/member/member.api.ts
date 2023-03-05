/* eslint-disable new-parens */

import HttpClient from "../http-client";
import SYSTEM_CONSTANTS from "../../common/constants";
import { GetAllMemberReq, ICreateMemberReq, IDataResponse, IMember, IMemberInMeetings } from "../../common/define-member";
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from "rxjs/operators";

export default class MemberApi {
    static host = '';

    static getMembers(body: GetAllMemberReq): Observable<IDataResponse<IMemberInMeetings> | null>{
        const api = `${MemberApi.host}/${SYSTEM_CONSTANTS.API.MEMBER.GET_ALL}`;
        return HttpClient.post(api, body).pipe(
            map((res) => res as IDataResponse<IMemberInMeetings> || null, catchError((error) => new Observable)));
    }

    static createMember(body: ICreateMemberReq): Observable<IDataResponse<any> | null> {
        const api = `${MemberApi.host}/${SYSTEM_CONSTANTS.API.MEMBER.CREATE_MEMBER}`;
        return HttpClient.post(api, body).pipe(
            map((res) => res as IDataResponse<IMember> || null, catchError((error) => new Observable)));
    }

}