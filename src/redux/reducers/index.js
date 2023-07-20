import { combineReducers } from "redux";
import { studentReducer } from "./studentReducer";
const reducers = combineReducers({
  students: studentReducer,
  // product: selectedProductsReducer,
});
export default reducers;
