import React, { useState, useEffect, RefObject, useRef } from 'react';
import { withRouter } from 'react-router';
import useStore from './useStore';
import ShowSheet from './ShowSheet';
/*
 
useEffect(() => {
    const ctx = refctx?.
})
*/

const EditSheet: React.FC = () => {
    const { valueStore } = useStore();

    return (
        <div>
            현재 시트의 크기는 ({valueStore.getRowSize()}, {valueStore.getColSize()}) 입니다.
            <ShowSheet row={valueStore.getRowSize()} col={valueStore.getColSize()} />
        </div>
    );
}

export default EditSheet;