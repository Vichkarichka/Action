import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import reducer from './Reducer';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';


const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const pReducer = persistReducer(persistConfig, reducer);
export const store = createStore(pReducer, {}, applyMiddleware(thunk));
export const persistor = persistStore(store);

