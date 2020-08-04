import React from 'react';
import logo from './logo.svg';
import './App.css';
import { reduxStore } from './actions/reduxStore'
import { Provider } from 'react-redux'
import { Container } from '@material-ui/core';
import {ToastProvider} from 'react-toast-notifications'
import ManageCatalog from './components/catalog/manage/ManageCatalog'
import Login from './components/users/login/Login'
import ScrollableTabsButtonForce from './components/site/header';
import OverLine from './components/site/footliner';


function App() {
  return (
    <Provider store={reduxStore}>
    <ToastProvider autoDismiss={true}>
      <Container maxWidth="lg">
      <ScrollableTabsButtonForce/> 

      
      <OverLine/>
      </Container>
      
    </ToastProvider>
      
    
    </Provider>
  );
}

export default App;
