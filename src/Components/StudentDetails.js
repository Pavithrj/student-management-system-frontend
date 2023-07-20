import React, { useEffect } from "react";
import './StudentDetails.css';
import { useNavigate, useParams } from "react-router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import { setStudentDetails } from "../redux/actions/studentsActions";
import { API_BASE_URL } from "../constants";

function StudentDetails() {
  const { rollNo } = useParams();
  const navigate = useNavigate();

  const { studentDetails } = useSelector((state) => state.students);
  const dispatch = useDispatch();

  const GoBack = () => {
    navigate('/');
  }

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/students${rollNo}`);
        if (!response.ok) {
          throw new Error("Failed to fetch student details");
        }
        const jsonData = await response.json();
        dispatch(setStudentDetails(jsonData));
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudentDetails();
  }, [rollNo, dispatch]);

  if (!studentDetails) {
    return <div>Loading...</div>;
  }

  const { name, age } = studentDetails;

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