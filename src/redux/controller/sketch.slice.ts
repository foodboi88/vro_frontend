/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-debugger */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CheckboxOptionType, notification } from "antd";
import {
    catchError,
    concatMap,
    filter,
    map,
    mergeMap,
    switchMap,
} from "rxjs/operators";
// import IdentityApi from "../../api/identity.api";
import { RootEpic } from "../../common/define-type";
import Utils from "../../common/utils";
import IdentityApi from "../../api/identity/identity.api";
import SketchsApi from "../../api/sketchs/sketchs.api";
import { forkJoin } from "rxjs";
import {
    ICurrentSearchValue,
    IDetailSketch,
    IFilteredSketch,
    IReqGetLatestSketchs,
    IReqProductsFiles,
    ISketch,
    ISketchInCart,
} from "../../common/sketch.interface";
import { ITool } from "../../common/tool.interface";
import FilterCriteriasApi from "../../api/filter-criterias/filter-criterias.api";
import CommentsApi from "../../api/comment/comment.api";
import { IAuthor, IUser } from "../../common/user.interface";
import ImageSketchApi from "../../api/image-sketch/image-sketch.api";
import { IRates } from "../../common/rates.interface";
import RatesApi from "../../api/rates/rates.api";
import { IInFoSketch } from "../../common/sketch.interface";
import PaymentApi from "../../api/payment/payment.api";
import { IPaymentRequest } from "../../common/payment.interface";
import { IBusiness } from "../../common/profile.interface";
import ProfileAPI from "../../api/profile/profile.api";

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
    villaSketchList: ISketch[];
    streetHouseSketchList: ISketch[];
    factorySketchList: ISketch[];
    interiorSketchList: ISketch[];
    freeSketchList: ISketch[];
    detailSketch?: IDetailSketch;
    commentList?: any[];
    filteredSketchs?: IFilteredSketch[];
    filteredAuthors?: IUser[];
    currentSearchValue: ICurrentSearchValue;
    checkWhetherSketchUploaded: number; // Là số chẵn thì chắc chắn file đó đã đc up cả ảnh + file + content thành công
    ratesLst: IRates | undefined;
    productsFile: string | undefined;
    checkProductsFile: boolean;
    lstSketchsInCart: ISketchInCart[];
    sketchsQuantityInCart: number;
    vnpayLink: string;
    authorIntroduction: IAuthor | undefined;
    checkPayment: boolean;
    checkInCart: boolean;
    businessProfile: IBusiness | undefined;
}

const initState: SketchState = {
    loading: false,
    isSuccess: true,
    user: undefined,
    message: undefined,
    messageForgot: undefined,
    refresh_token: Utils.getValueLocalStorage("refresh_token"),
    statusCode: undefined,
    tokenLogin: Utils.getValueLocalStorage("token"),
    isExistEmail: true,
    registerSuccess: false,
    toolList: [],
    architectureList: [],
    styleList: [],
    latestSketchsList: [],
    mostViewedSketchList: [],
    villaSketchList: [],
    factorySketchList: [],
    streetHouseSketchList: [],
    interiorSketchList: [],
    detailSketch: undefined,
    commentList: [],
    filteredSketchs: [],
    freeSketchList: [],
    filteredAuthors: [],
    currentSearchValue: {
        architecture: '',
        style: '',
        name: "",
        tool: '',
    },
    checkWhetherSketchUploaded: 0,
    ratesLst: undefined,
    productsFile: undefined,
    checkProductsFile: false,
    lstSketchsInCart: [],
    sketchsQuantityInCart: 0,
    vnpayLink: "",
    authorIntroduction: undefined,
    checkPayment: false,
    checkInCart: false,

    businessProfile: undefined,

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



        getAllVillaSketchRequest(state) {

        },

        getAllVillaSketchSuccess(state, action: PayloadAction<any>) {
            state.villaSketchList = action.payload.data[0].items
        },

        getAllStreetHouseSketchRequest(state) {

        },

        getAllStreetHouseSketchSuccess(state, action: PayloadAction<any>) {
            state.streetHouseSketchList = action.payload.data[0].items

        },

        getAllFactorySketchRequest(state) {

        },

        getAllFactorySketchSuccess(state, action: PayloadAction<any>) {
            state.factorySketchList = action.payload.data[0].items

        },

        getAllInteriorSketchRequest(state) {

        },

        getAllInteriorSketchSuccess(state, action: PayloadAction<any>) {
            state.interiorSketchList = action.payload.data[0].items
        },

        getLatestSketchRequest(state, action: PayloadAction<any>) {
            state.loading = true;
            console.log("Da chui vao voi action: ", action);
        },

        getLatestSketchSuccess(state, action: PayloadAction<any>) {
            console.log(action);
            state.latestSketchsList = action.payload.data;
            // notification.open({
            //     message: "Load success",
            //     // description:
            //     //     action.payload.response.message,
            //     onClick: () => {
            //         console.log("Notification Clicked!");
            //     },
            // });

            // state.user = action.payload.user
            state.isSuccess = true;
            state.loading = false;

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
            // state.registerSuccess = false;
        },

        getFreeSketchRequest(state) {
            state.loading = true;
            // console.log("Da chui vao voi action: ", action);
        },

        getFreeSketchSuccess(state, action: PayloadAction<any>) {
            console.log(action);
            state.freeSketchList = action.payload.data.items;
            // notification.open({
            //     message: "Load success",
            //     // description:
            //     //     action.payload.response.message,
            //     onClick: () => {
            //         console.log("Notification Clicked!");
            //     },
            // });

            // state.user = action.payload.user
            state.isSuccess = true;
            state.loading = false;

            // state.registerSuccess = true;
        },

        getFreeSketchFail(state, action: PayloadAction<any>) {
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
            // state.registerSuccess = false;
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
            console.log(action.payload.data);
            state.toolList = action.payload.data.map(
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
            console.log(action.payload.data);
            state.styleList = action.payload.data.map(
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
            console.log(action.payload.data);
            state.architectureList = action.payload.data.map(
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
            console.log(action.payload.data);
        },

        getCommentBySketchIdRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getCommentBySketchIdSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
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
                // style: action.payload.style
                //     ? action.payload.style
                //     : state.currentSearchValue.style,
                name: action.payload.name
                    ? action.payload.name
                    : state.currentSearchValue.name,
                // tool: action.payload.tool
                //     ? action.payload.tool
                //     : state.currentSearchValue.tool,
            };
        },

        advancedSearchingSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.filteredAuthors = action.payload.data.author;
            state.filteredSketchs = action.payload.data.items;
        },

        uploadSketchRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        uploadSketchSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            // state.checkWhetherSketchUploaded += 1;
            // if (state.checkWhetherSketchUploaded % 2 === 0) {
            // Cu chia het cho 2 thi la up file thanh cong
            state.checkProductsFile = true;
            notification.open({
                message: "Thành công",
                description: "Tải bản vẽ lên thành công",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
            // }
        },

        uploadSketchFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: "Thất bại",
                description: "Tải bản vẽ lên thất bại",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        },

        uploadFileSketchRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        uploadFileSketchSuccess(state) {
            state.loading = false;
        },

        uploadImageSketchRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        uploadImageSketchSuccess(state) {
            state.loading = false;
        },

        uploadContentSketchRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        uploadContentSketchSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
        },

        getRatesBySketchIdRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        getRatesBySketchIdSuccess(state, action: PayloadAction<IRates>) {
            state.loading = false;
            state.ratesLst = action.payload;
        },
        getRatesBySketchIdFail(state, action: PayloadAction<any>) {
            state.loading = false;
        },

        getProductFilesByIdRequest(state, action: PayloadAction<string>) {
            state.loading = true;
        },
        getProductFilesByIdSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.productsFile = ''
            if (typeof action.payload === "string") {
                console.log(action.payload);
                state.productsFile = '';
            }
            else {
                console.log(action.payload);

                if (action.payload) {
                    if (action.payload[0])
                        state.productsFile = action.payload[0].filePath;
                }
                else {
                    state.productsFile = 'string';
                }
            }
        },
        getProductFilesByIdFail(state, action: PayloadAction<any>) {
            state.loading = false;
        },

        //Cart
        addSketchToCartRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        addSketchToCartSuccess(state, action: PayloadAction<any>) {
            state.loading = false;

            state.sketchsQuantityInCart = action.payload.Quantity;
            notification.open({
                message: "Thành công",
                description: "Thêm sản phẩm vào giỏ hàng thành công",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        },
        addSketchToCartFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: "Thêm sản phẩm không thành công",
                description: action.payload.response.message,
                onClick: () => {
                    console.log(action.payload.message);
                },
            });
        },

        //Lấy số lượng sản phẩm trong giỏ
        getSketchQuantityInCartRequest(state) {
            state.loading = true;
        },
        getSketchQuantityInCartSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload);
            state.sketchsQuantityInCart = action.payload.data.quantityProduct;
        },
        getSketchQuantityInCartFail(state, action: PayloadAction<any>) {
            state.loading = false;
        },

        //Lấy tất cả sản phẩm trong giỏ
        getAllSketchInCartRequest(state) {
            state.loading = true;
        },
        getAllSketchInCartSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload);
            if (typeof action.payload === "string")
                state.lstSketchsInCart = [];
            else
                state.lstSketchsInCart = action.payload.data;
        },
        getAllSketchInCartFail(state, action: PayloadAction<any>) {
            state.loading = false;
            state.lstSketchsInCart = [];

        },

        //Xoa san pham trong gio
        deleteSketchInCartRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        deleteSketchInCartSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload);
            state.lstSketchsInCart = action.payload;
        },
        deleteSketchInCartFail(state, action: PayloadAction<any>) {
            state.loading = false;
        },

        //Thanh toán
        purchaseWithVNPayRequest(
            state,
            action: PayloadAction<IPaymentRequest>
        ) {
            state.loading = true;
        },
        purchaseWithVNPaySuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload);
            state.vnpayLink = action.payload;
        },
        purchaseWithVNPayFail(state, action: PayloadAction<any>) { },

        // Get Author intro
        getAuthorIntroductionByIdRequest(state, action: PayloadAction<string>) {
            state.loading = true;
        },
        getAuthorIntroductionByIdSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload);
            state.authorIntroduction = action.payload;
        },
        getAuthorIntroductionByIdFail(state, action: PayloadAction<any>) {
            state.loading = false;
        },

        // get Sketch List By Author Id
        getSketchListByAuthorIdRequest(state, action: PayloadAction<string>) {
            state.loading = true;
        },
        getSketchListByAuthorIdSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload);
            state.filteredSketchs = action.payload.data.items;
        },
        getSketchListByAuthorIdFail(state, action: PayloadAction<any>) {
            state.loading = false;
        },

        // Get business by tax code
        getBusinessByTaxCodeRequest(state, action: PayloadAction<string>) {
            state.loading = true;
        },

        getBusinessByTaxCodeSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload);
            if (action.payload.data)
                state.businessProfile = action.payload.data;
        },
        getBusinessByTaxCodeFail(state, action: PayloadAction<any>) {
            state.loading = false;
        },

    },
});

// Lay ra tat ca du lieu cua trang home
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
                // sketchSlice.actions.getAllVillaSketchRequest(),
                // sketchSlice.actions.getAllStreetHouseSketchRequest(),
                // sketchSlice.actions.getAllFactorySketchRequest(),
                // sketchSlice.actions.getAllInteriorSketchRequest(),
                sketchSlice.actions.getFreeSketchRequest(),

            ];
        })
    );

const getAllVillaSketch$: RootEpic = (action$) =>
    action$.pipe(
        filter(getAllVillaSketchRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);

            const typeId = "64231026edf9dd11e488c250"

            return SketchsApi.getSketchsByTypeOfArchitecture(typeId).pipe(
                mergeMap((res: any) => {
                    console.log(res);

                    return [sketchSlice.actions.getAllVillaSketchSuccess(res)];
                }),
                catchError((err) => [])
            );
        })
    );

const getAllStreetHouseSketch$: RootEpic = (action$) =>
    action$.pipe(
        filter(getAllStreetHouseSketchRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);

            const typeId = "64231030edf9dd11e488c252"

            return SketchsApi.getSketchsByTypeOfArchitecture(typeId).pipe(
                mergeMap((res: any) => {
                    console.log(res);

                    return [sketchSlice.actions.getAllStreetHouseSketchSuccess(res)];
                }),
                catchError((err) => [])
            );
        })
    );

const getAllFactorySketch$: RootEpic = (action$) =>
    action$.pipe(
        filter(getAllFactorySketchRequest.match),
        switchMap((re) => {
            console.log(re);

            const typeId = "642ce3895de07140c4f4cd61"

            return SketchsApi.getSketchsByTypeOfArchitecture(typeId).pipe(
                mergeMap((res: any) => {
                    console.log(res);

                    return [sketchSlice.actions.getAllFactorySketchSuccess(res)];
                }),
                catchError((err) => [])
            );
        })
    );

const getAllInteriorSketch$: RootEpic = (action$) =>
    action$.pipe(
        filter(getAllInteriorSketchRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);

            const typeId = "642ce3965de07140c4f4cd62"

            return SketchsApi.getSketchsByTypeOfArchitecture(typeId).pipe(
                mergeMap((res: any) => {
                    console.log(res);

                    return [sketchSlice.actions.getAllInteriorSketchSuccess(res)];
                }),
                catchError((err) => [])
            );
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

const getFreeSketch$: RootEpic = (action$) =>
    action$.pipe(
        filter(getFreeSketchRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            // console.log(re);

            const type = 'freeProduct';

            return SketchsApi.getSketchsByType(type).pipe(
                mergeMap((res: any) => {
                    console.log(res);

                    return [sketchSlice.actions.getFreeSketchSuccess(res)];
                }),
                catchError((err) => [
                    sketchSlice.actions.getFreeSketchFail(err)
                ])
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

//Lay ra cac tieu chi filter
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

// Lay tat ca noi dung cua trang detail sketch: noi dung ban ve + comment
const getDetailSketchPageContent$: RootEpic = (action$) =>
    action$.pipe(
        filter(getDetailSketchPageContentRequest.match),
        switchMap((re) => {
            return [
                sketchSlice.actions.getDetailSketchRequest(re.payload),
                // sketchSlice.actions.getCommentBySketchIdRequest(re.payload),
            ];
        })
    );

const getDetailSketch$: RootEpic = (action$) =>
    action$.pipe(
        filter(getDetailSketchRequest.match),
        concatMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);

            return SketchsApi.getSketchById(re.payload).pipe(
                concatMap((res: any) => {
                    console.log(res);

                    return [
                        sketchSlice.actions.getDetailSketchSuccess(res),
                        sketchSlice.actions.getAuthorIntroductionByIdRequest(
                            res.data.info.userId
                        ),

                        sketchSlice.actions.getDetailSketchPageContentSuccess(),
                    ];
                }),
                catchError((err) => [])
            );
        })
    );

const getCommentBySketchId$: RootEpic = (action$) =>
    action$.pipe(
        filter(getCommentBySketchIdRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);

            const params = {
                size: 20,
                offset: 0,
                productId: re.payload,
            };

            return CommentsApi.getCommentsBySketchId(params).pipe(
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

const getAuthorIntroductionById$: RootEpic = (action$) =>
    action$.pipe(
        filter(getAuthorIntroductionByIdRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);

            return SketchsApi.getAuthorById(re.payload).pipe(
                mergeMap((res: any) => {
                    console.log(res);

                    return [
                        sketchSlice.actions.getAuthorIntroductionByIdSuccess(
                            res.data
                        ),
                    ];
                }),
                catchError((err) => [])
            );
        })
    );

// http://14.231.84.10:6068/products/filter?size=10&offset=0&name=a
const advancedSearchSketch$: RootEpic = (action$) =>
    action$.pipe(
        filter(advancedSearchingRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);
            const bodyrequest: ICurrentSearchValue = {
                size: 40,
                offset: 0,
                name: re.payload.name ? re.payload.name : "",
                tool: re.payload.tool ? re.payload.tool : "",
                architecture: re.payload.architecture
                    ? re.payload.architecture
                    : "",
                style: re.payload.style ? re.payload.style : "",
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

// Upload ban ve: upload anh + upload file + upload content
const uploadImageSketch$: RootEpic = (action$) =>
    action$.pipe(
        filter(uploadImageSketchRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);

            const { id, imageUploadLst } = re.payload;
            const file = imageUploadLst[0] as File;

            let imageData = new FormData();
            re.payload.imageUploadLst.forEach((item: any) => {
                imageData.append("files", item as File); // chinh lai ten file anh sau
            });
            // imageData.append("file", file);
            imageData.append("productId_in", re.payload.id);

            // const bodyrequest = {
            //     productId_in: re.payload.id,
            //     files: re.payload.imageUploadLst,
            // };

            return ImageSketchApi.uploadSketchImage(imageData).pipe(
                mergeMap((res: any) => {
                    console.log(res);
                    return [
                        sketchSlice.actions.uploadImageSketchSuccess(),
                        // sketchSlice.actions.uploadFileSketchRequest(res),
                        // sketchSlice.actions.uploadSketchSuccess(res), // vao luu gia tri check thanh cong lan 1
                    ];
                }),
                catchError((err) => [sketchSlice.actions.uploadSketchFail(err)])
            );
        })
    );

const uploadFileSketch$: RootEpic = (action$) =>
    action$.pipe(
        filter(uploadFileSketchRequest.match),
        switchMap((re) => {
            const { id, fileUploadLst } = re.payload;
            const file = fileUploadLst[0] as File;

            const formData = new FormData();
            formData.append("productId_in", id);
            formData.append("file", file);

            return SketchsApi.uploadSketchFile(formData).pipe(
                mergeMap((res: any) => {
                    console.log(res);
                    return [
                        sketchSlice.actions.uploadFileSketchSuccess(),
                        // sketchSlice.actions.uploadContentSketchRequest(res),
                        sketchSlice.actions.uploadSketchSuccess(res), // vao luu gia tri check thanh cong lan 2
                    ];
                }),
                catchError((err) => [sketchSlice.actions.uploadSketchFail(err)])
            );
        })
    );

const uploadContentSketch$: RootEpic = (action$) =>
    action$.pipe(
        filter(uploadSketchRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);

            const bodyrequest = {
                // searchType: searchType,
                // selectedType: selectedType,
                title: re.payload.title,
                // selectedTag: selectTag,
                // imageUploadLst: re.payload.imageUploadLst,
                // fileUploadLst: re.payload.fileUploadLst,
                size: re.payload.size,
                price: re.payload.price,
                content: re.payload.content,
                productDesignStyles: re.payload.productDesignStyles,
                productDesignTools: re.payload.productDesignTools,
                productTypeOfArchitecture: re.payload.productTypeOfArchitecture,
            };

            return SketchsApi.uploadSketchContent(bodyrequest).pipe(
                mergeMap((res: any) => {
                    console.log(res);
                    res = { ...res.data, ...re.payload };
                    return [
                        sketchSlice.actions.uploadFileSketchRequest(res),
                        sketchSlice.actions.uploadImageSketchRequest(res),
                    ];
                }),
                catchError((err) => [sketchSlice.actions.uploadSketchFail(err)])
            );
        })
    );

const getSketchListByAuthorId$: RootEpic = (action$) =>
    action$.pipe(
        filter(getSketchListByAuthorIdRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);
            return SketchsApi.getSketchListByAuthorId(re.payload).pipe(
                mergeMap((res: IRates) => {
                    return [
                        sketchSlice.actions.getSketchListByAuthorIdSuccess(res),
                    ];
                }),
                catchError((err) => [])
            );
        })
    );
const getProductFilesById$: RootEpic = (action$) =>
    action$.pipe(
        filter(getProductFilesByIdRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            return SketchsApi.getProductFilesById(re.payload).pipe(
                switchMap((res: any) => {
                    console.log(res);
                    return [
                        sketchSlice.actions.getProductFilesByIdSuccess(res),

                    ];
                }),
                catchError((err) => [])
            );
        })
    );

//Add sketch to cart
const addSketchToCart$: RootEpic = (action$) =>
    action$.pipe(
        filter(addSketchToCartRequest.match),
        switchMap((re) => {
            console.log(re);
            const req = {
                productId: re.payload.productId,
                additionalProp1: {},
            };
            return SketchsApi.addSketchToCart(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        sketchSlice.actions.addSketchToCartSuccess(res),
                        sketchSlice.actions.getSketchQuantityInCartRequest()
                    ];
                }),
                catchError((err) => [sketchSlice.actions.addSketchToCartFail(err)])

            );
        })
    );

const getRatesBySketchId$: RootEpic = (action$) =>
    action$.pipe(
        filter(getRatesBySketchIdRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);
            return RatesApi.getRatesBySketchId(re.payload).pipe(
                mergeMap((res: IRates) => {
                    return [sketchSlice.actions.getRatesBySketchIdSuccess(res)];
                }),
                catchError((err) => [])
            );
        })
    );

//Get all sketch in cart
const getAllSketchInCart$: RootEpic = (action$) =>
    action$.pipe(
        filter(getAllSketchInCartRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);
            return SketchsApi.getAllSketchInCart().pipe(
                mergeMap((res: any) => {
                    return [sketchSlice.actions.getAllSketchInCartSuccess(res)];
                }),
                catchError((err) => [
                    sketchSlice.actions.getAllSketchInCartFail(err)
                ])
            );
        })
    );

//Get sketch quantity in cart
const getSketchQuantityInCart$: RootEpic = (action$) =>
    action$.pipe(
        filter(getSketchQuantityInCartRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);
            return SketchsApi.getSketchQuantityInCart().pipe(
                mergeMap((res: any) => {
                    return [
                        sketchSlice.actions.getSketchQuantityInCartSuccess(res),
                    ];
                }),
                catchError((err) => [])
            );
        })
    );

//chuyen san man thanh toan VNPay
const purchaseWithVNPay$: RootEpic = (action$) =>
    action$.pipe(
        filter(purchaseWithVNPayRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);
            return PaymentApi.purchaseWithVNPay(re.payload).pipe(
                mergeMap((res: any) => {
                    return [sketchSlice.actions.purchaseWithVNPaySuccess(res)];
                }),
                catchError((err) => [
                    sketchSlice.actions.purchaseWithVNPayFail(err),
                ])
            );
        })
    );

//chuyen san man thanh toan VNPay
const deleteSketchInCart$: RootEpic = (action$) =>
    action$.pipe(
        filter(deleteSketchInCartRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);
            return SketchsApi.deleteSketchInCart(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        sketchSlice.actions.getAllSketchInCartRequest(),
                        sketchSlice.actions.getSketchQuantityInCartRequest()
                    ];
                }),
                catchError((err) => [
                    sketchSlice.actions.deleteSketchInCartFail(err),
                    sketchSlice.actions.getSketchQuantityInCartRequest()

                ])
            );
        })
    );

const getBusinessByTaxCode$: RootEpic = (action$) =>
    action$.pipe(
        filter(getBusinessByTaxCodeRequest.match),
        switchMap((re) => {

            return ProfileAPI.getBusiness(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        sketchSlice.actions.getBusinessByTaxCodeSuccess(res),
                    ];
                }),
                catchError((err) => [
                    sketchSlice.actions.getBusinessByTaxCodeFail(err),
                ])
            );
        })
    );


export const SketchEpics = [
    // uploadSketch$,
    getHomeListSketch$,
    getFreeSketch$,
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
    uploadImageSketch$,
    uploadContentSketch$,
    uploadFileSketch$,
    getRatesBySketchId$,
    getProductFilesById$,
    addSketchToCart$,
    getSketchQuantityInCart$,
    getAllSketchInCart$,
    purchaseWithVNPay$,
    getAuthorIntroductionById$,
    getRatesBySketchId$,
    getSketchListByAuthorId$,
    deleteSketchInCart$,
    getAllVillaSketch$,
    getAllFactorySketch$,
    getAllStreetHouseSketch$,
    getAllInteriorSketch$,
    getBusinessByTaxCode$,
];
export const {
    getLatestSketchRequest,
    getFreeSketchRequest,
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
    uploadSketchRequest,
    uploadContentSketchRequest,
    uploadFileSketchRequest,
    uploadImageSketchRequest,
    getRatesBySketchIdRequest,
    getProductFilesByIdRequest,
    addSketchToCartRequest,
    getSketchQuantityInCartRequest,
    getAllSketchInCartRequest,
    purchaseWithVNPayRequest,
    getAuthorIntroductionByIdRequest,
    getSketchListByAuthorIdRequest,
    deleteSketchInCartRequest,
    getAllVillaSketchRequest,
    getAllStreetHouseSketchRequest,
    getAllFactorySketchRequest,
    getAllInteriorSketchRequest,
    getBusinessByTaxCodeRequest,
} = sketchSlice.actions;
export const sketchReducer = sketchSlice.reducer;




