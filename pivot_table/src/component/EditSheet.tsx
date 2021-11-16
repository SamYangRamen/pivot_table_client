import React, { useState, useEffect, RefObject, useRef } from 'react';
import { withRouter } from 'react-router';
import useStore from 'src/store/useStore';
import ShowSheet from 'src/component/ShowSheet';

/* 불러오거나 새로 생성한 Sheet를 직접 편집하는 코드 */
const EditSheet: React.FC = () => {
    const { valueStore } = useStore();

    return (
        <div>
            현재 시트 정보 - [id:{valueStore.getSheetId()}] [name:{valueStore.getSheetName()}] [size:{valueStore.getRowSize()}*{valueStore.getColSize()}]
            <ShowSheet row={valueStore.getRowSize()} col={valueStore.getColSize()} />
        </div>
    );
}

export default EditSheet;