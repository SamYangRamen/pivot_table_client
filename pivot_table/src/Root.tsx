import { useState } from 'react';
import { Route, Switch, withRouter } from 'react-router';
import Home from './Home';
import LoadSheet from './LoadSheet';
import NewSheet from './NewSheet';
import RootStore from './RootStore';
import StoreProvider from './StoreProvider';
import ValueStore from './ValueStore';

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
