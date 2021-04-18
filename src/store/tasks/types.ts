import {TasksDTO} from "../../types/types";

export interface ITasksStore
{
    status: 'ok' | 'pending' | 'error',
    item: TasksDTO,
    jwt: string,
}
