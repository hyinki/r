import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Feed from './views/Feed';
import Header from './components/Header';


function App() {
  return (
    <div className="App">
      

      <Router>
        <Header/>
       
      <Routes>
          <Route path="/" element={<Feed />} />
         

          
        </Routes>
       
      </Router>
    </div>
  );
}

export default App;
