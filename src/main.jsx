import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import GlobalFontStyle from './assets/fonts/GlobalFontsStyle.jsx';
import GlobalStyled from './styles/Globalstyled.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <GlobalStyled />
    <GlobalFontStyle />
    <App />
  </>
);
