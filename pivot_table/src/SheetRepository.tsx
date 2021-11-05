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
    sheetRange: SheetRangeDTO;
    cells: Array<CellDataDTO>;
}

export interface SheetRangeDTO {
    row: number;
    col: number;
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

    public getTestMethod(num: number): Promise<TestData> {
        return axios.get(`/GET/test?num=${num}`).then(response => {
            alert(response)
            return response.data;
        }).catch(() => {
            return 5678;
        });
    }

    public postTestMethod(num: number): Promise<TestData> {
        return axios.post(`/POST/test`, { dto: num }).then(response => {
            alert(response)
            return response.data;
        }).catch(() => {
            return 5678;
        });
    }

    public initSheetData(sheet: SheetRangeDTO): Promise<number> {
        return axios.post('POST/sheet', { dto: sheet }).then(response => {
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