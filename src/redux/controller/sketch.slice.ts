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
import {
    ICurrentSearchValue,
    IReqGetLatestSketchs,
    ISketch,
} from "../../common/sketch.interface";
import { ITool } from "../../common/tool.interface";
import FilterCriteriasApi from "../../api/filter-criterias/filter-criterias.api";
import CommentsApi from "../../api/comment/comment.api";
import { IUser } from "../../common/user.interface";

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
    filteredSketchs?: ISketch[];
    filteredAuthors?: IUser[];
    currentSearchValue: ICurrentSearchValue;
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
    filteredSketchs: [],
    filteredAuthors: [],
    currentSearchValue: {
        architecture: [],
        style: [],
        text: "",
        tool: [],
    },
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
            console.log("Da chui vao voi action: ", action);
        },

        getLatestSketchSuccess(state, action: PayloadAction<any>) {
            console.log(action);
            state.latestSketchsList = action.payload.data;
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
            notification.open({
                message: "Load fail",
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
            state.mostViewedSketchList = action.payload.data;

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

        getDetailSketchPageContentRequest(
            state,
            action: PayloadAction<string>
        ) {
            state.loading = true;
        },

        getDetailSketchPageContentSuccess(state) {
            state.loading = false;
        },

        advancedSearchingRequest(
            state,
            action: PayloadAction<ICurrentSearchValue>
        ) {
            state.loading = true;

            state.currentSearchValue = {
                // Xu ly de lay duoc ca gia tri cua o input cua header va cac o selectbox cua filter. Neu co
                // truong nao khong co gia tri thi lay gia tri hien tai duoc luu trong redux
                architecture: action.payload.architecture
                    ? action.payload.architecture
                    : state.currentSearchValue.architecture,
                style: action.payload.style
                    ? action.payload.style
                    : state.currentSearchValue.style,
                text: action.payload.text
                    ? action.payload.text
                    : state.currentSearchValue.text,
                tool: action.payload.tool
                    ? action.payload.tool
                    : state.currentSearchValue.tool,
            };
        },

        advancedSearchingSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.filteredAuthors = action.payload.data.author;
            state.filteredSketchs = action.payload.data.sketch;
        },
    },
});

// const uploadSketch$: RootEpic = (action$) =>
//     action$.pipe(
//         filter(getLatestSketchRequest.match),
//         switchMap((re) => {
//             // IdentityApi.login(re.payload) ?
//             console.log(re);
//             const body: any = {
//                 email: re.payload.email,
//                 password: re.payload.password,
//                 remember: re.payload.remember,
//                 additionalProp1: {},
//             };

//             return SketchsApi.getLatestSketchs(body).pipe(
//                 mergeMap((res: any) => {
//                     console.log(res);
//                     console.log(res.data.accessToken);
//                     const token = res.data.accessToken;
//                     return [];
//                 }),
//                 catchError((err) => [])
//             );
//         })
//     );

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

// const getMostDownloadedSketchs$: RootEpic = (action$) =>
//     action$.pipe(
//         filter(getLatestSketchRequest.match),
//         switchMap((re) => {
//             // IdentityApi.login(re.payload) ?
//             console.log(re);
//             const body: any = {
//                 email: re.payload.email,
//                 password: re.payload.password,
//                 remember: re.payload.remember,
//                 additionalProp1: {},
//             };

//             return IdentityApi.login(body).pipe(
//                 mergeMap((res: any) => {
//                     console.log(res);
//                     console.log(res.data.accessToken);
//                     const token = res.data.accessToken;
//                     return [];
//                 }),
//                 catchError((err) => [])
//             );
//         })
//     );

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
        filter(getDetailSketchPageContentRequest.match),
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
// advancedSearchingRequest

const getCommentBySketchId$: RootEpic = (action$) =>
    action$.pipe(
        filter(getCommentBySketchIdRequest.match),
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

const advancedSearchSketch$: RootEpic = (action$) =>
    action$.pipe(
        filter(advancedSearchingRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);
            const bodyrequest: ICurrentSearchValue = {
                text: re.payload.text ? re.payload.text : "",
                tool: re.payload.tool ? re.payload.tool : [],
                architecture: re.payload.architecture
                    ? re.payload.architecture
                    : [],
                style: re.payload.style ? re.payload.style : [],
            };

            return SketchsApi.advancedSearching(bodyrequest).pipe(
                mergeMap((res: any) => {
                    console.log(res);
                    return [sketchSlice.actions.advancedSearchingSuccess(res)];
                }),
                catchError((err) => [])
            );
        })
    );

export const SketchEpics = [
    // uploadSketch$,
    getHomeListSketch$,
    getLatestSketchs$,
    getMostViewdSketchs$,
    // getMostDownloadedSketchs$,
    getAllTools$,
    getAllStyles$,
    getAllArchitectures$,
    getAllFitlerCriterias$,
    getDetailSketch$,
    getCommentBySketchId$,
    getDetailSketchPageContent$,
    advancedSearchSketch$,
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
    advancedSearchingRequest,
} = sketchSlice.actions;
export const sketchReducer = sketchSlice.reducer;
