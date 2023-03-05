/* eslint-disable new-parens */
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from "rxjs/operators";
import SYSTEM_CONSTANTS from "../../common/constants";
import { IFacilities, IFacilitiesList } from "../../common/u-innovate/define-facilities";
import HttpClient from "../http-client";

export default class FacilitiesAPI {
    static host = 'http://178.128.19.31:2001';

    static getAllFacilities(): Observable<IFacilities[] | null> {
        const api = `${FacilitiesAPI.host}/${SYSTEM_CONSTANTS.API.FACILITIES.GET_ALL}`;
        return HttpClient.get(api, {}).pipe(
            map((res) => res as IFacilities[] || null, catchError((error) => new Observable))
        );
    }

    static getAllFacilitiesByDescription(): Observable<IFacilitiesList | null> {
        const api = `${FacilitiesAPI.host}/${SYSTEM_CONSTANTS.API.FACILITIES.GET_BY_DESCRIPTION}`;
        return HttpClient.get(api, {}).pipe(
            map((res) => res as IFacilitiesList || null, catchError((error) => new Observable))
        );
    }

}