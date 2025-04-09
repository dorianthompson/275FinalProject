import './App.css';
import { Homepage } from './Components/HomePage/Homepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BasicQuiz } from './Components/BasicQuiz/BasicQuiz';
import { DetailedQuiz } from './Components/DetailedQuiz/DetailedQuiz';

import NavBar from './Components/NavBar/NavBar';

function App() {
  return (
    <div>
    <Router>
    <div >
      <NavBar/>
      
        <header className='App-header'>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/basic" element={<BasicQuiz />} />
            <Route path="/detailed" element={<DetailedQuiz />} />
          </Routes>
          </header>
        </div>
       
    </Router>
    </div>
   
  );
  
}

export default App;

