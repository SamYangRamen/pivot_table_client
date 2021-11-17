import React, { useEffect, useState, useRef, RefObject } from 'react';
import useStore from "../store/useStore";

type MouseHandlerType = (e: React.MouseEvent<HTMLElement | SVGElement>) => void;

const MouseEventHandler = () => {
    const { valueStore } = useStore();
    const cellRowWidth = 30;
    const cellColWidth = 60;
    const startPointTop = 100;
    const startPointLeft = 50;

    const getCellIndex = (clickRow: number, clickCol: number) => {
        return {
            row: Math.floor((clickRow - startPointTop) / cellRowWidth),
            col: Math.floor((clickCol - startPointLeft) / cellColWidth),
        }
    }

    const onMouseDown: MouseHandlerType = e => {
        valueStore.setIsClicked(true);

        const { row, col } = getCellIndex(e.pageY, e.pageX);

        valueStore.setClickStartCellColIdx(col);
        valueStore.setClickStartCellRowIdx(row);
        valueStore.setClickEndCellColIdx(col);
        valueStore.setClickEndCellRowIdx(row);
        valueStore.setClickBaseCellColIdx(col);
        valueStore.setClickBaseCellRowIdx(row);
    }

    const onMouseMove: MouseHandlerType = e => {
        if (valueStore.getIsClicked() == false) {
            return;
        }

        const { row, col } = getCellIndex(e.pageY, e.pageX);

        if (valueStore.getClickBaseCellColIdx() < col) {
            valueStore.setClickEndCellColIdx(col);
        } else if (valueStore.getClickBaseCellColIdx() == col) {
            valueStore.setClickStartCellColIdx(col);
            valueStore.setClickEndCellColIdx(col);
        } else {
            valueStore.setClickStartCellColIdx(col);
        }

        if (valueStore.getClickBaseCellRowIdx() < row) {
            valueStore.setClickEndCellRowIdx(row);
        } else if (valueStore.getClickBaseCellRowIdx() == row) {
            valueStore.setClickStartCellRowIdx(row);
            valueStore.setClickEndCellRowIdx(row);
        } else {
            valueStore.setClickStartCellRowIdx(row);
        }

    }

    const onMouseUp: MouseHandlerType = e => {
        valueStore.setIsClicked(false);
        // alert(`${valueStore.getClickEndCellBottomIdx()} ${valueStore.getClickEndCellRightIdx()}`)
    }

    const onMouseOut: MouseHandlerType = e => {
        valueStore.setClickBaseCellRowIdx(-1);
        // valueStore.setIsMouseOut(true);
    }

    const onMouseOver: MouseHandlerType = e => {
        valueStore.setIsMouseOut(false);
    }

    const onClick: MouseHandlerType = e => {
        alert("ABC!");
        if (valueStore.getIsMouseOut() == true) {
            valueStore.setClickBaseCellRowIdx(-1);
        }
    }
    return {
        onMouseDown,
        onMouseMove,
        onMouseUp,
        onMouseOut,
        onMouseOver,
        onClick,
    }
}

export default MouseEventHandler;