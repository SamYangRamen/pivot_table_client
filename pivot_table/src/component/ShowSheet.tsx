import React, { RefObject, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import useDrawSheet from "src/util/drawSheet";
import useDrawSelect from "src/util/drawSelect";
import useStore from "src/store/useStore";
import MouseEventHandler from "src/util/MouseEventHandler"
import EditCell from "src/component/EditCell"
import ShowCanvas from "src/component/ShowCanvas"
import { reaction, values } from "mobx";
import { CellDataDTO } from "src/repository/SheetRepository";
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface Props {
    row: number;
    col: number;
}

type MouseHandlerType = (e: React.MouseEvent<HTMLElement | SVGElement>) => void;

/* Sheet를 렌더링하는 코드 */
const ShowSheet: React.FC<Props> = ({ row, col }) => {

    const { valueStore, repositoryStore } = useStore();
    const sheetRefCtx: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null);
    const selectRefCtx: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null);
    const { canvasStyle: sheetCanvasStyle, totalRowWidth: sheetTotalRowWidth, totalColWidth: sheetTotalColWidth } = useDrawSheet(sheetRefCtx, row, col);
    const { canvasStyle: selectCanvasStyle, totalRowWidth: selectTotalRowWidth, totalColWidth: selectTotalColWidth } = useDrawSelect(selectRefCtx, row, col);
    const [isCellInputActivated, setIsCellInputActivated] = useState<boolean>(false);
    const [cellIdx, setCellIdx] = useState<{ row: number, col: number }>({ row: -1, col: -1 });
    const [value, setValue] = useState<string | undefined>();
    const [inputBackgroundColor, setInputBackgroundColor] = useState<string>("white");
    const {
        onMouseMove,
        onMouseUp,
        onMouseOut,
    } = MouseEventHandler();

    const onMouseDown: MouseHandlerType = e => {
        valueStore.setIsClicked(true);

        const { row, col } = valueStore.getCellIndex(e.pageY, e.pageX);

        valueStore.setClickStartCellColIdx(col);
        valueStore.setClickStartCellRowIdx(row);
        valueStore.setClickEndCellColIdx(col);
        valueStore.setClickEndCellRowIdx(row);
        valueStore.setClickBaseCellColIdx(col);
        valueStore.setClickBaseCellRowIdx(row);

        if (isCellInputActivated == true) {
            setIsCellInputActivated(false)
            setInputBackgroundColor("white");
        }

    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter') {
            setIsCellInputActivated(false);
        }
    }

    const onDoubleClick: MouseHandlerType = e => {
        setIsCellInputActivated(true);
        setInputBackgroundColor("#FFFF66");
        setCellIdx(valueStore.getCellIndex(e.pageY, e.pageX));
    }

    useEffect(() => {
        setValue(valueStore.getCell(row, col)?.data);
    }, [cellIdx])

    /*
    return (
        <div>
            <ShowCanvas ref={sheetRefCtx} style={sheetCanvasStyle} width={`${sheetTotalColWidth}px`} height={`${sheetTotalRowWidth}px`} />
            <ShowCanvas ref={selectRefCtx} style={selectCanvasStyle} width={`${selectTotalColWidth}px`} height={`${selectTotalRowWidth}px`}
                mouseEventHandler={{ onMouseDown, onMouseMove, onMouseUp, onMouseOut, onDoubleClick }}
            />
            <EditCell isDisabled={isEditCellDisabled} backgroundColor={inputBackgroundColor} row={cellIdx.row} col={cellIdx.col} />
        </div>
    );
    */
    return (
        <div>
            <canvas
                ref={sheetRefCtx}
                className="SheetCanvas"
                style={sheetCanvasStyle}
                width={`${sheetTotalColWidth}px`}
                height={`${sheetTotalRowWidth}px`}
            >
            </canvas>
            <canvas
                ref={selectRefCtx}
                className="SelectCanvas"
                style={selectCanvasStyle}
                width={`${selectTotalColWidth}px`}
                height={`${selectTotalRowWidth}px`}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseOut={onMouseOut}
                onDoubleClick={onDoubleClick}
            >
            </canvas>
            {isCellInputActivated == false ? null : <EditCell backgroundColor={inputBackgroundColor} row={cellIdx.row} col={cellIdx.col} onKeyDown={onKeyDown} />}
        </div>
    );
}

export default React.memo(ShowSheet);