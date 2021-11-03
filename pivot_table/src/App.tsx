import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import Home from './Home';
import ValueStore from './ValueStore'
import useStore from './useStore';
import RootStore from './RootStore';
import StoreProvider from './StoreProvider';
import InputSheetRangePage from './InputSheetRangePage';

const App: React.FC = () => {
  const [store] = useState<RootStore>({ valueStore: new ValueStore });
  return (
    <StoreProvider value={store}>
      <InputSheetRangePage />
    </StoreProvider>
  );
}

export default App;
