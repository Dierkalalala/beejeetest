import {BaseApi} from './BaseApi';
import {Task, TaskCreationDTO, TaskEditing, TasksDTO, defaultDTO} from '../types/types';
import {AxiosResponse} from 'axios';

class TaskApi extends BaseApi {

    public getTasks(additionalParams: string = ''): Promise<AxiosResponse<defaultDTO<TasksDTO>>> {
        return this.get<defaultDTO<TasksDTO>>('', additionalParams);
    }

    public createTask(taskCreationData: TaskCreationDTO) {
        let taskFormData = new FormData();
        taskFormData.append('username', taskCreationData.username)
        taskFormData.append('email', taskCreationData.email)
        taskFormData.append('text', taskCreationData.text)
        return this.post<FormData, defaultDTO<Task>>('create', taskFormData);
    }

    public taskEditing(id: number, taskEditingData: TaskEditing): Promise<AxiosResponse> {
        let taskFormData = new FormData();
        taskFormData.append('token', taskEditingData.token)
        if (taskEditingData.status !== undefined) {
            taskFormData.append('status', String(taskEditingData.status))
        }
        if (taskEditingData.text) {
            taskFormData.append('text', taskEditingData.text)
        }
        return this.post<FormData, defaultDTO<unknown>>(`edit/${id}`, taskFormData);
    }

}

export default new TaskApi();
