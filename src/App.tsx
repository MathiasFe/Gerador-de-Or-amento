import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router'
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline'
import ThemeCustom from './Content/styles/Global';
import { OrcamentoProvider } from './Context/OrcamentoContext';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={ThemeCustom}>
        <CssBaseline />
        <OrcamentoProvider>
          <Router />
        </OrcamentoProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
