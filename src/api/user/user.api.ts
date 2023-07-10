import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import { API_URL } from "../../enum/api.enum";
import HttpClient from "../http-client";
import Utils from "../../common/utils";

export default class UserApi {
    static apiURL = API_URL;

    static getAllWithdrawRequests(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        console.log(queryParam)
        const api = `${UserApi.apiURL.HOST}/${this.apiURL.WITHDRAW_REQUEST}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static createWithdrawRequest(body: any): Observable<any> {
        const api = `${UserApi.apiURL.HOST}/${this.apiURL.CREATE_WITHDRAW_REQUEST}`;
        return HttpClient.post(api,body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getBillList(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        console.log(queryParam)
        const api = `${UserApi.apiURL.HOST}/${this.apiURL.WITHDRAW_REQUEST}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }
}
