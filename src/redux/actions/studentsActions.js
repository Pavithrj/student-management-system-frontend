import { ActionTypes } from "../constants/Action-Types";

export const setStudentList = (studentList) => {
  return {
    type: ActionTypes.SET_STUDENTS,
    payload: studentList,
  };
};

export const setPageSize = (pageSize) => ({
  type: ActionTypes.SET_PAGESIZE,
  payload: pageSize,
});

export const setCurrentPage = (currentPage) => ({
  type: ActionTypes.SET_CURRENTPAGE,
  payload: currentPage,
});

export const setTotalPages = (totalPages) => ({
  type: ActionTypes.SET_TOTALPAGES,
  payload: totalPages,
});

export const setPageNumbers = (pageNumbers) => ({
  type: ActionTypes.SET_PAGENUMBERS,
  payload: pageNumbers,
});

export const setIsLoadingData = (isLoading) => ({
  type: ActionTypes.SET_ISLOADING,
  payload: isLoading,
});

export const setStudentDetails = (studentDetails) => ({
  type: ActionTypes.SET_STUDENTDETAILS,
  payload: studentDetails,
});

export const setUpdateStudent = (updateStudent) => ({
  type: ActionTypes.SET_UPDATESTUDENT,
  payload: updateStudent,
});

export const setDeleteSuccess = (deleteSuccess) => ({
  type: ActionTypes.SET_DELETESUCCESS,
  payload: deleteSuccess,
});