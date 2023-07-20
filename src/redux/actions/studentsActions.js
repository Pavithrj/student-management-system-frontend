import { ActionTypes } from "../constants/Action-Types";

export const setStudentList = (studentList) => {
  return {
    type: ActionTypes.SET_STUDENTS,
    payload: studentList,
  };
};