import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentDetails from './Components/StudentDetails';
import CreateStudent from './Components/CreateStudent';
import DeleteStudent from './Components/DeleteStudent';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Link to="/read">
            <button>Read</button>
          </Link>
          <Link to="/update">
            <button>Update</button>
          </Link>
        <Link to="/delete">
            <button>Delete</button>
          </Link>*/}
        <Routes>
          <Route path="/" element={<StudentDetails />} />
          <Route path='/create' element={<CreateStudent />} />
          <Route path='/delete' element={<DeleteStudent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;