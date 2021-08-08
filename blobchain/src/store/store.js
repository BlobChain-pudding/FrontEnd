import { rootReducer } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
// ENHANCING STORE WITH FIREBASE
import firebase from "../firebase";
import { reactReduxFirebase } from 'react-redux-firebase';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const createStoreWithFirebase = compose(reactReduxFirebase(firebase))(
  createStore
);



const mainstore = createStoreWithFirebase(
    persistedReducer,
    {},  
    composeWithDevTools(applyMiddleware(reduxThunk))
);

const persistor = persistStore(mainstore);

export {mainstore , persistor};
