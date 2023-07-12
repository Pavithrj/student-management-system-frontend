import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { createStudent } from "../Service/FrontEndService";
import './CreateStudent.css';
import DoneIcon from '@mui/icons-material/Done';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function CreateStudent() {
    const [createName, setCreateName] = useState();
    const [createAge, setCreateAge] = useState();
    const [createRollNo, setCreateRollNo] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const navigate = useNavigate();

    const handleCreateNameChange = (e) => {
        setCreateName(e.target.value);
    }

    const handleCreateAgeChange = (e) => {
        setCreateAge(e.target.value);
    }

    const handleCreateRollNoChange = (e) => {
        setCreateRollNo(e.target.value);
    }

    const GoBack = () => {
        navigate('/');
    }

    const SubmitCreatedStudent = async () => {
        const newStudent = {
            name: createName,
            age: createAge,
            rollNo: createRollNo
        };

        try {
            await createStudent(newStudent);
            navigate('/', { state: { isSuccesful: true } });
        } catch (error) {
            setErrorMessage(error.error);
            console.log("Error in calling the fuction.", error);
        };
    };

    return (
        <div>
            <p>{errorMessage}</p>
            <h1>Create Student:</h1>
            <div className="create-student-details-input">
                <div>
                    <label>Name: </label>
                    <input value={createName} onChange={handleCreateNameChange} />
                </div>
                <div>
                    <label>Age: </label>
                    <input type="number" value={createAge} onChange={handleCreateAgeChange} />
                </div>
                <div>
                    <label>RollNo: </label>
                    <input type="number" value={createRollNo} onChange={handleCreateRollNoChange} />
                </div>
            </div>
            <br />
            <div className="create-student-buttons">
                <button onClick={GoBack}><ArrowBackIcon /></button>
                <button onClick={SubmitCreatedStudent}><DoneIcon /></button>
            </div>
        </div>
    )
}

export default CreateStudent;