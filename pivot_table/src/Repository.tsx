import axios, { AxiosRequestConfig } from 'axios';

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

class Repository {
    public constructor(config?: AxiosRequestConfig) {
        axios.defaults.baseURL = 'http://localhost:4000';
    }

    public testMethod(): Promise<number> {
        return axios.post('/Test', 123).then(response => {
            return response.data;
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

export default Repository;