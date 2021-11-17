import { autorun } from "mobx";
import React, { RefObject, useContext, useEffect } from "react";
import useStore from "src/store/useStore";

type Hook = (
    refctx: RefObject<HTMLCanvasElement>,
    row: number,
    col: number
) => {
    canvasStyle: React.CSSProperties;
    totalRowWidth: number;
    totalColWidth: number;
};

const useDrawSheet: Hook = (refctx, row, col) => {
    const { valueStore } = useStore();

    const cellRowWidth = 30;
    const cellColWidth = 60;
    const totalRowWidth = row * cellRowWidth;
    const totalColWidth = col * cellColWidth;
    const startPointTop = 100;
    const startPointLeft = 50;

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

        ctx.clearRect(0, 0, totalColWidth, totalRowWidth);
        painter(ctx);
    })

    return {
        canvasStyle: {
            top: `${startPointTop}px`,
            left: `${startPointLeft}px`,
            border: '1px solid black',
            position: 'absolute',
        },
        totalRowWidth,
        totalColWidth,
    };
}

export default useDrawSheet;