import React from 'react';
import logo from './logo.svg';
import './App.css';
import { reduxStore } from './actions/reduxStore'
import { Provider } from 'react-redux'
import { Container } from '@material-ui/core';
import {ToastProvider} from 'react-toast-notifications'
import ViewCatalog from './components/View/ViewCatalog'

function App() {
  return (
    <Provider store={reduxStore}>
    <ToastProvider autoDismiss={true}>
      <Container maxWidth="lg">
        <ViewCatalog />
      </Container>
    </ToastProvider>
    </Provider>
  );
}

export default App;
