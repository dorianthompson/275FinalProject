import React, { useState } from 'react';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import { Homepage }  from './Components/Homepage'
import { HomeButton }  from './Components/HomeButton'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BasicQuiz } from './Components/BasicQuiz';
import { DetailedQuiz } from './Components/DetailedQuiz';
function App() {
  return (
    <Router>
      <div className="App">
        <HomeButton />
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/basic" element={<BasicQuiz />} />
            <Route path="/detailed" element={<DetailedQuiz />} />
          </Routes>
        </header>
        <Form>{/* Your form content */}</Form>
      </div>
    </Router>
  );
}

export default App;

