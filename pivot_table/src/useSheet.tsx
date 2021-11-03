import { autorun } from "mobx";
import { RefObject, useEffect } from "react";

type Hook = (
    refctx: RefObject<HTMLCanvasElement>,
    row: number,
    col: number
) => {
    canvasStyle: React.CSSProperties;
    totalRowWidth: number;
    totalColWidth: number;
};

const useSheet: Hook = (refctx, row, col) => {
    const cellRowWidth = 30;
    const cellColWidth = 60;
    const totalRowWidth = row * cellRowWidth;
    const totalColWidth = col * cellColWidth;

    const painter = (ctx: CanvasRenderingContext2D) => {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < col; i++) {
            for (let j = 0; j < row; j++) {
                ctx.strokeRect(i * cellColWidth, j * cellRowWidth, cellColWidth, cellRowWidth);
            }
        }
        ctx.stroke();
    }

    useEffect(() => {
        const ctx = refctx?.current?.getContext('2d');

        if (ctx == null) {
            return;
        }

        autorun(() => {
            ctx.clearRect(0, 0, totalRowWidth, totalColWidth);
            painter(ctx);
        })
    })

    return {
        canvasStyle: {
            top: `${100}px`,
            left: `${50}px`,
            border: '1px solid black',
            position: 'absolute',
        },
        totalRowWidth,
        totalColWidth,
    };
}

export default useSheet;