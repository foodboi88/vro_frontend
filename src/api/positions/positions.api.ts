/* eslint-disable new-parens */
import SYSTEM_CONSTANTS from "../../common/constants";
import HttpClient from "../http-client";
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from "rxjs/operators";
import { IPosition } from "../../common/u-innovate/define-position";

export default class PositionsAPI {
    static host = 'http://178.128.19.31:2001';

    static getAllPositions(): Observable<IPosition[] | null> {
        const api = `${PositionsAPI.host}/${SYSTEM_CONSTANTS.API.POSITIONS.GET_ALL}`;
        return HttpClient.get(api, {}).pipe(
            map((res) => res as IPosition[] || null, catchError((error) => new Observable))
        );
    }


}