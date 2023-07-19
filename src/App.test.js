import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import CreateStudent from './Components/CreateStudent';
import StudentList from './Components/StudentList';
import StudentDetails from './Components/StudentDetails';
import EditStudent from './Components/EditStudent';

test('renders student list', () => {
  render(
    <Router>
      <Routes>
        <Route path="/" element={<StudentList />} />
      </Routes>
    </Router>
  );
  const studentListElement = screen.getByText('Students List:');

  expect(studentListElement).toBeInTheDocument();
});

test('renders create student form', () => {
  render(
    <Router>
      <Routes>
        <Route path="/create" element={<CreateStudent />} />
      </Routes>
    </Router>
  );
  const createStudentFormElement = screen.getByText('Create Student:');

  expect(createStudentFormElement).toBeInTheDocument();
});

test('renders student details', () => {
  const rollNo = '123';
  render(
    <Router>
      <Routes>
        <Route path={`/student/${rollNo}`} element={<StudentDetails />} />
      </Routes>
    </Router>
  );
  const studentDetailsElement = screen.getByText(`Student Details: ${rollNo}`);

  expect(studentDetailsElement).toBeInTheDocument();
});

test('renders edit student form', () => {
  const rollNo = '123';
  render(
    <Router>
      <Routes>
        <Route path={`/edit/${rollNo}`} element={<EditStudent />} />
      </Routes>
    </Router>
  );
  const editStudentFormElement = screen.getByText(`Edit Student: ${rollNo}`);
  console.log("editStudentFormElement:::", editStudentFormElement);

  expect(editStudentFormElement).toBeInTheDocument();
});
