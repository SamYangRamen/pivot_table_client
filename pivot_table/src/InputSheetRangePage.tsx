import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import Home from './Home';
import ValueStore from './ValueStore'
import useStore from './useStore';
import RootStore from './RootStore';

const InputSheetRangePage: React.FC = () => {
    const [store] = useState<RootStore>({ valueStore: new ValueStore });

    const { valueStore } = useStore();

    const [sheetRange, setSheetRange] = useState({
        row: 0,
        col: 0
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const nextSheetRange = {
            ...sheetRange,
            [e.target.name]: parseInt(e.target.value)
        };
        setSheetRange(nextSheetRange);
        if (e.target.name === "row") {
            valueStore.setRowSize(parseInt(e.target.value));
        } else if (e.target.name === "col") {
            valueStore.setColSize(parseInt(e.target.value));
        } else {

        }
        alert(valueStore.getRowSize().toString() + " " + valueStore.getColSize().toString())
    }

    /*
    useEffect(() => {
        valueStore.setSheetRange({ row: sheetRange.row, col: sheetRange.col });
    }, [sheetRange]);
    */
    return (
        <div className="App">
            <input type="text" name="row" placeholder="rowSize" value={sheetRange.row} onChange={onChange} />
            <input type="text" name="col" placeholder="colSize" value={sheetRange.col} onChange={onChange} />
            <ul>
                <li>
                    <Link to="/home">
                        <div><button>홈</button></div>
                    </Link>
                </li>
            </ul>
            <hr />
            <Route path="/home" component={Home} exact={true} />
        </div>
    );
}

export default InputSheetRangePage;
