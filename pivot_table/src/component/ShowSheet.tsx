import React, { RefObject, useContext, useEffect, useRef } from "react";
import useDrawSheet from "src/util/drawSheet";
import useDrawSelect from "src/util/drawSelect";
import useStore from "src/store/useStore";
import MouseEventHandler from "src/util/MouseEventHandler"
import { values } from "mobx";

interface Props {
    row: number;
    col: number;
}

/* Sheet를 렌더링하는 코드 */
const ShowSheet: React.FC<Props> = ({ row, col }) => {

    const sheetRefCtx: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null);
    const selectRefCtx: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null);
    const { canvasStyle: sheetCanvasStyle, totalRowWidth: sheetTotalRowWidth, totalColWidth: sheetTotalColWidth } = useDrawSheet(sheetRefCtx, row, col);
    const { canvasStyle: selectCanvasStyle, totalRowWidth: selectTotalRowWidth, totalColWidth: selectTotalColWidth } = useDrawSelect(selectRefCtx, row, col);
    const {
        onMouseDown,
        onMouseMove,
        onMouseUp,
        onMouseOut,
        onMouseOver,
        onClick,
    } = MouseEventHandler();

    return (
        <div>
            <canvas
                ref={sheetRefCtx}
                className="SheetCanvas"
                style={sheetCanvasStyle}
                id={`${row},${col}`}
                key={`${row} ${col}`}
                width={`${sheetTotalColWidth}px`}
                height={`${sheetTotalRowWidth}px`}
            >
            </canvas>
            <canvas
                ref={selectRefCtx}
                className="SelectCanvas"
                style={selectCanvasStyle}
                id={`${row},${col}`}
                key={`${row} ${col}`}
                width={`${selectTotalColWidth}px`}
                height={`${selectTotalRowWidth}px`}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseOut={onMouseOut}
            >
            </canvas>
        </div>
    );
}

export default ShowSheet;