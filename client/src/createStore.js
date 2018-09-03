import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import authReducer from "./reducers/authReducer";
import errorsReducer from "./reducers/errorsReducer";
import profileReducer from "./reducers/profileReducer";
import postReducer from "./reducers/postReducer";
import thunk from "redux-thunk";

const reducers = combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  profile: profileReducer,
  post: postReducer
});

export const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
