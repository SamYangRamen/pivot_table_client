import React, { RefObject } from "react";

interface Props {
    ref: RefObject<HTMLCanvasElement>,
    style: React.CSSProperties,
    width: string,
    height: string,
    mouseEventHandler?: {
        onMouseDown?: (e: React.MouseEvent<HTMLElement | SVGElement>) => void,
        onMouseMove?: (e: React.MouseEvent<HTMLElement | SVGElement>) => void,
        onMouseUp?: (e: React.MouseEvent<HTMLElement | SVGElement>) => void,
        onMouseOut?: (e: React.MouseEvent<HTMLElement | SVGElement>) => void,
        onDoubleClick?: (e: React.MouseEvent<HTMLElement | SVGElement>) => void,
    }
}

const ShowCanvas: React.FC<Props> = ({ ref, style, width, height, mouseEventHandler }) => {
    return (
        <div>
            <canvas
                ref={ref}
                style={style}
                width={`${width}px`}
                height={`${height}px`}
                onMouseDown={mouseEventHandler?.onMouseDown}
                onMouseMove={mouseEventHandler?.onMouseMove}
                onMouseUp={mouseEventHandler?.onMouseUp}
                onMouseOut={mouseEventHandler?.onMouseOut}
                onDoubleClick={mouseEventHandler?.onDoubleClick}
            >
            </canvas>
        </div>
    );
}

export default React.memo(ShowCanvas);