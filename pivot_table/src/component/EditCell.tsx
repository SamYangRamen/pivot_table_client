import { autorun, reaction } from 'mobx';
import React, { useState, useEffect, RefObject, useRef, useLayoutEffect, ReactEventHandler } from 'react';
import useStore from "src/store/useStore";
import CellRepository from "src/repository/CellRepository";
import { isString } from 'mobx/dist/internal';
import { CellData, CellIdx } from 'src/store/ValueStore';

interface Props {
    backgroundColor: string;
    row: number;
    col: number;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
}


const EditCell: React.FC<Props> = ({ backgroundColor, row, col, onKeyDown }) => {
    const { valueStore, repositoryStore } = useStore();
    const repo = repositoryStore.getCellRepository();
    const { cellRowWidth, cellColWidth, startPointTop, startPointLeft } = valueStore.getFixedValues();
    const initialValue = valueStore.getCell(row, col)?.data;
    const [inputValue, setInputValue] = useState<string>(initialValue || '');
    const resultValue = useRef(inputValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        resultValue.current = e.target.value;
    }

    const onFocus = () => {
        //setInputValue('');
    }

    useEffect(() => {
        // 값 입력을 종료하여 렌더링을 끄기 직전에, 입력한 값을 DB에 저장하는 과정
        return () => {
            const newCellData = {
                sheetId: valueStore.getSheetId(),
                isPivot: false,
                row: row,
                col: col,
                data: resultValue.current,
                dataType: parseFloat(resultValue.current) ? 'N' : 'S'
            }
            repo.insertCellData(newCellData).then(response => {
                if (response == 1) {
                    valueStore.setCell(row, col, newCellData.isPivot, newCellData.data, newCellData.dataType);
                }
                else if (response == 0) {
                    alert("데이터가 정상적으로 입력되지 않았습니다.")
                }
            }).catch(e => {
                alert("데이터가 정상적으로 입력되지 않았습니다.")
            });
        }
    }, []);

    // 셀을 더블클릭하면 자동으로 해당 셀의 input 태그로 포커싱하기 위한 코드
    const inputRef = useRef<HTMLInputElement>(null);
    useLayoutEffect(() => {
        if (inputRef.current != null)
            inputRef.current.focus();
    })

    return (
        <div>
            <input ref={inputRef} style={{
                position: "absolute",
                backgroundColor,
                left: startPointLeft + col * cellColWidth,
                top: startPointTop + row * cellRowWidth,
                width: cellColWidth - 6,
                height: cellRowWidth - 4,
                textAlign: "center",
                outline: "none",
            }} type="text" name="cellInput" value={inputValue} onChange={onChange} onKeyDown={onKeyDown} />
        </div>
    )
}

export default React.memo(EditCell);