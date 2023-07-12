import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateStudent from './Components/CreateStudent';
import StudentList from './Components/StudentList';
import StudentDetails from './Components/StudentDetails';
import EditStudent from './Components/EditStudent';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/student/:rollNo" element={<StudentDetails />} />
          <Route path='/create' element={<CreateStudent />} />
          <Route path='/edit/:rollNo' element={<EditStudent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;