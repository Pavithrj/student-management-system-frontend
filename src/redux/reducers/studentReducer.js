import { ActionTypes } from "../constants/Action-Types";

const initialState = {
  studentList: [],
};

export const studentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_STUDENTS:
      return { ...state, studentList: payload };
    default:
      return state;
  }
};