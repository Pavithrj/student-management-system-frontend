import React, { useEffect, useState } from 'react';

function DeleteStudent() {
    const [studentName, setStudentName] = useState('');
    const [message, setMessage] = useState('');
    const [studentList, setStudentList] = useState([]);

    const handleDeleteStudent = () => {
        const student = studentList.map((item) => item.name);
        for (let i = 0; i < student.length; i++) {
            if (student === studentName) {
                studentList.splice(0, 1);
                setTimeout(() => {
                    setMessage(`Student ${studentName} has been deleted.`);
                    setStudentName('');
                }, 1000);
            } else {
                setMessage('Please enter a Student Name.');
            }
        }
    };

    const handleInputChange = (event) => {
        setStudentName(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/students');
                const jsonData = await response.json();
                setStudentList(jsonData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Delete Student</h2>
            <div>
                <label>Enter Name: </label>
                <input
                    type="text"
                    value={studentName}
                    onChange={handleInputChange}
                />
            </div>
            <br />
            <button onClick={handleDeleteStudent}>Delete</button>
            <p>{message}</p>
        </div>
    );
}

export default DeleteStudent;
