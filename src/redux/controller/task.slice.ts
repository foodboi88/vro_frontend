import {  Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import TasksApi from "../../api/tasks/tasks.api";
import { ITask } from "../../common/define-task";
import { RootEpic } from "../../common/define-type";
import { catchError, filter, mergeMap, switchMap } from "rxjs/operators";
import { OperatorFunction } from "rxjs";
interface TaskState {
    message: string,
    loading: boolean,
    lstTasks: ITask[] | null,

}
const initialStateBootstrap: TaskState = {
    message: '',
    loading: false,
    lstTasks: null,

};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialStateBootstrap,
    reducers: {
        // Get task Request
        getTasksRequest: (state: { loading: boolean; }, action: PayloadAction<void>) => {
            state.loading = true;
        },
        getTasksSuccess: (state, action: PayloadAction<ITask[] | null>) => {
            console.log(action.payload);
            state.lstTasks = action.payload;
        },
        getTasksFailed(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },


        // Create Tasks Request
        createTasksRequest: (state, action: PayloadAction<any>) => {
            state.loading = true;
        },
        createTasksSuccess: (state, action: PayloadAction<ITask[] | null>) => {
            console.log(action.payload);
        },
        createTasksFailed(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },


    }
})

const getTasks$: RootEpic = (action$: { pipe: (arg0: OperatorFunction<Action<unknown>, { payload: undefined; type: string; }>, arg1: OperatorFunction<unknown, { payload: ITask[] | null; type: string; } | { payload: boolean; type: string; }>) => any; }) =>
    action$.pipe(filter(getTasksRequest.match),
        switchMap(() => {
            return TasksApi.getTasks().pipe(
                mergeMap((res: any) => {
                    console.log(res);
                    return [tasksSlice.actions.getTasksSuccess(res.data.items)];
                }),
                catchError(err => {
                    console.log(err)
                    return [tasksSlice.actions.getTasksFailed(false)]
                }),
            );
        }),
    );


const createTasks$: RootEpic = (action$: { pipe: (arg0: OperatorFunction<Action<unknown>, { payload: any; type: string; }>, arg1: OperatorFunction<unknown, { payload: boolean; type: string; } | { payload: undefined; type: string; }>) => any; }) =>
    action$.pipe(
        filter(createTasksRequest.match),
        switchMap((re: any) => {
            console.log(re);
            return TasksApi.createTasks(re.payload).pipe(
                mergeMap((res: any) => {
                    console.log('Create')
                    console.log(res);
                    return [tasksSlice.actions.getTasksRequest()];
                }),
                catchError(err => {
                    console.log(err)
                    return [tasksSlice.actions.createTasksFailed(false)]
                }),
            );
        }),
    );

export const TaskEpics = [createTasks$, getTasks$];
export const {
    getTasksRequest,
    createTasksRequest,
} = tasksSlice.actions;
export const calendarReducer = tasksSlice.reducer;