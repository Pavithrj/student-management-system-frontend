import React, { useEffect, useState } from "react";
import "./StudentList.css";
import { useNavigate } from "react-router-dom";
import { deleteStudent } from "../Service/FrontEndService";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import axios from "axios";
import { API_BASE_URL } from "../constants";
import { useDispatch, useSelector } from 'react-redux';
import { setStudentList, setPageSize, setCurrentPage, setTotalPages, setPageNumbers, setDeleteSuccess } from '../redux/actions/studentsActions';
import LoadingSection from "./LoadingSection";

function StudentList() {
    // const [isSuccessful, setIsSuccessful] = useState(true);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    // const location = useLocation();
    const navigate = useNavigate();

    const { studentList, pageSize, currentPage, totalPages, pageNumbers, deleteSuccess } = useSelector((state) => state.students);
    const dispatch = useDispatch();

    const CreateStudent = () => {
        navigate("/create");
    };

    const handleStudentDetails = (rollNo) => {
        navigate(`/student/${rollNo}`);
    };

    const editStudent = (rollNo) => {
        navigate(`/edit/${rollNo}`);
    };

    const chooseFile = () => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".csv";
        fileInput.addEventListener("change", handleFileSelect);
        fileInput.click();
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const convertFile = async () => {
        try {
            const formData = new FormData();
            formData.append("file", selectedFile);
            const response = await axios.put(
                `${API_BASE_URL}students/uploadfile`,
                formData
            );
            console.log("response:", response.data);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const deletedStudent = async (rollNo) => {
        const updatedStudents = studentList.filter((student) => student.rollNo !== rollNo);

        try {
            await deleteStudent(rollNo);
            dispatch(setStudentList(Object.freeze(updatedStudents)));
            dispatch(setDeleteSuccess(true));

            setTimeout(() => {
                dispatch(setDeleteSuccess(false));
            }, 3000);
        } catch (error) {
            console.error("Failed to delete student:", error);
        }
    };

    const handlePageSizeChange = (event) => {
        const selectedPageSize = parseInt(event.target.value);
        dispatch(setPageSize(selectedPageSize));
        dispatch(setCurrentPage(1));
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoadingData(true);
            try {
                const response = await fetch(`${API_BASE_URL}/students`);
                const jsonData = await response.json();

                const maximumAge = Math.max(...jsonData.map((student) => student.age));
                const updatedStudents = jsonData.map((student) => ({
                    ...student,
                    highlight: student.age === maximumAge,
                }));
                dispatch(setStudentList(updatedStudents));
                setIsLoadingData(false);
                const totalCount = jsonData.length;
                const newTotalPages = Math.ceil(totalCount / pageSize);
                const newPageNumbers = [];
                for (let i = 1; i <= newTotalPages; i++) {
                    newPageNumbers.push(i);
                }
                dispatch(setTotalPages(newTotalPages));
                dispatch(setPageNumbers(newPageNumbers));
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoadingData(false);
            }
        };

        fetchData();
    }, [pageSize, dispatch]);

    // useEffect(() => {
    //     if (location.state?.isSuccessful) {
    //         setIsSuccessful(true);
    //     } else {
    //         setIsSuccessful(false);
    //     }
    // }, [location]);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedStudents = useSelector((state) => {
        const { studentList } = state.students;
        return studentList.slice(startIndex, endIndex);
    });

    return (
        <div>
            {isLoadingData && <LoadingSection />}
            {!isLoadingData && (
                <div>
                    {/* {isSuccessful ? "Successfully Created New Student" : "Try Again"} */}
                    {deleteSuccess && <p>Student deleted successfully!</p>}
                    <h1>Students List:</h1>
                    <div className="items-per-page-container">
                        <label htmlFor="pagesize">PageSize:</label>
                        <select
                            id="pagesize"
                            value={pageSize}
                            onChange={handlePageSizeChange}
                            className="dropdown"
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                            <option value="30">30</option>
                        </select>
                    </div>
                    <div className="student-list-crud-buttons">
                        <button className="create-new-button" onClick={CreateStudent}>
                            <AddBoxIcon />
                            <label className="create-new-student">Create New</label>
                        </button>
                    </div>
                    <div className="student-list-table-header">
                        <div>Name</div>
                        <div>Age</div>
                        <div>RollNo</div>
                    </div>
                    {paginatedStudents.map((student) => {
                        const { id, name, age, rollNo, highlight } = student;
                        return (
                            <div key={id} className={`studentlist ${highlight ? "highlight" : ""}`}>
                                <button onClick={() => editStudent(student)}>
                                    <EditIcon />
                                </button>
                                <div className="student-list-table-content">
                                    <div>{name}</div>
                                    <div>{age}</div>
                                    <div className="studentlist-rollno">
                                        <a
                                            href={() => false}
                                            onClick={() => handleStudentDetails(rollNo)}
                                        >
                                            {rollNo}
                                        </a>
                                    </div>
                                </div>
                                <button onClick={() => deletedStudent(rollNo)}>
                                    <DeleteIcon />
                                </button>
                            </div>
                        );
                    })}
                    <div className="page-container">
                        <button onClick={() => dispatch(setCurrentPage(currentPage - 1))} hidden={currentPage === 1}>
                            <NavigateBeforeIcon />
                        </button>
                        {pageNumbers.map((page) => (
                            <div key={page} className="page-numbers">
                                <div
                                    onClick={() => dispatch(setCurrentPage(page))}
                                    className={currentPage === page ? "active" : ""}
                                >
                                    {page}
                                </div>
                            </div>
                        ))}
                        <button onClick={() => dispatch(setCurrentPage(currentPage + 1))} hidden={currentPage === totalPages}>
                            <NavigateNextIcon />
                        </button>
                    </div>
                    <div className="student-list-footer-button">
                        <button onClick={chooseFile}>Choose File</button>
                        {selectedFile && <>{selectedFile.name}</>}
                        <button onClick={convertFile}>Convert</button>
                    </div>
                </div>
            )
            }
        </div >
    );
}

export default StudentList;