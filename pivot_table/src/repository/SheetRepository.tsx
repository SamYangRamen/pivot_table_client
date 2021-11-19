import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface dto<T> {
    dto: T;
}

export interface CellDataDTO {
    isPivot: boolean;
    data: string;
    dataType: string;
}

export interface SheetDataDTO {
    sheetId: number;
    sheetRange: SheetRangeDTO;
    cells: Map<CellIdxDTO, CellDataDTO>;
}

export interface SheetRangeDTO {
    row: number;
    col: number;
}

export interface CellIdxDTO extends SheetRangeDTO {

}

export interface SheetInitDTO {
    sheetName: string;
    maxRow: number;
    maxCol: number;
}

export interface SheetInfoDTO {
    sheetId: number;
    sheetName: String;
    maxRow: number;
    maxCol: number;
}

class SheetRepository {
    public constructor() {
        axios.defaults.baseURL = 'http://localhost:4000';
    }

    public initSheetData(sheet: SheetInitDTO): Promise<number> {
        return axios.post('POST/sheet', { dto: sheet }).then(response => {
            return response.data;
        });
    }

    public getSheetInfoList(): Promise<Array<SheetInfoDTO>> {
        return axios.get(`GET/sheetInfo`).then(response => {
            return response.data;
        }).catch(() => {
            return null;
        });
    }

    public deleteSheetData(sheetId: number): Promise<number> {
        return axios.delete(`DELETE/sheet?sheetId=${sheetId}`).then(response => {
            return response.data;
        }).catch(() => {
            return null;
        });
    }

    public getSheetData(sheetId: number): Promise<SheetDataDTO> {
        return axios.get(`HTTP GET /sheet?sheetId=${sheetId}`).then(response => {
            return response.data;
        })
    }
}

export default SheetRepository;