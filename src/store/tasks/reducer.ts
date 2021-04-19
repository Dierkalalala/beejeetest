import {createReducer} from 'typesafe-actions';
import {
    SET_TASKS,
    EDIT_TASK,
    SET_TASK,
    PENDING_TASKS,
    LOGIN,
} from './actions';

import {IAction} from '../types';
import {ITasksStore} from "./types";
import {Task, TaskEditingWithId} from "../../types/types";

const defaultState: ITasksStore = {
    status: 'ok',
    item: {
        tasks: [],
        total_task_count: 0
    },
    jwt: ''
};
const tasksReducer = createReducer(defaultState)
    .handleAction(SET_TASKS, (state: ITasksStore, action: IAction<ITasksStore>) => ({
        ...state,
        ...action.payload,
        status: 'ok'
    }))
    .handleAction(SET_TASK, (state: ITasksStore, action: IAction<Task>) => {
        if (action.payload) {
            if (state.item.tasks.length === 0) {
                state.item.tasks = [action.payload];
            } else {
                if (state.item.tasks.length >= 3) {
                    state.item.tasks.pop();
                }
                state.item.tasks.unshift(action.payload)
            }
            state.item.total_task_count++;
        }
        return {
            ...state,
            status: 'ok'
        };
    })
    .handleAction(LOGIN, (state: ITasksStore, action: IAction<{ jwt: string }>) => ({
        ...state,
        ...action.payload,
        status: 'ok'
    }))
    .handleAction(EDIT_TASK, (state: ITasksStore, action: IAction<TaskEditingWithId>) => {
        if (action.payload) {
            let indexOfEditedTask = state.item.tasks.findIndex(task => {
                return task.id === action.payload?.id
            })

            if (action.payload.text) {
                state.item.tasks[indexOfEditedTask].text = action.payload.text
            }
            if (action.payload.status !== undefined) {
                state.item.tasks[indexOfEditedTask].status = action.payload.status
            }
        }

        return {
            ...state,
            status: 'ok'
        }
    })

export default tasksReducer
