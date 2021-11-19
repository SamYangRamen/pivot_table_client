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

    const { cellRowWidth, cellColWidth, startPointTop, startPointLeft } = valueStore.getFixedValues();
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

        ctx.font = "20px Arial";
        ctx.textAlign = "center";

        /*
            if (valueStore.getCells().size == 0)
                alert("데이터가 나중에 불러와졌음");
        */

        valueStore.getCells().forEach((value, key) => {
            const { row, col }: { row: number, col: number } = valueStore.parseKeyStringToNumbers(key);
            ctx.fillText(value.data || '', (col + 0.5) * cellColWidth, (row + 0.75) * cellRowWidth, cellColWidth);
        })

        ctx.stroke();
    }

    useEffect(() => {
        const ctx = refctx?.current?.getContext('2d');

        if (ctx == null) {
            return;
        }

        // observable한 변수에 변화가 있을 때 이를 감지하여 실행하는 메서드
        autorun(() => {
            ctx.clearRect(0, 0, totalColWidth, totalRowWidth);
            painter(ctx);
        })
    }, [])

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