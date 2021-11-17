import { action, autorun } from "mobx";
import { RefObject, useEffect } from "react";
import ValueStore from "src/store/ValueStore";
import useStore from "../store/useStore";

type Hook = (
    refctx: RefObject<HTMLCanvasElement>,
    row: number,
    col: number,
) => {
    canvasStyle: React.CSSProperties;
    totalRowWidth: number;
    totalColWidth: number;
};

const useDrawSelect: Hook = (refctx, row, col) => {
    const { valueStore } = useStore();

    const cellRowWidth = 30;
    const cellColWidth = 60;
    const totalRowWidth = row * cellRowWidth;
    const totalColWidth = col * cellColWidth;
    const startPointTop = 100;
    const startPointLeft = 50;

    const painter = (ctx: CanvasRenderingContext2D) => {
        const top = valueStore.getClickStartCellRowIdx();
        const bottom = valueStore.getClickEndCellRowIdx();
        const left = valueStore.getClickStartCellColIdx();
        const right = valueStore.getClickEndCellColIdx();

        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.strokeRect(left * cellColWidth, top * cellRowWidth, (right - left + 1) * cellColWidth, (bottom - top + 1) * cellRowWidth);
        ctx.stroke();
    }

    useEffect(() => {
        const ctx = refctx?.current?.getContext('2d');

        if (ctx == null) {
            return;
        }

        autorun(() => {
            ctx.clearRect(0, 0, totalColWidth, totalRowWidth);
            if (valueStore.getClickBaseCellRowIdx() != -1)
                painter(ctx);
        })

        return () => {
            valueStore.setClickBaseCellRowIdx(-1);
        }
    })

    return {
        canvasStyle: {
            top: `${startPointTop}px`,
            left: `${startPointLeft}px`,
            border: '1px solid red',
            position: 'absolute',
        },
        totalRowWidth,
        totalColWidth,
    };
}

export default useDrawSelect;