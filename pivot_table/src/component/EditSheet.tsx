import React, { useState, useEffect, RefObject, useRef } from 'react';
import { Route, RouteComponentProps, withRouter } from 'react-router';
import useStore from 'src/store/useStore';
import ShowSheet from 'src/component/ShowSheet';
import { CellDataDTO, CellIdxDTO } from 'src/repository/SheetRepository';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

/* 불러오거나 새로 생성한 Sheet를 직접 편집하는 코드 */
const EditSheet: React.FC<RouteComponentProps> = ({ location, history }: RouteComponentProps) => {
    const { valueStore, repositoryStore } = useStore();
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (valueStore.getSheetId() == undefined || valueStore.getSheetId() == 0) {
            history.push("/"); // Sheet 정보를 선택하지 않았는데 EditSheet으로 접속한 경우 초기 화면으로 이동
        }

        const repo = repositoryStore.getCellRepository();
        repo.getCellInfoList(valueStore.getSheetId()).then(response => {
            valueStore.initCells(response);
            setIsDataLoaded(true);
            /*
            setTimeout(() => {
                console.log(response);

                setTimeout(() => {
                    console.log(valueStore.getCells());

                    setTimeout(() => {
                        setIsDataLoaded(true);
                    }, 2000);
                }, 2000);
            }, 2000);
            */


        }).catch(e => {
            alert("데이터를 정상적으로 가져오지 못했습니다!");
        })
    }, [])

    return (
        <div>
            현재 시트 정보 - [id:{valueStore.getSheetId()}] [name:{valueStore.getSheetName()}] [size:{valueStore.getRowSize()}*{valueStore.getColSize()}]
            {isDataLoaded && <ShowSheet row={valueStore.getRowSize()} col={valueStore.getColSize()} />}
        </div>
    );
}

export default EditSheet;