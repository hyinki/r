import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Attendance from './views/Attendance';
import EventSignup from './views/EventSignup';

function App() {
  return (
    <div className="App">
      <Router>
      
      <Routes>
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/event" element={<EventSignup />} />
         

          
        </Routes>
       
      </Router>
    </div>
  );
}

export default App;
