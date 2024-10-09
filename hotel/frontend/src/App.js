import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import SignUp from './views/SignUp';
import Header from './components/Header';
import Footer from './components/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import AddHotel from './views/AddHotel';
import BrowseHotels from './views/BrowseHotels';
import MyHotel from './views/MyHotel';
import Test from './views/test';
import Test2 from './views/test2';



function App() {
  return (
    <div className="App">
      

      <Router>
        <Header/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<Test />} />
          <Route path="/test2" element={<Test2 />} />

          <Route path="/add-hotel" element={<AddHotel />} />
          <Route path="/hotels" element={<BrowseHotels />} />
          <Route path="/myhotel" element={<MyHotel />} />

          
        </Routes>
        <Footer/>
      </Router>

    </div>
  );
}

export default App;
