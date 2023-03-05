/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-debugger */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { catchError, filter, mergeMap, switchMap } from "rxjs/operators";
import CriteriaAPI from "../../api/criteria/criteria.api";
// import FacilitiesAPI from "../../api/facilities/facilities.api";
import FacilitiesAPI from "../../api/facilities/facilities.api";

// import PositionsAPI from "../../api/positions/positions.api";
import PositionsAPI from "../../api/positions/positions.api";
import { RootEpic } from "../../common/define-type";
import { ICriteria } from "../../common/u-innovate/define-criteria";
import { IFacilities, IFacilitiesList } from "../../common/u-innovate/define-facilities";
import { IPosition } from "../../common/u-innovate/define-position";
import { IAddresses } from "../../common/u-innovate/define-addresses";
import AddressesAPI from "../../api/addresses/addresses.api";


interface UInnovateState {
    loading: boolean;
    criteriaLst: ICriteria[];
    positionsLst: IPosition[];
    facilitiesLst: IFacilities[];
    facilitiesLstByDescription: IFacilitiesList | null,
    addressesLst: IAddresses[];
    positonUniversityLst: IPosition[];
    positonLocalLst: IPosition[];
}

const initState: UInnovateState = {
    loading: false,
    criteriaLst: [],
    positionsLst: [],
    facilitiesLst: [],
    facilitiesLstByDescription: null,
    addressesLst: [],
    positonUniversityLst: [],
    positonLocalLst: [],
}

const uInnovateSlice = createSlice({
    name: 'uinnovate',
    initialState: initState,
    reducers: {
        getCriteriaLstRequest(state) {
            state.loading = true;
            // console.log("da chui vao",state.loading)
        },
        getCriteriaLstSuccess(state, action: PayloadAction<ICriteria[]>) {
            state.criteriaLst = action.payload
            state.loading = false
        },
        getCriteriaLstFail(state, action: any) {
            state.loading = false
        },

        // Get all question
        getAllQuestionsByCriteriaIdRequest(state, action: PayloadAction<string>) {
            state.loading = true
        },
        getAllQuestionsByCriteriaSuccess(state, action: PayloadAction<any>) {
            state.loading = true
        },
        getAllQuestionsByCriteriaIdFail(state, action: PayloadAction<any>) {
            state.loading = true
        },

        // Lấy ra hết vị trí của user
        getAllPositionsRequest(state) {
            state.loading = true
        },

        getAllPositionsSuccess(state, action: PayloadAction<any>) {
            state.positionsLst = action.payload
            for (let i = 0; i < action.payload.length; i++) {
                if (action.payload[i].type === 'UINNOVATE')
                    state.positonUniversityLst = action.payload[i].positions;
                else if (action.payload[i].type === 'PINNOVATE')
                    state.positonLocalLst = action.payload[i].positions;
            }
            state.loading = false
        },

        getAllPositionsFail(state, action: any) {
            state.loading = false
        },

        getAllAddressesRequest(state) {
            state.loading = true
        },

        getAllAddressesSuccess(state, action: PayloadAction<IAddresses[]>) {
            state.addressesLst = action.payload
            state.loading = false
        },

        getAllAddressesFail(state, action: any) {
            state.loading = false
        },
        // Lấy ra hết vai trò của user
        getAllFacilitiesRequest(state) {
            state.loading = true
        },

        getAllFacilitiesSuccess(state, action: PayloadAction<IFacilities[]>) {
            state.facilitiesLst = action.payload
            state.loading = false
        },

        getAllFacilitiesFail(state, action: any) {
            state.loading = false
        },

        // Lấy ra hết vai trò của user
        getAllFacilitiesByDescriptionRequest(state) {
            state.loading = true
        },

        getAllFacilitiesByDescriptionSuccess(state, action: PayloadAction<IFacilitiesList>) {
            state.loading = false
            state.facilitiesLstByDescription = action.payload;
        },

        getAllFacilitiesByDescriptionFail(state, action: any) {
            state.loading = false
        },
    }
})

const getAllCriteria$: RootEpic = (action$) => action$.pipe(
    filter(getCriteriaLstRequest.match),
    switchMap(() => {
        // IdentityApi.login(re.payload) ?

        return CriteriaAPI.getAllCriteria().pipe(
            mergeMap((res: any) => {
                console.log(res);
                return [uInnovateSlice.actions.getCriteriaLstSuccess(res.data),];
            }),
            catchError(err => [uInnovateSlice.actions.getCriteriaLstFail(err)])
        )
    })
)
const getAllPosition$: RootEpic = (action$) => action$.pipe(
    filter(getAllPositionsRequest.match),
    switchMap(() => {
        return PositionsAPI.getAllPositions().pipe(
            mergeMap((res: any) => {
                console.log(res);
                return [uInnovateSlice.actions.getAllPositionsSuccess(res.data),];
            }),
            catchError(err => [uInnovateSlice.actions.getAllPositionsFail(err)])
        )
    })
)
const getAllAddresses$: RootEpic = (action$) => action$.pipe(
    filter(getAllAddressesRequest.match),
    switchMap(() => {
        return AddressesAPI.getAllAddresses().pipe(
            mergeMap((res: any) => {
                console.log(res);
                return [uInnovateSlice.actions.getAllAddressesSuccess(res.data),];
            }),
            catchError(err => [uInnovateSlice.actions.getAllAddressesFail(err)])
        )
    })
)
const getAllFacilities$: RootEpic = (action$) => action$.pipe(
    filter(getAllFacilitiesRequest.match),
    switchMap(() => {
        return FacilitiesAPI.getAllFacilities().pipe(
            mergeMap((res: any) => {
                console.log(res);
                return [uInnovateSlice.actions.getAllFacilitiesSuccess(res.data),];
            }),
            catchError(err => [uInnovateSlice.actions.getAllFacilitiesFail(err)])
        )
    })
)
const getAllFacilitiesByDescription$: RootEpic = (action$) => action$.pipe(
    filter(getAllFacilitiesByDescriptionRequest.match),
    switchMap(() => {
        return FacilitiesAPI.getAllFacilitiesByDescription().pipe(
            mergeMap((res: any) => {
                console.log(res);
                return [uInnovateSlice.actions.getAllFacilitiesByDescriptionSuccess(res.data),];
            }),
            catchError(err => [uInnovateSlice.actions.getAllFacilitiesByDescriptionFail(err)])
        )
    })
)
export const UInnovateEpics = [
    getAllCriteria$,
    getAllPosition$,
    getAllFacilities$,
    getAllFacilitiesByDescription$,
    getAllAddresses$,
]
export const {
    getAllPositionsRequest,
    getCriteriaLstRequest,
    getAllQuestionsByCriteriaIdRequest,
    getAllFacilitiesRequest,
    getAllFacilitiesByDescriptionRequest,
    getAllAddressesRequest,

} = uInnovateSlice.actions
export const uInnovateReducer = uInnovateSlice.reducer