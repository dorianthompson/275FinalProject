import './App.css';
import { Homepage } from './Components/HomePage/Homepage';
import { Routes, Route } from 'react-router-dom';
import { BasicQuiz } from './Components/BasicQuiz/BasicQuiz';
import { DetailedQuiz } from './Components/DetailedQuiz/DetailedQuiz';
import CareerReport  from './Components/CareerReport/CareerReport';
import NavBar from './Components/NavBar/NavBar';

function App() {
  return (
    <div>
      <NavBar />
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/basic" element={<BasicQuiz />} />
          <Route path="/detailed" element={<DetailedQuiz />} />
          <Route path="/report" element={<CareerReport />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;