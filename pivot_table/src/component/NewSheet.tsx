import React, { useState, useEffect } from 'react';
import { Route, Link, BrowserRouter, withRouter } from 'react-router-dom';
import ValueStore from 'src/store/ValueStore'
import useStore from 'src/store/useStore';
import RootStore from 'src/store/RootStore';
import EditSheet from 'src/component/EditSheet';
import { render } from '@testing-library/react';

/* 새로운 Sheet를 생성하는 코드 */
const NewSheet: React.FC = () => {
    const { valueStore, repositoryStore } = useStore();
    const repo = repositoryStore.getSheetRepository();

    const [tempSheetInfo, setTempSheetInfo] = useState({
        sheetName: '',
        maxRow: 0,
        maxCol: 0
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let nextSheetInfo;
        if (e.target.name == 'sheetName') {
            nextSheetInfo = {
                ...tempSheetInfo,
                [e.target.name]: e.target.value
            };
        } else {
            nextSheetInfo = {
                ...tempSheetInfo,
                [e.target.name]: parseInt(e.target.value)
            }
        };
        setTempSheetInfo(nextSheetInfo);
    }

    const makeSheet = () => {
        valueStore.setSheetName(tempSheetInfo.sheetName);
        valueStore.setSheetRange({ row: tempSheetInfo.maxRow, col: tempSheetInfo.maxCol });

        repo.initSheetData({
            sheetName: tempSheetInfo.sheetName,
            maxRow: tempSheetInfo.maxRow,
            maxCol: tempSheetInfo.maxCol
        }).then(response => {
            valueStore.setSheetId(response);
        });
    }

    return (
        <div className="App">
            시트명 :
            <input type="text" name="sheetName" placeholder="sheetName" value={tempSheetInfo.sheetName} onChange={onChange} />
            <br />
            row :
            <input type="text" name="maxRow" placeholder="rowSize" value={tempSheetInfo.maxRow} onChange={onChange} />
            col :
            <input type="text" name="maxCol" placeholder="colSize" value={tempSheetInfo.maxCol} onChange={onChange} />
            <Link to="/EditSheet">
                <input type="button" name="tempSheetRange" value="시트 생성" onClick={makeSheet} />
            </Link>
            <Link to="/">
                <button>뒤로가기</button>
            </Link>
            <hr />
            <Route path="/EditSheet" component={EditSheet} />
        </div>
    );
}

export default NewSheet;
