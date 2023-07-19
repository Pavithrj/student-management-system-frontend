import React, { useEffect, useState } from "react";
import './StudentDetails.css';
import { useNavigate, useParams } from "react-router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function StudentDetails() {
  const [student, setStudent] = useState({});
  const { rollNo } = useParams();
  const navigate = useNavigate();

  const GoBack = () => {
    navigate('/');
  }

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/students/${rollNo}`);
        if (!response.ok) {
          throw new Error("Failed to fetch student details");
        }
        const jsonData = await response.json();
        setStudent(jsonData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudentDetails();
  }, [rollNo]);

  if (!student) {
    return <div>Loading...</div>;
  }

  const { name, age } = student;

  return (
    <div>
      <h1 data-testid="student-details">Student Details:</h1>
      <div className="student-details-table-header">
        <div>Name</div>
        <div>Age</div>
        <div>RollNo</div>
      </div>
      <div className="student-details-table-content">
        <div data-testid="name">{name}</div>
        <div data-testid="age">{age}</div>
        <div data-testid="rollNo">{rollNo}</div>
      </div>
      <div>
        <button data-testid="student-details-go-back-btn" onClick={GoBack}><ArrowBackIcon /></button>
      </div>
    </div>
  );
}

export default StudentDetails;