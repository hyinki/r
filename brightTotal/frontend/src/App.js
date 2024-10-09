import React, { useState } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Tasks from './views/Tasks';
import Tracking from './views/Tracking';
import Enrichment from './views/Enrichment';

import Header from './components/Header';
import Footer from './components/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [userRole, setUserRole] = useState('senior');

  return (
    <div className="App">
      

      <Router>
      <Header userRole={userRole} />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks userRole={userRole} />} />
          <Route path="/tracking" element={<Tracking userRole={userRole} />} />
          <Route path="/enrichment" element={<Enrichment />} />
          

          
        </Routes>
        <Footer/>
      </Router>

    </div>
  );
}

export default App;
