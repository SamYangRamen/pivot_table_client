import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface dto<T> {
    dto: T;
}


export interface CellInfoDTO {
    sheetId?: number;
    isPivot: boolean;
    row: number;
    col: number;
    data?: string;
    dataType?: string;
}

export interface CellIdxDTO {
    row: number;
    col: number;
}

export interface CellDataDTO {
    isPivot: boolean;
    data: string;
    dataType: string;
}

class CellRepository {
    public constructor() {
        axios.defaults.baseURL = 'http://localhost:4000';
    }

    public insertCellData(cellInfo: CellInfoDTO): Promise<number> {
        return axios.post('POST/cell', { dto: cellInfo }).then(response => {
            return response.data;
        });
    }

    /*
    public getCellInfoList(sheetId: number): Promise<Map<string, CellDataDTO>> {
        return axios.get(`GET/cellInfo?sheetId=${sheetId}`).then(response => {
            return response.data;
        }).catch(() => {
            return null;
        });
    }
    */

    async getCellInfoList(sheetId: number): Promise<Array<CellInfoDTO>> {
        return await axios.get(`GET/cellInfo?sheetId=${sheetId}`).then(response => {
            return response.data;
        }).catch(() => {
            return null;
        });
    }
}

export default CellRepository;