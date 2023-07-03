import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { createStudents } from "../Service/CreateService";
import './CreateStudent.css';

function CreateStudent() {
    const [createName, setCreateName] = useState();
    const [createAge, setCreateAge] = useState();
    const [createRollNo, setCreateRollNo] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const navigate = useNavigate();

    const handleCreateName = (e) => {
        setCreateName(e.target.value);
    }

    const handleCreateAge = (e) => {
        setCreateAge(e.target.value);
    }

    const handleCreateRollNo = (e) => {
        setCreateRollNo(e.target.value);
    }

    const submitName = async () => {
        const newStudent = {
            name: createName,
            age: createAge,
            rollNo: createRollNo
        };

        try {
            await createStudents(newStudent);
            navigate('/', { state: { isSuccesful: true } });
        } catch (error) {
            setErrorMessage(error.error);
            console.log("Error in calling the fuction.", error);
        };
    };


    return (
        <div>
            <p>{errorMessage}</p>
            <h2>CreateStudent</h2>
            <div className="student-details-input">
                <div>
                    <label>Name: </label>
                    <input value={createName} onChange={handleCreateName} />
                </div>
                <div>
                    <label>Age: </label>
                    <input type="number" value={createAge} onChange={handleCreateAge} />
                </div>
                <div>
                    <label>RollNo: </label>
                    <input type="number" value={createRollNo} onChange={handleCreateRollNo} />
                </div>
            </div>
            <br />
            <button onClick={submitName}>Submit</button>
        </div>
    )
}

export default CreateStudent;