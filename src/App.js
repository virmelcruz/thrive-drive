import React from 'react';
import GlobalStyle from './globalStyles';
import { BodyContainer, BodyCard } from './App.styles';
import { Outlet } from 'react-router-dom';
import { BreadCrumbs } from './components';
import { AppContext, useAppState } from './AppContext';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
  const value = useAppState();
  return (
    <AppContext.Provider value={value}>
      <GlobalStyle />
      <BodyContainer>
        <BodyCard>
          <BreadCrumbs />
          <Outlet />
        </BodyCard>
        
      </BodyContainer>
    </AppContext.Provider>
  );
}

export default App;
