import {BaseApi} from './BaseApi';
import {signInData} from '../types/types';
import {AxiosResponse} from 'axios';

class AuthApi extends BaseApi {

    public logIn(logInData: signInData): Promise<AxiosResponse> {
        let taskFormData = new FormData();
        taskFormData.append('username', logInData.login)
        taskFormData.append('password', logInData.password)

        return this.post('login', taskFormData);
    }



}

export default new AuthApi();
