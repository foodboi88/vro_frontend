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
import {
    ICurrentSearchValue,
    IReqGetLatestSketchs,
} from "../../common/sketch.interface";

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

    //Tim kiem nang cao
    static advancedSearching(body: ICurrentSearchValue): Observable<any> {
        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.ADVANCED_SEARCHING}?size=${body.size}&offset=${body.offset}&name=${body.name}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static uploadSketchContent(body: any): Observable<any> {
        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.UPLOAD_CONTENT_OF_SKETCH}`;
        return HttpClient.post(api, body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static uploadSketchFile(body: any): Observable<any> {
        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.UPLOAD_FILES_OF_SKETCH}`;
        return HttpClient.post(api, body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getAuthorBySketchId(sketchId: string): Observable<any> {
        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.ADVANCED_SEARCHING}?name=${sketchId}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getProductFilesById(
        sketchId: string,
        token: string
    ): Observable<any> {
        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.GET_PRODUCT_FILE_BY_ID}?id=${sketchId}`;
        return HttpClient.get(api, {
            headers: { Authorization: `Bearer ${token}` },
        }).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static addSketchToCart(sketchId: string): Observable<any> {
        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.ADD_SKETCH_TO_CART}`;
        return HttpClient.post(api, {
            productId: sketchId,
        }).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getSketchQuantityInCart(): Observable<any> {
        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.GET_SKETCH_QUANTITY_IN_CART}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getAllSketchInCart(): Observable<any> {
        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.GET_ALL_SKETCH_IN_CART}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }
}
