import React, { useEffect, useState, useRef, RefObject } from 'react';
import useStore from "../store/useStore";

type MouseHandlerType = (e: React.MouseEvent<HTMLElement | SVGElement>) => void;

const MouseEventHandler = () => {
    const { valueStore } = useStore();

    const onMouseDown: MouseHandlerType = e => {
        valueStore.setIsClicked(true);

        const { row, col } = valueStore.getCellIndex(e.pageY, e.pageX);

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

        const { row, col } = valueStore.getCellIndex(e.pageY, e.pageX);

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
    }

    const onMouseOut: MouseHandlerType = e => {
        valueStore.setClickBaseCellRowIdx(-1);
    }

    const onMouseOver: MouseHandlerType = e => {
    }

    const onDoubleClick: MouseHandlerType = e => {
        const { row, col } = valueStore.getCellIndex(e.pageY, e.pageX);
    }

    return {
        onMouseDown,
        onMouseMove,
        onMouseUp,
        onMouseOut,
        onMouseOver,
        onDoubleClick,
    }
}

export default MouseEventHandler;