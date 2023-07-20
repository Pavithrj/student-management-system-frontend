import { combineReducers } from "redux";
import { studentsReducer } from "./studentReducer";

const reducers = combineReducers({
  students: studentsReducer,
  // product: selectedProductsReducer,
});

export default reducers;