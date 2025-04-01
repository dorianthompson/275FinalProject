import React, { useState } from 'react';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import { Homepage }  from './Components/Homepage'
import { HomeButton }  from './Components/HomeButton'

function App() {
  return (
    <div className="App">
      <HomeButton></HomeButton>
      <header className="App-header"> 
        <Homepage></Homepage> 
      </header>
            <Form>
      </Form>
    </div>
  );
}

export default App;
