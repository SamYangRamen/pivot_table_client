import React, { useEffect, useState, useRef, RefObject } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Repository from './Repository';

/* DB에 저장되었던 Sheet 정보를 하나 정해서 불러오는 코드 */

const LoadSheet: React.FC = () => {
    const repo: Repository = new Repository();
    const [value, setValue] = useState('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    return (
        <div>
            <h1>홈</h1>
            <input type="button" name="value" value={value} onChange={onChange} />
            <p>홈, 가장 먼저 보여지는 페이지</p>
            <Link to='/'>
                <button>뒤로가기</button>
            </Link>
        </div>
    );
};

export default LoadSheet;