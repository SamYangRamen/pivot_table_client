import { useState } from 'react';
import { Route, Switch, withRouter } from 'react-router';
import Home from './Home';
import LoadSheet from './LoadSheet';
import NewSheet from './NewSheet';
import RootStore from './RootStore';
import StoreProvider from './StoreProvider';
import ValueStore from './ValueStore';

/*  RootStore는, 프로그램 실행 내내 메모리 상에서 살아있어야 하고
    모든 컴포넌트들에서 공유 및 사용될 수 있어야 하는 데이터들을 저장하는 인터페이스임
    본 코드에서는 RootStore를 초기화하여 다른 컴포넌트들을 감싸는 형태로 만듦으로써
    모든 컴포넌트들에서 접근 가능하도록 작성한 것임
*/
const Root: React.FC = () => {
    const [store] = useState<RootStore>({ valueStore: new ValueStore });

    return (
        <StoreProvider value={store}>
            <Switch>
                <Route path='/LoadSheet' component={LoadSheet} />
                <Route path='/NewSheet' component={NewSheet} />
                <Route path='/' exact component={Home} />
            </Switch>
        </StoreProvider>
    );
}

export default Root;
