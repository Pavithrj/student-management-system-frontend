import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { createStudent } from "../Service/FrontEndService";
import './CreateStudent.css';
import DoneIcon from '@mui/icons-material/Done';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function CreateStudent() {
    const [createName, setCreateName] = useState("");
    const [createAge, setCreateAge] = useState("");
    const [createRollNo, setCreateRollNo] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e, stateSetter) => {
        stateSetter(e.target.value);
    };

    const GoBack = () => {
        navigate('/');
    };

    const SubmitCreatedStudent = async () => {
        const newStudent = {
            name: createName,
            age: createAge,
            rollNo: createRollNo
        };

        try {
            await createStudent(newStudent);
            navigate('/', { state: { isSuccessful: true } });
        } catch (error) {
            setErrorMessage(error.message);
            console.log("Error in calling the function.", error);
        }
    };

    const renderInputField = (label, value, onChange) => {
        return (
            <div>
                <label>
                    {label}:
                    <input value={value} onChange={onChange} aria-label={label} />
                </label>
            </div>
        );
    };

    return (
        <div>
            <p className="error-message">{errorMessage}</p>
            <h1>Create Student:</h1>
            <div className="create-student-details-input">
                {renderInputField("Name", createName, (e) => handleInputChange(e, setCreateName))}
                {renderInputField("Age", createAge, (e) => handleInputChange(e, setCreateAge))}
                {renderInputField("RollNo", createRollNo, (e) => handleInputChange(e, setCreateRollNo))}
            </div>
            <br />
            <div className="create-student-buttons">
                <button data-testid="create-student-go-back-btn" onClick={GoBack}><ArrowBackIcon /></button>
                <button data-testid="doneButton" onClick={SubmitCreatedStudent}><DoneIcon /></button>
            </div>
        </div>
    )
}

export default CreateStudent;