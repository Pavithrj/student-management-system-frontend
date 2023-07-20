import { ActionTypes } from "../constants/Action-Types";

const initialState = {
  studentList: [],
  pageSize: 5,
  currentPage: 1,
  totalPages: 1,
  pageNumbers: [],
  isLoadingData: true,
  studentDetails: {},
  updateStudent: {},
  deleteSuccess: false,
};

export const studentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_STUDENTS:
      return {
        ...state,
        studentList: action.payload,
      };
    case ActionTypes.SET_PAGESIZE:
      return {
        ...state,
        pageSize: action.payload,
      };
    case ActionTypes.SET_CURRENTPAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case ActionTypes.SET_TOTALPAGES:
      return {
        ...state,
        totalPages: action.payload,
      };
    case ActionTypes.SET_PAGENUMBERS:
      return {
        ...state,
        pageNumbers: action.payload,
      };
    case ActionTypes.SET_ISLOADING:
      return {
        ...state,
        isLoadingData: action.payload,
      };
    case ActionTypes.SET_STUDENTDETAILS:
      return {
        ...state,
        studentDetails: action.payload,
      };
    case ActionTypes.SET_UPDATESTUDENT:
      return {
        ...state,
        updateStudent: action.payload,
      };
    case ActionTypes.SET_DELETESUCCESS:
      return {
        ...state,
        deleteSuccess: action.payload,
      };
    default:
      return state;
  };
};