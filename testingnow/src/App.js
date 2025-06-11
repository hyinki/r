
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Attendance from './views/Attendance';
import EventSignup from './views/EventSignup';

function App() {
  return (
    <div className="App">
      
       <h1>hello</h1>

       
      
      <Routes>
          <Route path="/attendance" element={<Attendance />} /> 
          <Route path="/event" element={<EventSignup />} />
         

          
        </Routes>
       
      
      
    </div>
  );
}

export default App;
