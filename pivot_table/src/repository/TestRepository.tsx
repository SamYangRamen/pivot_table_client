import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface dto<T> {
    dto: T;
}

export interface TestNumData {
    data: number;
}

export interface TestStringData {
    data: string;
}

class TestRepository {
    public constructor() {
        axios.defaults.baseURL = 'http://localhost:4000';
    }

    public getTestMethod(num: number): Promise<TestNumData> {
        return axios.get(`/GET/test?num=${num}`).then(response => {
            return response.data;
        }).catch(() => {
            return 5678;
        });
    }

    public postTestMethod(data: string): Promise<TestStringData> {
        return axios.post(`/POST/test`, { dto: data }).then(response => {
            return response.data;
        }).catch(() => {
            return 5678;
        });
    }
}

export default TestRepository;