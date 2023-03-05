import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import MeetingsApi from "../../api/meetings/meetings.api";
import MemberApi from "../../api/member/member.api";
import TasksApi from "../../api/tasks/tasks.api";
import { IMeetingInvitationReq } from "../../common/define-mail-service";
import { IGetMeetingsReq, IMeetings, IMemberInMeetings, IMemberWithRole, IRole, ITask } from "../../common/define-meetings";
import { IMember } from "../../common/define-member";
import { GetAllMemberReq, GetAllMembersWithRoleReq, GetAllTaskReq, RootEpic } from "../../common/define-type";
// import openNotification, { NotificationType } from "../../common/notification/Notification";
// import { ISelectorMember } from "../../components/CMemberList";
import { catchError, filter, mergeMap, switchMap } from "rxjs/operators";

export enum FilterCriteria {
    Task = 'Task',
    Member = 'Member',
    None = 'None'
}
interface CalendarState {
    message: string,
    loading: boolean,
    lstTasks: ITask[] | null,
    lstMeetings: IMeetings[] | null,
    lstMeetingsByTask: IMeetings[] | null,
    lstMembers: IMemberInMeetings[] | null,
    meetingById: IMeetings | null,
    lstAllMemberWithRole: IMemberWithRole[] | null,
    lstRoles: IRole[] | null,
    calendarEvent: any,
    renderDateRange: Date[],
    // lstFilteredMembers: ISelectorMember[],
    lstFilteredTasks: ITask[] | null,
    selectedItemIdFiltering: string | null,
    selectedFilteringCriteria: FilterCriteria,
    calendarViewName: string | null,
    instantNewTaskId: string,
    successRes: any,
    failRes: any
}
const initialStateBootstrap: CalendarState = {
    message: '',
    loading: false,
    lstTasks: null,
    lstMeetings: [],
    lstMeetingsByTask: [],
    meetingById: null,
    lstMembers: [],
    lstAllMemberWithRole: [],
    lstRoles: [],
    calendarEvent: null,
    renderDateRange: (localStorage.getItem('renderStartTime'))? [new Date(JSON.parse(JSON.stringify(localStorage.getItem('renderStartTime')))),new Date(JSON.parse(JSON.stringify(localStorage.getItem('renderEndTime'))))] : [new Date(), new Date()], // luu lai render range tu lan reload trang truoc
    // lstFilteredMembers: [],
    lstFilteredTasks: [],
    selectedItemIdFiltering: null,
    selectedFilteringCriteria: FilterCriteria.None,
    calendarViewName: localStorage.getItem('calendarViewName')? localStorage.getItem('calendarViewName') : null , // Luu lai view dang xem tu lan reload trang truoc
    instantNewTaskId: '',
    successRes: null,
    failRes: null
};

const calendarSlice = createSlice({
    name: 'carlendar',
    initialState: initialStateBootstrap,
    reducers: {
        setCalendarViewName: (state, action: PayloadAction<string>) => {
            state.calendarViewName = action.payload;
            localStorage.setItem('calendarViewName',action.payload);
        },
        // Get task Request
        getTasksRequest: (state, action: PayloadAction<GetAllTaskReq>) => {
            state.loading = true;

        },
        getTasksSuccess: (state, action: PayloadAction<ITask[] | null>) => {
            state.lstTasks = action.payload;
            // console.log(state.lstTasks)
        },
        getTasksFailed(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        // Get task by name Request
        getTasksByNameRequest: (state, action: PayloadAction<String>) => {
            state.loading = true;
        },
        getTasksByNameSuccess: (state, action: PayloadAction<ITask[] | null>) => {
            state.lstTasks = action.payload;
        },
        getTasksByNameFailed(state, action: PayloadAction<any>) {
            state.loading = action.payload;
        },

        // Get Roles Request
        getRolesRequest: (state, action: PayloadAction<void>) => {
            state.loading = true;
        },
        getRolesSuccess: (state, action: PayloadAction<IRole[] | null>) => {
            state.lstRoles = action.payload;
        },
        getRolesFailed(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },

        // Get meetings request
        getMeetingsRequest: (state, action: PayloadAction<IGetMeetingsReq>) => {
            state.loading = true;
        },
        getMeetingsSuccess: (state, action: PayloadAction<IMeetings[] | null>) => {
            state.lstMeetings = action.payload;
            state.lstMeetingsByTask = action.payload;
        },
        getMeetingsFailed(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },

        // Get meetings by id request
        getMeetingsByIdRequest: (state, action: PayloadAction<String>) => {
            state.loading = true;
        },
        getMeetingsByIdSuccess: (state, action: PayloadAction<IMeetings | null>) => {
            state.meetingById = action.payload;
            if (state.meetingById)
                state.lstMeetings = [state.meetingById];
        },
        getMeetingsByIdFailed(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },

        // Get meetings request
        setMeetingsRequest: (state, action: PayloadAction<IMeetings[] | null>) => {
            state.lstMeetings = action.payload;
            state.lstMeetingsByTask = action.payload;
            // console.log(state.lstMeetings);
        },
        // // list selected Tasks
        // setLstFilteredTasks: (state, action: PayloadAction<ITask[] | null>) => {
        //     state.lstFilteredTasks = action.payload;
        // },
        // Get members request
        getMembersRequest: (state, action: PayloadAction<GetAllMemberReq>) => {
            state.loading = true;
        },
        getMembersSuccess: (state, action: PayloadAction<IMemberInMeetings[] | null>) => {
            state.lstMembers = action.payload;
        },
        getMembersFailed(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },

        // Get members with role request
        getMemberWithRoleRequest: (state, action: PayloadAction<GetAllMembersWithRoleReq>) => {
            state.loading = true;
        },
        getMemberWithRoleSuccess: (state, action: PayloadAction<IMemberWithRole[] | null>) => {
            state.lstAllMemberWithRole = action.payload;
        },
        getMemberWithRoleFailed(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },

        // Create Meetings Request
        createMeetingsRequest: (state, action: PayloadAction<any>) => {
            state.loading = true;
        },
        createMeetingsSuccess: (state, action: PayloadAction<IMeetings[] | null>) => {
            // openNotification(NotificationType.Info, 'topLeft', `Tạo cuộc họp thành công`, ``);
            state.successRes = action.payload
            console.log(state.successRes)

        },
        createMeetingsFailed(state, action: PayloadAction<any>) {
            // openNotification(NotificationType.Error, 'topLeft', `Cập nhật không thành công`, `${action.payload?.response?.message}`);
            state.failRes = action.payload
        },
        // Create Tasks Request
        createTasksRequest: (state, action: PayloadAction<any>) => {
            state.loading = true;
        },
        createTasksSuccess: (state, action: PayloadAction<ITask | null>) => {
            // openNotification(NotificationType.Info, 'topLeft', `Tạo công việc thành công`, ``);
            if (action.payload?.id) {
                state.instantNewTaskId = action.payload?.id
                console.log(state.instantNewTaskId)
            }
        },
        createTasksFailed(state, action: PayloadAction<any>) {
            // openNotification(NotificationType.Error, 'topLeft', `Tạo mới không thành công`, `${action.payload?.response?.message}`);
        },

        // Create Member Request
        createMemberRequest: (state, action: PayloadAction<any>) => {
            state.loading = true;
        },
        createMemberSuccess: (state, action: PayloadAction<IMember[] | null>) => {
            // openNotification(NotificationType.Info, 'topLeft', `Tạo thành viên thành công`, ``);

        },
        createMemberFailed(state, action: PayloadAction<any>) {
            // openNotification(NotificationType.Error, 'topLeft', `Tạo mới không thành công`, `${action.payload?.response?.message}`);
        },
        // Create Meetings Request
        updateMeetingsRequest: (state, action: PayloadAction<any>) => {
            state.loading = true;
        },
        updateMeetingsSuccess: (state, action: PayloadAction<any>) => {
            // openNotification(NotificationType.Info, 'topLeft', `Cập nhật cuộc họp thành công`, ``);
            state.successRes = action.payload
            console.log(state.successRes)
        },
        updateMeetingsFailed(state, action: PayloadAction<any>) {
            // state.loading = action.payload;
            // openNotification(NotificationType.Error, 'topLeft', `Cập nhật không thành công`, `${action.payload?.response?.message}`);
            state.failRes = action.payload
        },

        // delete Meetings Request
        deleteMeetingsRequest: (state, action: PayloadAction<any>) => {
            state.loading = true;
        },
        deleteMeetingsSuccess: (state, action: PayloadAction<any>) => {
            // openNotification(NotificationType.Info, 'topLeft', `Xóa cuộc họp thành công`, ``);
        },
        deleteMeetingsFailed(state, action: PayloadAction<any>) {
            // state.loading = action.payload;
            // openNotification(NotificationType.Error, 'topLeft', `Xóa không thành công`, `${action.payload?.response?.message}`);
        },

        // calendar event
        setCalendarEvent: (state, action: PayloadAction<any>) => {
            state.calendarEvent = action.payload;
        },

        // list selected Tasks
        setLstFilteredTasks: (state, action: PayloadAction<ITask[] | null>) => {
            state.lstFilteredTasks = action.payload;
        },

        // Date range
        setCalendarDateRange: (state, action: PayloadAction<Date[]>) => {
            state.renderDateRange = action.payload;
            localStorage.setItem('renderStartTime',JSON.stringify(action.payload[0]));
            localStorage.setItem('renderEndTime',JSON.stringify(action.payload[1]));
        },

        // Update list filter members
        // updateLstFilteredMember: (state, action: PayloadAction<ISelectorMember[]>) => {
        //     state.lstFilteredMembers = action.payload;
        // },

        // set selectted id filtering
        setSelectedItemIdFiltering: (state, action: PayloadAction<string | null>) => {
            state.selectedItemIdFiltering = action.payload;
        },

        // set selectted id filtering
        setSelectedFilteringCriteria: (state, action: PayloadAction<FilterCriteria>) => {
            state.selectedFilteringCriteria = action.payload;
        },

        // send meeting invitation request
        sendMeetingInvatationRequest: (state, action: PayloadAction<IMeetingInvitationReq[]>) => {
            state.loading = true;
        },
        sendMeetingInvatationSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false;
        },
        sendMeetingInvatationFailed(state, action: PayloadAction<any>) {
            state.loading = false;
        },
    }
})

const getTasks$: RootEpic = action$ =>
    action$.pipe(filter(getTasksRequest.match),
        switchMap((re) => {
            return MeetingsApi.getTasks(re.payload).pipe(
                mergeMap((res: any) => {
                    return [calendarSlice.actions.getTasksSuccess(res.data.items)];
                }),
                catchError(err => {
                    console.log(err)
                    return [calendarSlice.actions.getTasksFailed(false)]
                }),
            );
        }),
    );
const getTasksByName$: RootEpic = action$ =>
    action$.pipe(filter(getTasksByNameRequest.match),
        switchMap((re) => {
            return MeetingsApi.getTasksByName(re.payload).pipe(
                mergeMap((res: any) => {
                    // console.log(res);
                    return [calendarSlice.actions.getTasksByNameSuccess(res.data.items)];
                }),
                catchError(err => {
                    console.log(err)
                    return [calendarSlice.actions.getTasksByNameFailed(false)]
                }),
            );
        }),
    );

const getRoles$: RootEpic = action$ =>
    action$.pipe(filter(getRolesRequest.match),
        switchMap(() => {
            return MeetingsApi.getRoles().pipe(
                mergeMap((res: any) => {
                    return [calendarSlice.actions.getRolesSuccess(res.data.items)];
                }),
                catchError(err => {
                    console.error(err)
                    return [calendarSlice.actions.getRolesFailed(false)]
                }),
            );
        }),
    );

const getMeetings$: RootEpic = action$ =>
    action$.pipe(filter(getMeetingsRequest.match),
        switchMap((re: any) => {
            return MeetingsApi.getMeetings(re.payload).pipe(
                mergeMap((res: any) => {
                    // console.log(re.payload)
                    return [calendarSlice.actions.getMeetingsSuccess(res.data.items)];
                }),
                catchError(err => {
                    console.error(err)
                    return [calendarSlice.actions.getMeetingsFailed(false)]
                }),
            );
        }),
    );
const getMeetingsById$: RootEpic = action$ =>
    action$.pipe(filter(getMeetingsByIdRequest.match),
        switchMap((re: any) => {
            console.log(re);

            return MeetingsApi.getMeetingsById(re.payload).pipe(
                mergeMap((res: any) => {
                    console.log(res);
                    return [calendarSlice.actions.getMeetingsByIdSuccess(res.data)];
                }),
                catchError(err => {
                    console.error(err)
                    return [calendarSlice.actions.getMeetingsByIdFailed(false)]
                }),
            );
        }),
    );

const createMeetings$: RootEpic = action$ =>
    action$.pipe(filter(createMeetingsRequest.match),
        switchMap((re: any) => {
            return MeetingsApi.createMeetings(re.payload.createMeetingReq).pipe(
                mergeMap((res: any) => {
                    // MailServiceAPI.sendInvitations(re.payload.sendMeetingInvitations);
                    console.log(res);
                    return [
                        calendarSlice.actions.createMeetingsSuccess(res), calendarSlice.actions.getMeetingsRequest(re.payload.getMeetingsReq),
                        calendarSlice.actions.getMemberWithRoleRequest({ offset: 0, size: 200 }),
                    ];
                }),
                catchError(err => {
                    console.error(err)
                    return [calendarSlice.actions.createMeetingsFailed(err), calendarSlice.actions.getMeetingsRequest(re.payload.getMeetingsReq)]
                }),
            );
        }),
    );

const createMember$: RootEpic = action$ =>
    action$.pipe(filter(createMemberRequest.match),
        switchMap((re: any) => {
            console.log(re);
            return MemberApi.createMember(re.payload.createMemberReq).pipe(
                mergeMap((res: any) => {
                    console.log('Create')
                    console.log(res);
                    return [calendarSlice.actions.createMemberSuccess(res), calendarSlice.actions.getMembersRequest(re.payload.getMemberReq)];
                }),
                catchError(err => {
                    console.log(err)
                    return [calendarSlice.actions.createMemberFailed(err), calendarSlice.actions.getMembersRequest(re.payload.getMemberReq)];
                }),
            );
        }),
    );
const createTasks$: RootEpic = action$ =>
    action$.pipe(
        filter(createTasksRequest.match),
        switchMap((re) => {
            console.log(re);
            return TasksApi.createTasks(re.payload).pipe(
                mergeMap((res: any) => {
                    console.log('Create')
                    console.log(res);
                    return [calendarSlice.actions.createTasksSuccess(res.data), calendarSlice.actions.getTasksRequest({ size: 100, offset: 0 })];
                }),
                catchError(err => {
                    console.log(err)
                    return [calendarSlice.actions.createTasksFailed(err), calendarSlice.actions.getTasksRequest({ size: 100, offset: 0 })];

                }),
            );
        }),
    );
const updateMeetings$: RootEpic = action$ =>
    action$.pipe(filter(updateMeetingsRequest.match),
        switchMap((re: any) => {
            return MeetingsApi.updateMeetings(re.payload.meetingId, re.payload.createMeetingReq).pipe(
                mergeMap((res: any) => {
                    console.log(res);

                    return [calendarSlice.actions.updateMeetingsSuccess(res.data), calendarSlice.actions.getMeetingsRequest(re.payload.getMeetingsReq), calendarSlice.actions.getMemberWithRoleRequest({ offset: 0, size: 200 })];
                }),
                catchError(err => {
                    console.error(err);
                    return [calendarSlice.actions.updateMeetingsFailed(err), calendarSlice.actions.getMeetingsRequest(re.payload.getMeetingsReq)]
                }),
            );
        }),
    );

const deleteMeetings$: RootEpic = action$ =>
    action$.pipe(filter(deleteMeetingsRequest.match),
        switchMap((re: any) => {
            return MeetingsApi.deleteMeetings(re.payload.meetingId).pipe(
                mergeMap((res: any) => {
                    return [calendarSlice.actions.deleteMeetingsSuccess(res), calendarSlice.actions.getMeetingsRequest(re.payload.getMeetingsReq)];
                }),
                catchError(err => {
                    console.error(err);
                    return [calendarSlice.actions.deleteMeetingsFailed(err), calendarSlice.actions.getMeetingsRequest(re.payload.getMeetingsReq)]
                }),
            );
        }),
    );


const getMembers$: RootEpic = action$ =>
    action$.pipe(filter(getMembersRequest.match),
        switchMap(re => {
            return MeetingsApi.getMembers(re.payload).pipe(
                mergeMap((res: any) => {
                    return [calendarSlice.actions.getMembersSuccess(res.data.items)];
                }),
                catchError(err => {
                    console.log(err)
                    return [calendarSlice.actions.getMembersFailed(false)]
                }),
            );
        }),
    );

const getAllMembersWithRole$: RootEpic = action$ =>
    action$.pipe(filter(getMemberWithRoleRequest.match),
        switchMap(re => {
            return MeetingsApi.getAllMembersWithRole(re.payload).pipe(
                mergeMap((res: any) => {
                    return [calendarSlice.actions.getMemberWithRoleSuccess(res.data.items)];
                }),
                catchError(err => {
                    console.log(err)
                    return [calendarSlice.actions.getMemberWithRoleFailed(false)]
                }),
            );
        }),
    );

// const sendMeetingInvatationRequest$: RootEpic = action$ =>
//     action$.pipe(filter(sendMeetingInvatationRequest.match),
//         switchMap(re => {
//             return MailServiceAPI.sendInvitations(re.payload).pipe(
//                 mergeMap((res: any) => {
//                     return [calendarSlice.actions.sendMeetingInvatationSuccess(res.data.items)];
//                 }),
//                 catchError(err => {
//                     console.log(err)
//                     return [calendarSlice.actions.sendMeetingInvatationFailed(false)]
//                 }),
//             );
//         }),
//     );


export const CalendarEpics = [
    getMeetings$,
    getMeetingsById$,
    createMeetings$,
    getTasks$,
    getTasksByName$,
    getMembers$,
    getRoles$,
    createTasks$,
    createMember$,
    updateMeetings$,
    deleteMeetings$,
    getAllMembersWithRole$];

export const {
    getMeetingsRequest,
    setCalendarEvent,
    getTasksRequest,
    getTasksByNameRequest,
    getMeetingsByIdRequest,
    setMeetingsRequest,
    setCalendarDateRange,
    createMeetingsRequest,
    updateMeetingsRequest,
    createMemberRequest,
    createTasksRequest,
    deleteMeetingsRequest,
    getMembersRequest,
    getMemberWithRoleRequest,
    getRolesRequest,
    // updateLstFilteredMember,
    setLstFilteredTasks,
    setSelectedItemIdFiltering,
    setSelectedFilteringCriteria,
    sendMeetingInvatationRequest,
    setCalendarViewName
} = calendarSlice.actions;
export const calendarReducer = calendarSlice.reducer;