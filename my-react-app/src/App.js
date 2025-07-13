import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Feed from './views/Feed';
import Header from './components/Header';
import About from './views/About';


function App() {
  return (
    <div className="App">
      
      
      <Router>
        <Header/>
       
      <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/about" element={<About />} />
         

          
        </Routes>
       
      </Router>
      
    </div>
  );
}

export default App;
