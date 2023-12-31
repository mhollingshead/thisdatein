import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './app/store';
import App from './App';
import './index.scss';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
