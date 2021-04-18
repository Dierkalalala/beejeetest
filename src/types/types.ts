export type defaultDTO<T = unknown> = {
    status: 'ok' | 'error';
    message: T
}



export type Task = {
    "id": number,
    "username": string,
    "email": string,
    "text": string,
    "status": 0 | 1 | 10 | 11,
}

export type TasksDTO = {
    tasks: Task[];
    total_task_count: number
}

export type TaskCreationDTO = {
    username: string,
    email: string,
    text: string
}

export type TaskEditing = {
    token: string,
    text?: string,
    status?: 0 | 1 | 10 | 11
}

export type signInData = {
    login: string,
    password: string
}

export type TaskEditingWithId = {
    id: number,
    text?: string,
    status?: 0 | 1 | 10 | 11
}

