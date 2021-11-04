import React, { useState, useEffect, RefObject, useRef } from 'react';
import { withRouter } from 'react-router';
import useStore from './useStore';
import ShowSheet from './ShowSheet';

/* 불러오거나 새로 생성한 Sheet를 직접 편집하는 코드 */
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