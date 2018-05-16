import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './Redux/Store';
import { LoadingView } from "./Components/LoadingView";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<LoadingView />} persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
