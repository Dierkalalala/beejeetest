import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {action} from 'typesafe-actions';
import {setCookie, getCookie} from "../../helper/cookie";

import TaskApi from "../../api/TaskApi";
import {TaskCreationDTO, Task, TasksDTO, signInData, TaskEditingWithId, TaskEditing} from "../../types/types";
import {ITasksStore} from "./types";
import AuthApi from "../../api/AuthApi";


export const SET_TASKS = 'SET_TASKS';
export const SET_TASK = 'SET_TASK'
export const EDIT_TASK = 'EDIT_TASK';
export const PENDING_TASKS = 'PENDING_TASKS';
export const LOGIN = 'LOGIN';

export const setTasks = (tasks: TasksDTO) => action(SET_TASKS, {item: tasks});
export const setTask = (task: Task) => action(SET_TASK, task);
export const editTask = (editedTask: TaskEditingWithId) => action(EDIT_TASK, editedTask)
export const pendingTasks = () => action(PENDING_TASKS);
export const login = (token: string) => action(LOGIN, {jwt: token});

type Dispatch = ThunkDispatch<ITasksStore, void, AnyAction>;

export class TasksEntityActions {
    static getTasks = (additionalParams: string = '') => async (dispatch: Dispatch) => {
        dispatch(pendingTasks());
        try {
            let tasks = await TaskApi.getTasks(additionalParams);
            dispatch(setTasks(tasks.data.message))
        } catch (e) {
            console.log(e);
        }
    }
    static createTask = (createTaskData: TaskCreationDTO) => async (dispatch: Dispatch) => {
        try {
            let newTask = await TaskApi.createTask(createTaskData);
            if (newTask.data.status === 'ok') {
                dispatch(setTask(newTask.data.message))
            } else {
                alert('Введите корректные данные');
            }
        } catch (e) {
            console.log(e);
        }
    }
    static logIn = (logInData: signInData) => async (dispatch: Dispatch) => {
        try {
            let logIn = await AuthApi.logIn(logInData);
            if (logIn.data.status === 'ok') {
                let date = new Date(Date.now() + 86400e3);
                let expirationDate = date.toUTCString();
                setCookie('jwt', logIn.data.message.token, {expires: expirationDate});
                dispatch(login(logIn.data.message.token));
            } else {
                alert('Кривые данные')
            }
        } catch (e) {
            console.log(e);
        }
    }
    static checkAuth = () => (dispatch: Dispatch) => {
        let token = getCookie('jwt');
        if (token) {
            dispatch(login(token))
        }
    }

    static editTask = (id : number, editData: TaskEditing) => async (dispatch: Dispatch) => {
        try {
            let editedData = await TaskApi.taskEditing(id, editData);
            console.log(editData);
            if (editedData.data.status === 'ok') {
                dispatch(editTask({id: id, status: editData.status, text: editData.text}))
            }
        } catch (e) {
            console.log(e);
        }
    }
}

