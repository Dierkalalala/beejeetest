import {BASE_API_URL} from '../misc/constants';
import axios, {AxiosResponse} from 'axios';
import sanitizeHtml from 'sanitize-html';

/*axios.defaults.withCredentials = true;*/

export class BaseApi {
    public get<T>(url: string, additionalParams: string = ''): Promise<AxiosResponse<T>> {
        return axios.get<T>(this._url(url, additionalParams));
    }

    public post<D, T>(url: string, data?: D): Promise<AxiosResponse<T>> {
        let sanitezedFormData = new FormData();
        // @ts-ignore
        for (let pair of data.entries())
        {
            sanitezedFormData.append(pair[0], sanitizeHtml(pair[1]))
        }

        return axios.post<T>(this._url(url), sanitezedFormData);
    }

    public put<D, T>(url: string, data?: D): Promise<AxiosResponse<T>> {
        return axios.put<T>(this._url(url), data);
    }

    public delete<T>(url: string): Promise<AxiosResponse<T>> {
        return axios.delete<T>(this._url(url));
    }

    private _url(url: string = '', additionalParams: string = ''): string {
        return `${BASE_API_URL}/${url}/?developer=dierkholmasasa${additionalParams}`;
    }
}
