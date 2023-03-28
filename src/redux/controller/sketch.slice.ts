/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-debugger */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CheckboxOptionType, notification } from "antd";
import { catchError, filter, map, mergeMap, switchMap } from "rxjs/operators";
// import IdentityApi from "../../api/identity.api";
import { RootEpic } from "../../common/define-type";
import Utils from "../../common/utils";
import IdentityApi from "../../api/identity/identity.api";
import SketchsApi from "../../api/sketchs/sketchs.api";
import { forkJoin } from "rxjs";
import { IReqGetLatestSketchs, ISketch } from "../../common/sketch.interface";
import { ITool } from "../../common/tool.interface";
import FilterCriteriasApi from "../../api/filter-criterias/filter-criterias.api";
import CommentsApi from "../../api/comment/comment.api";

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
    refresh_token: string;
    statusCode: string | undefined;
    tokenLogin: string | undefined;
    isExistEmail: boolean;
    registerSuccess: boolean;
    toolList: CheckboxOptionType[];
    architectureList: CheckboxOptionType[];
    styleList: CheckboxOptionType[];
    latestSketchsList: ISketch[];
    mostViewedSketchList: ISketch[];
    detailSketch?: ISketch;
    commentList?: any[];
}

const initState: SketchState = {
    loading: false,
    isSuccess: true,
    user: undefined,
    message: undefined,
    messageForgot: undefined,
    refresh_token: "",
    statusCode: undefined,
    tokenLogin: undefined,
    isExistEmail: true,
    registerSuccess: false,
    toolList: [],
    architectureList: [],
    styleList: [],
    latestSketchsList: [],
    mostViewedSketchList: [],
    detailSketch: undefined,
    commentList: [],
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
            state.latestSketchsList = action.payload.data[0].items;
            notification.open({
                message: "Load success",
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
            state.mostViewedSketchList = action.payload.data[0].items;
            notification.open({
                message: "Load success",
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

        getAllToolsRequest(state, action: PayloadAction<any>) {
            state.loading = true;
            console.log("Da chui vao voi action: ", action);
        },

        getAllToolsSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload.data[0].items);
            state.toolList = action.payload.data[0].items.map(
                (item: ITool) =>
                    ({
                        label: item.name,
                        value: item.id,
                    } as CheckboxOptionType)
            );
            console.log(state.toolList);
            console.log("Da chui vao voi action: ", action);
        },

        getAllStylesRequest(state, action: PayloadAction<any>) {
            state.loading = true;
            console.log("Da chui vao voi action: ", action);
        },

        getAllStylesSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload.data[0].items);
            state.styleList = action.payload.data[0].items.map(
                (item: ITool) =>
                    ({
                        label: item.name,
                        value: item.id,
                    } as CheckboxOptionType)
            );
            console.log(state.toolList);
            console.log("Da chui vao voi action: ", action);
        },

        getAllArchitecturesRequest(state, action: PayloadAction<any>) {
            state.loading = true;
            console.log("Da chui vao voi action: ", action);
        },

        getAllArchitecturesSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload.data[0].items);
            state.architectureList = action.payload.data[0].items.map(
                (item: ITool) =>
                    ({
                        label: item.name,
                        value: item.id,
                    } as CheckboxOptionType)
            );
            console.log(state.architectureList);
            console.log("Da chui vao voi action: ", action);
        },

        getAllFilterCriteriasRequest(state) {
            state.loading = true;
        },

        getAllFilterCriteriasSuccess(state) {
            state.loading = false;
        },

        getDetailSketchRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getDetailSketchSuccess(state, action: PayloadAction<any>) {
            state.loading = true;
            state.detailSketch = action.payload.data;
        },

        getCommentBySketchIdRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getCommentBySketchIdSuccess(state, action: PayloadAction<any>) {
            state.loading = true;
            state.commentList = action.payload.data[0].items;
        },

        getDetailSketchPageContentRequest(state) {
            state.loading = true;
        },

        getDetailSketchPageContentSuccess(state) {
            state.loading = false;
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

const getAllFitlerCriterias$: RootEpic = (action$) =>
    action$.pipe(
        filter(getAllFilterCriteriasRequest.match),
        switchMap((re) => {
            const bodyrequest: IReqGetLatestSketchs = {
                size: 10,
                offset: 0,
            };

            return [
                sketchSlice.actions.getAllArchitecturesRequest(bodyrequest),
                sketchSlice.actions.getAllStylesRequest(bodyrequest),
                sketchSlice.actions.getAllToolsRequest(bodyrequest),
                sketchSlice.actions.getAllFilterCriteriasSuccess(),
            ];
        })
    );

const getAllTools$: RootEpic = (action$) =>
    action$.pipe(
        filter(getAllToolsRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);

            return FilterCriteriasApi.getTools(re.payload).pipe(
                mergeMap((res: any) => {
                    console.log(res);

                    return [sketchSlice.actions.getAllToolsSuccess(res)];
                }),
                catchError((err) => [])
            );
        })
    );

const getAllStyles$: RootEpic = (action$) =>
    action$.pipe(
        filter(getAllStylesRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);

            return FilterCriteriasApi.getStyles(re.payload).pipe(
                mergeMap((res: any) => {
                    console.log(res);

                    return [sketchSlice.actions.getAllStylesSuccess(res)];
                }),
                catchError((err) => [])
            );
        })
    );

const getAllArchitectures$: RootEpic = (action$) =>
    action$.pipe(
        filter(getAllArchitecturesRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);

            return FilterCriteriasApi.getArchitectures(re.payload).pipe(
                mergeMap((res: any) => {
                    console.log(res);

                    return [
                        sketchSlice.actions.getAllArchitecturesSuccess(res),
                    ];
                }),
                catchError((err) => [])
            );
        })
    );

const getDetailSketchPageContent$: RootEpic = (
    action$ // Lay tat ca noi dung cua trang detail sketch: noi dung ban ve + comment
) =>
    action$.pipe(
        filter(getAllFilterCriteriasRequest.match),
        switchMap((re) => {
            return [
                sketchSlice.actions.getDetailSketchRequest(re.payload),
                sketchSlice.actions.getCommentBySketchIdRequest(re.payload),
            ];
        })
    );

const getDetailSketch$: RootEpic = (action$) =>
    action$.pipe(
        filter(getDetailSketchRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);

            return SketchsApi.getSketchById(re.payload).pipe(
                mergeMap((res: any) => {
                    console.log(res);

                    return [sketchSlice.actions.getDetailSketchSuccess(res)];
                }),
                catchError((err) => [])
            );
        })
    );

const getCommentBySketchId$: RootEpic = (action$) =>
    action$.pipe(
        filter(getDetailSketchRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);

            return CommentsApi.getCommentsBySketchId(re.payload).pipe(
                mergeMap((res: any) => {
                    console.log(res);

                    return [
                        sketchSlice.actions.getCommentBySketchIdSuccess(res),
                    ];
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
    getAllTools$,
    getAllStyles$,
    getAllArchitectures$,
    getAllFitlerCriterias$,
    getDetailSketch$,
    getCommentBySketchId$,
    getDetailSketchPageContent$,
];
export const {
    getLatestSketchRequest,
    getHomeListSketchRequest,
    getMostViewdSketchsRequest,
    getAllToolsRequest,
    getAllArchitecturesRequest,
    getAllStylesRequest,
    getAllFilterCriteriasRequest,
    getDetailSketchRequest,
    getCommentBySketchIdRequest,
    getDetailSketchPageContentRequest,
} = sketchSlice.actions;
export const sketchReducer = sketchSlice.reducer;
