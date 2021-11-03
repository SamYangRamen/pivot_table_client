import './Home.css';
import React, { useState, useEffect } from 'react';
import { Route, Link, BrowserRouter, withRouter } from 'react-router-dom';
import Home from './Home';
import ValueStore from './ValueStore'
import useStore from './useStore';
import RootStore from './RootStore';
import EditSheet from './EditSheet';
import { render } from '@testing-library/react';

const NewSheet: React.FC = () => {
    const { valueStore } = useStore();

    const [tempSheetRange, setTempSheetRange] = useState({
        row: 0,
        col: 0
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const nextSheetRange = {
            ...tempSheetRange,
            [e.target.name]: parseInt(e.target.value)
        };
        setTempSheetRange(nextSheetRange);
    }

    const changeSheetRange = () => {
        valueStore.setSheetRange({ row: tempSheetRange.row, col: tempSheetRange.col });
        // alert(`${valueStore.getRowSize()}, ${valueStore.getColSize()}`);
    }

    return (
        <div className="App">
            <input type="text" name="row" placeholder="rowSize" value={tempSheetRange.row} onChange={onChange} />
            <input type="text" name="col" placeholder="colSize" value={tempSheetRange.col} onChange={onChange} />
            <Link to="/NewSheet/EditSheet">
                <input type="button" name="tempSheetRange" value="시트 생성" onClick={changeSheetRange} />
            </Link>
            <Link to="/">
                <button>뒤로가기</button>
            </Link>
            <hr />
            <Route path="/NewSheet/EditSheet" component={EditSheet} />
        </div>
    );
}

export default NewSheet;
