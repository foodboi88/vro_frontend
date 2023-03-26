/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-debugger */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { WritableDraft } from "immer/dist/internal";
import { catchError, filter, map, mergeMap, switchMap } from "rxjs/operators";
// import IdentityApi from "../../api/identity.api";
import { RootEpic } from "../../common/define-type";
import Utils from "../../common/utils";
import IdentityApi from "../../api/identity/identity.api";
import SketchsApi from "../../api/sketchs/sketchs.api";
import { forkJoin } from "rxjs";
import { IReqGetLatestSketchs } from "../../common/sketch.interface";

type MessageLogin = {
    content: string;
    errorCode?: number;
};
type MessageForgot = {
    ErrorCode?: number;
    Message: string;
};
interface SketchState {
    loading: boolean;
    isSuccess: boolean;
    user: any | undefined;
    message: MessageLogin | undefined;
    messageForgot: MessageForgot | undefined;
    departmentId: number;
    refresh_token: string;
    statusCode: string | undefined;
    tokenLogin: string | undefined;
    isExistEmail: boolean;
    registerSuccess: boolean;
}

const initState: SketchState = {
    loading: false,
    isSuccess: true,
    user: undefined,
    departmentId: 1,
    message: undefined,
    messageForgot: undefined,
    refresh_token: "",
    statusCode: undefined,
    tokenLogin: undefined,
    isExistEmail: true,
    registerSuccess: false,
};

const sketchSlice = createSlice({
    name: "sketch",
    initialState: initState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },

        getHomeListSketchRequest(state) {
            state.loading = true;
        },

        getHomeListSketchSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log("Da chui vao voi action: ", action);
        },

        getLatestSketchRequest(state, action: PayloadAction<any>) {
            state.loading = true;
            state.registerSuccess = false;
            console.log("Da chui vao voi action: ", action);
        },

        getLatestSketchSuccess(state, action: PayloadAction<any>) {
            console.log(action);

            notification.open({
                message: "Đăng ký tài khoản thành công",
                // description:
                //     action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });

            // state.user = action.payload.user
            state.isSuccess = true;
            state.registerSuccess = true;
        },

        getLatestSketchFail(state, action: PayloadAction<any>) {
            console.log(action);

            notification.open({
                message: "Đăng ký không thành công",
                // description:
                //     action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
            state.loading = false;
            state.registerSuccess = false;
        },

        getMostViewdSketchsRequest(state, action: PayloadAction<any>) {
            state.loading = true;
            console.log("Da chui vao voi action: ", action);
        },

        getMostViewdSketchsSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log("Da chui vao voi action: ", action);
        },
    },
});

const uploadSketch$: RootEpic = (action$) =>
    action$.pipe(
        filter(getLatestSketchRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);
            const body: any = {
                email: re.payload.email,
                password: re.payload.password,
                remember: re.payload.remember,
                additionalProp1: {},
            };

            return SketchsApi.getLatestSketchs(body).pipe(
                mergeMap((res: any) => {
                    console.log(res);
                    console.log(res.data.accessToken);
                    const token = res.data.accessToken;
                    return [];
                }),
                catchError((err) => [])
            );
        })
    );

const getHomeListSketch$: RootEpic = (action$) =>
    action$.pipe(
        filter(getHomeListSketchRequest.match),
        switchMap((re) => {
            const bodyrequest: IReqGetLatestSketchs = {
                size: 10,
                offset: 0,
            };

            return [
                sketchSlice.actions.getLatestSketchRequest(bodyrequest),
                sketchSlice.actions.getMostViewdSketchsRequest(bodyrequest),
            ];
        })
    );

const getLatestSketchs$: RootEpic = (action$) =>
    action$.pipe(
        filter(getLatestSketchRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);

            return SketchsApi.getLatestSketchs(re.payload).pipe(
                mergeMap((res: any) => {
                    console.log(res);

                    return [sketchSlice.actions.getLatestSketchSuccess(res)];
                }),
                catchError((err) => [])
            );
        })
    );

const getMostViewdSketchs$: RootEpic = (action$) =>
    action$.pipe(
        filter(getMostViewdSketchsRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);

            return SketchsApi.getMostViewsSketchs(re.payload).pipe(
                mergeMap((res: any) => {
                    console.log(res);

                    return [
                        sketchSlice.actions.getMostViewdSketchsSuccess(res),
                    ];
                }),
                catchError((err) => [])
            );
        })
    );

const getMostDownloadedSketchs$: RootEpic = (action$) =>
    action$.pipe(
        filter(getLatestSketchRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);
            const body: any = {
                email: re.payload.email,
                password: re.payload.password,
                remember: re.payload.remember,
                additionalProp1: {},
            };

            return IdentityApi.login(body).pipe(
                mergeMap((res: any) => {
                    console.log(res);
                    console.log(res.data.accessToken);
                    const token = res.data.accessToken;
                    return [];
                }),
                catchError((err) => [])
            );
        })
    );

export const SketchEpics = [
    uploadSketch$,
    getHomeListSketch$,
    getLatestSketchs$,
    getMostViewdSketchs$,
    getMostDownloadedSketchs$,
];
export const {
    getLatestSketchRequest,
    getHomeListSketchRequest,
    getMostViewdSketchsRequest,
} = sketchSlice.actions;
export const sketchReducer = sketchSlice.reducer;
