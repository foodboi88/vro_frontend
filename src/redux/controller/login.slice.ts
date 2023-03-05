/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-debugger */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { WritableDraft } from "immer/dist/internal";
import { catchError, filter, map, mergeMap, switchMap } from "rxjs/operators";
// import IdentityApi from "../../api/identity.api";
import { ActiveAccountRequest, CheckEmailResponse, GetUserInfoRequest, IUser, LoginRequest, RegisterRequest, ResponseDeparment } from "../../common/define-identity";
import { RootEpic } from "../../common/define-type";
import Utils from "../../common/utils";
import IdentityApi from "../../api/identity/identity.api";

type MessageLogin = {
    content: string;
    errorCode?: number
}
type MessageForgot = {
    ErrorCode?: number,
    Message: string
}
interface LoginState {
    loading: boolean;
    isSuccess: boolean;
    user: IUser | undefined;
    message: MessageLogin | undefined;
    messageForgot: MessageForgot | undefined;
    departmentId: number;
    refresh_token: string;
    statusCode: string | undefined;
    tokenLogin: string | undefined;
    isExistEmail: boolean;
    registerSuccess: boolean;
}

const initState: LoginState = {
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
}

const loginSlice = createSlice({
    name: 'login',
    initialState: initState,
    reducers: {
        loginRequest(state, action: PayloadAction<LoginRequest>) {
            state.loading = true;
            // console.log("da chui vao",state.loading)
        },
        loginSuccess(state, action: PayloadAction<{ token: string }>) {
            Utils.setLocalStorage('token', action.payload.token);
            state.tokenLogin = action.payload.token
            state.loading = false
            state.isSuccess = true;
            notification.open({
                message: 'Đăng nhập thành công',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
                style: {
                    paddingTop: 40
                }
            });
        },
        loginFail(state, action: any) {
            console.log(action);
            notification.open({
                message: 'Đăng nhập không thành công',
                description:
                    'Hãy kiểm tra lại thông tin đăng nhập.',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
                style: {
                    paddingTop: 40
                }
            });
            state.message = action.payload.message
        },
        checkAbleToLogin(state, action: PayloadAction<string>) {
            state.statusCode = action.payload;
        }
        ,
        getUserInfoRequest(state, action: PayloadAction<GetUserInfoRequest>) {
            state.tokenLogin = action.payload.accessToken
            state.loading = true;
        },
        getUserInfoSuccess(state, action: PayloadAction<{ user: IUser, token: string }>) {
            Utils.setLocalStorage('userName', action.payload.user.name);
            Utils.setLocalStorage('userMail', action.payload.user.email);
            state.loading = false;
            state.isSuccess = true;
            state.user = action.payload.user;
            console.log('---get user info success---');


        },
        getUserInfoFail(state, action: any) {
            // state.user = action.payload
            console.log(action);
            notification.open({
                message: 'Lấy thông tin thành viên không thành công',
                description:
                    'Hãy kiểm tra lại thông tin đăng nhập.',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
                style: {
                    paddingTop: 40
                }
            });
            state.message = action.payload.message
        },


        checkEmailRequest: (state, action: PayloadAction<string>) => {
            state.isExistEmail = true;
            state.loading = true;
        },
        checkEmailSuccess: (state, action: PayloadAction<CheckEmailResponse>) => {
            console.log(action.payload);
            state.isExistEmail = action.payload.exist;
            if (action.payload.exist) {
                notification.open({
                    message: 'Email đã tồn tại',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    style: {
                        marginTop: 40
                    }
                });
            }
        },
        checkEmailFailed(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        checkActiveAccountRequest: (state, action: PayloadAction<ActiveAccountRequest>) => {
            state.loading = true;
        },
        checkActiveAccountSuccess: (state, action: PayloadAction<any>) => {
            console.log(action.payload);
            if (action.payload.statusCode === "OK") {
                notification.open({
                    message: action.payload.data,
                    description: 'Tài khoản đã có thể đăng nhập',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    style: {
                        // marginTop: 20
                    }
                });
            }
            if (action.payload.statusCode === "AccountActivated") {
                notification.open({
                    message: action.payload.data,
                    description: 'Vui lòng không xác nhận lại',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    style: {
                        // marginTop: 20
                    }
                });
            }
            if (action.payload.statusCode === "UserNotFound") {
                notification.open({
                    message: action.payload.data,
                    description: 'Vui lòng đăng ký / đăng nhập lại với tài khoản khác đã xác nhận',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    style: {
                        // marginTop: 20
                    }
                });
            }

        },
        checkActiveAccountFailed(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        forgotRequest(state, action: PayloadAction<string>) {
            state.loading = true
        },
        sendMailSuccess(state, action: PayloadAction<{ message: WritableDraft<MessageLogin> | undefined }>) {
            state.message = action.payload.message
            state.loading = false
            state.isSuccess = true;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },
        message(state, action: PayloadAction<MessageLogin>) {
            state.message = action.payload;
            state.loading = false
        },
        messageForgot(state, action: PayloadAction<MessageForgot>) {
            state.messageForgot = action.payload;
            state.loading = false
        },
        clearMessageResquest(state) {
            state.loading = true
        },
        clearMessage(state) {
            state.messageForgot = undefined;
            state.message = undefined;
            state.loading = false
        },
        setStatusCode(state, action: PayloadAction<string>) {
            state.statusCode = action.payload;
        },
        clearAllRequest(state) {
            state.loading = true;
            state.statusCode = undefined;
            state.user = undefined;
        },

        registerRequest(state, action: PayloadAction<RegisterRequest>) {
            state.loading = true;
            state.registerSuccess = false;
            console.log('Da chui vao voi action: ', action);
        },

        registerSuccess(state, action: PayloadAction<any>) {
            console.log(action);

            notification.open({
                message: 'Đăng ký tài khoản thành công',
                // description:
                //     action.payload.response.message,
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });

            // state.user = action.payload.user
            state.isSuccess = true;
            state.registerSuccess = true;
        },

        registerFail(state, action: PayloadAction<any>) {
            console.log(action);

            notification.open({
                message: 'Đăng ký không thành công',
                // description:
                //     action.payload.response.message,
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
            state.loading = false
            state.registerSuccess = false;
        },
    }
})

const login$: RootEpic = (action$) => action$.pipe(
    filter(loginRequest.match),
    switchMap((re) => {
        // IdentityApi.login(re.payload) ?
        console.log(re);
        const body: LoginRequest = {
            "email": re.payload.email,
            "password": re.payload.password,
            "remember": re.payload.remember,
            "additionalProp1": {},
        };

        return IdentityApi.login(body).pipe(
            mergeMap((res: any) => {
                console.log(res);
                console.log(res.data.accessToken);
                const token = res.data.accessToken
                return [
                    loginSlice.actions.loginSuccess({ token: token }),
                    loginSlice.actions.setLoading(false),
                    loginSlice.actions.setStatusCode(res.statusCode)
                ];
            }),
            catchError(err =>
                [loginSlice.actions.loginFail(err)]
            )
        )
    })
)

const forgot$: RootEpic = (action$) => action$.pipe(
    filter(forgotRequest.match),
    switchMap((re) => {
        return IdentityApi.forgotPassword(re.payload).pipe(
            map((res: any) => {
                return loginSlice.actions.messageForgot({ Message: "success" });
            }), catchError(err => [loginSlice.actions.messageForgot(err.response)])
        )
    })
)

const clearMessage$: RootEpic = (action$) => action$.pipe(
    filter(clearMessageResquest.match),
    map(() => { return loginSlice.actions.clearMessage() })
)

const logOut$: RootEpic = (action$) => action$.pipe(
    filter(clearAllRequest.match),
    mergeMap(() => {
        return [
            loginSlice.actions.clearAllRequest(),
            loginSlice.actions.setLoading(false)
        ]
    })
)

const register$: RootEpic = (action$) => action$.pipe(
    filter(registerRequest.match),
    switchMap((re) => {
        console.log(re.payload);
        const body: RegisterRequest = {
            "email": re.payload.email,
            "password": re.payload.password,
            "confirmPassword": re.payload.confirmPassword,
            "name": re.payload.name,
            "phone": re.payload.phone,
            "address": re.payload.address,
            "type": re.payload.type,
            "addressId": re.payload.addressId,
            "facilityId": re.payload.facilityId,
            "positionId": re.payload.positionId,
            "additionalProp1": {}
        };
        return IdentityApi.register(body).pipe(
            mergeMap((res: any) => {
                return [
                    loginSlice.actions.setLoading(false),
                    loginSlice.actions.setStatusCode(res.statusCode),
                    loginSlice.actions.registerSuccess(res)
                ];
            }),
            catchError(err =>
                [

                    loginSlice.actions.setStatusCode('UniqueEmail'),
                    loginSlice.actions.registerFail(err)
                ]
            )
        )
    })
)


const getUserInfo$: RootEpic = (action$) => action$.pipe(
    filter(getUserInfoRequest.match),
    switchMap((re) => {
        console.log(re);
        const body: GetUserInfoRequest = {
            "accessToken": re.payload.accessToken,
            "additionalProp1": {}
        };

        return IdentityApi.getUserInfo(body).pipe(
            mergeMap((res: any) => {
                console.log(res);
                const token = res.data.accessToken;

                const user: IUser = {
                    email: res.data.email,
                    name: res.data.name,
                    address: res.data.address,
                    facilityId: res.data.facilityId,
                    positionId: res.data.positionId,
                };
                console.log(user);
                return [
                    loginSlice.actions.getUserInfoSuccess({ user, token: token }),
                ];
            }),
            catchError(err =>
                [loginSlice.actions.getUserInfoFail(err)]
            )
        )
    })
)
const checkEmail$: RootEpic = (action$) => action$.pipe(
    filter(checkEmailRequest.match),
    switchMap((re) => {
        console.log(re);
        return IdentityApi.checkEmail(re.payload).pipe(
            mergeMap((res: any) => {
                console.log(res);
                return [
                    loginSlice.actions.checkEmailSuccess(res.data),
                ];
            }),
            catchError(err =>
                [loginSlice.actions.checkEmailFailed(err)]
            )
        )
    })
)
const checkActiveAccount$: RootEpic = (action$) => action$.pipe(
    filter(checkActiveAccountRequest.match),
    switchMap((re) => {
        console.log(re);
        return IdentityApi.checkActiveAccount(re.payload).pipe(
            mergeMap((res: any) => {
                console.log(res);
                return [

                    loginSlice.actions.checkActiveAccountSuccess(res),
                ];
            }),
            catchError(err =>
                [loginSlice.actions.checkActiveAccountFailed(err)]
            )
        )
    })
)

export const LoginEpics = [
    login$,
    forgot$,
    checkEmail$,
    checkActiveAccount$,
    clearMessage$,
    logOut$,
    register$,
    getUserInfo$

]
export const {
    // getDepartmentRequest,
    getUserInfoRequest,
    loginRequest,
    checkEmailRequest,
    forgotRequest,
    clearMessageResquest,
    clearAllRequest,
    registerRequest,
    checkAbleToLogin,
    checkActiveAccountRequest
} = loginSlice.actions
export const loginReducer = loginSlice.reducer