import React, { useEffect, useState, useRef, RefObject } from 'react';
import { Link, withRouter } from 'react-router-dom';
import SheetRepository from './SheetRepository';
import useStore from './useStore';

/* DB에 저장되었던 Sheet 정보를 하나 정해서 불러오는 코드 */

const LoadSheet: React.FC = () => {
    const repo = useStore().repositoryStore.getSheetRepository();
    const [num, setNum] = useState(-1);

    const onClick = (e: any) => {
        repo.postTestMethod(123).then(response => alert(response.num || num));
    }

    return (
        <div>
            <h1>홈</h1>
            <input type="button" name="value" value="ABCD" onClick={onClick} />
            <p>홈, 가장 먼저 보여지는 페이지</p>
            <Link to='/'>
                <button>뒤로가기</button>
            </Link>
        </div>
    );
};

export default LoadSheet;