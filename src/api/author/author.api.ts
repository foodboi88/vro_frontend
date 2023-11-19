import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import { API_URL } from "../../enum/api.enum";
import HttpClient from "../http-client";
import Utils from "../../common/utils";
import UserApi from "../user/user.api";

export default class AuthorApi {
    static apiURL = API_URL;

    // Lấy ra các sản phẩm hot nhất
    static getTopArchitects(): Observable<any> {

        const api = `${AuthorApi.apiURL.HOST}/${this.apiURL.GET_TOP_ARCHITECT}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

}
