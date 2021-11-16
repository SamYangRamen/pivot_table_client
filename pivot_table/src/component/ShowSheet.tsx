import { RefObject, useRef } from "react";
import useSheet from "src/util/useSheet";
import useStore from "src/store/useStore";

interface Props {
    row: number;
    col: number;
}

/* Sheet를 렌더링하는 코드 */
const ShowSheet: React.FC<Props> = ({ row, col }) => {
    const { valueStore } = useStore();
    const refctx: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null);
    const { canvasStyle, totalRowWidth, totalColWidth } = useSheet(refctx, row, col);
    return (
        <canvas
            ref={refctx}
            className="MyCanvas"
            style={canvasStyle}
            id={`${row},${col}`}
            key={`${row} ${col}`}
            width={`${totalColWidth}px`}
            height={`${totalRowWidth}px`}
        >
        </canvas>
    );
}

export default ShowSheet;