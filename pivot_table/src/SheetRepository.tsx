import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface dto<T> {
    dto: T;
}

export interface TestData {
    num: number;
}

export interface CellDataDTO {
    sheetId?: number;
    isPivot: boolean;
    rowKey: number;
    colKey: number;
    data: string;
    dataType: string;
}

export interface SheetDataDTO {
    sheetId: number;
    cells: Array<CellDataDTO>;
}

class SheetRepository {
    public constructor() {
        axios.defaults.baseURL = 'http://localhost:4000';
    }

    public post<B>(url: string, data: B, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        return axios.post(url, data, config);
    }

    /*
    public testMethod(num: number): Promise<number> {
        return this.post<dto<number>>('/Test', { dto: num }).then(response => {
            return response.data;
        }).catch(() => {
            return 0;
        });
    }
    */

    public testMethod(num: number): Promise<TestData> {
        return axios.get(`/test?num=${num}`).then(response => {
            alert(response)
            return response.data;
        }).catch(() => {
            return 5678;
        });
    }

    public initSheetData(sheet: SheetDataDTO): Promise<number> {
        return axios.post('HTTP POST /sheet', sheet).then(response => {
            return response.data;
        });
    }

    public getSheetData(sheetId: number): Promise<SheetDataDTO> {
        return axios.get(`HTTP GET /sheet?sheetId=${sheetId}`).then(response => {
            return response.data;
        })
    }
}

export default SheetRepository;