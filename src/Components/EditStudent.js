import React, { useEffect } from "react";
import './EditStudent.css';
import DoneIcon from '@mui/icons-material/Done';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from "react-router";
import { editStudent } from "../Service/FrontEndService";
import { API_BASE_URL } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { setUpdateStudent } from "../redux/actions/studentsActions";

function EditStudent() {
    const { updateStudent } = useSelector((state) => state.students);
    const dispatch = useDispatch();
    const { name, age } = updateStudent;
    // const [errorMessage, setErrorMessage] = useState();
    // const [isSuccessful, setIsSuccessful] = useState(false);
    const { rollNo } = useParams();
    const navigate = useNavigate();

    const GoBack = () => {
        navigate('/');
    };

    const SubmitUpdatedStudent = async (e) => {
        e.preventDefault();
        await editStudent(rollNo, updateStudent);
    };

    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/students/${rollNo}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch student details");
                }
                const jsonData = await response.json();
                dispatch(setUpdateStudent(jsonData));
            } catch (error) {
                console.error(error);
            }
        };

        fetchStudentDetails();
    }, [rollNo, dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(setUpdateStudent((data) => ({
            ...data,
            [name]: value
        })));
    };

    return (
        <div>
            {/* {isSuccessful && <p className="success-message">Student updated successfully!</p>} */}
            {/* <p>{errorMessage}</p> */}
            <h1>Edit Student:</h1>
            <div className="edit-student-input">
                <div>
                    <label>Name: </label>
                    <input name="name" value={name} onChange={handleChange} />
                </div>
                <div>
                    <label>Age: </label>
                    <input name="age" value={age} onChange={handleChange} />
                </div>
            </div>
            <div className="edit-student-buttons">
                <button onClick={GoBack}><ArrowBackIcon /></button>
                <button onClick={SubmitUpdatedStudent}><DoneIcon /></button>
            </div>
        </div>
    );
}

export default EditStudent;