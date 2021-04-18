import {ITasksStore} from "./tasks/types";

export interface IAction<T = unknown> {
    type: string;
    payload?: T;
}
export interface IStoreState {
    tasks: ITasksStore
}
