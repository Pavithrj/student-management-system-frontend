import React, { useEffect, useState } from "react";
import './StudentDetails.css';
import { useLocation, useNavigate } from 'react-router-dom';

function StudentDetails() {
    const [students, setStudents] = useState([]);
    const [isSuccesful, setIsSuccesful] = useState(true);
    const location = useLocation();
    window.mylocation = location;
    // const { isSuccesfulCreated } = location;
    const navigate = useNavigate();

    const handleCreateStudent = () => {
        navigate('/create');
    }

    const handleDeleteStudent = () => {
        navigate('/delete');
        console.log("Deleted");
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/students');
                const jsonData = await response.json();
                setStudents(jsonData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (location.state?.isSuccesful) {
            setIsSuccesful(true);
        } else {
            setIsSuccesful(false);
        }
    }, [location]);

    return (
        <div>
            {isSuccesful ? "Successfully Created New Student" : "Try Again"}
            <h2>Students Details:</h2>
            <div className="table-header">
                <div>Name</div>
                <div>Age</div>
                <div>RollNo</div>
            </div>
            {students.map((student) => {
                const { id, name, age, rollNo } = student;
                return (
                    <div key={id} className="table-content">
                        <div>{name}</div>
                        <div>{age}</div>
                        <div>{rollNo}</div>
                    </div>
                )
            }
            )}
            <div className="crud-buttons">
                <button onClick={handleCreateStudent}>Create</button>
                <button onClick={handleDeleteStudent}>Delete</button>
            </div>
        </div>
    );
}

export default StudentDetails;