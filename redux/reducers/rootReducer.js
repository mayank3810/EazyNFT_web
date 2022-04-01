import { combineReducers } from "redux"
import mainReducer from "./mainReducer"
import userReducer from "./userReducer"
import collectionReducer from "./collectionReducer"

const rootReducer = combineReducers({
  main: mainReducer,
  user: userReducer,
  collectibles: collectionReducer
})

export default rootReducer;