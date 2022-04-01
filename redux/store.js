import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers/rootReducer"
import { createWrapper, HYDRATE } from "next-redux-wrapper";
const middleware = [thunk];
let initialState = {}

// BINDING MIDDLEWARE
const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};


const makeStore = ({ isServer }) => {
  if (isServer) {
    //If it's on server side, create a store
    return createStore(rootReducer, initialState, bindMiddleware(middleware));
  } else {
    //If it's on client side, create a store which will persis
    const persistConfig = {
      key: "root",
      storage: storage,
      whiteList: [],
    };
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store = createStore(persistedReducer, initialState, bindMiddleware(middleware));
    store.__persisitor = persistStore(store); // This creates a persistor object & push that  persisted object to .__persistor, so that we can avail the persistability feature
    return store;
  }
};
// export an assembled wrapper
export const wrapper = createWrapper(makeStore);