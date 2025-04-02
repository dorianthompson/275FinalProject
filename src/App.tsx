//import React, {useState} from 'react';
import './App.css';
//import { Button, Form } from 'react-bootstrap';
import { Homepage }  from './Components/Homepage'
import { HomeButton }  from './Components/HomeButton'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BasicQuiz } from './Components/BasicQuiz';
import { DetailedQuiz } from './Components/DetailedQuiz';


 //local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
 //let keyData = "";
 //const saveKeyData = "MYKEY";
 //const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
 /*if (prevKey !== null) {
   keyData = JSON.parse(prevKey);
 } */

function App() {
  //const [key, setKey] = useState<string>(keyData); //for api key input
 
   //sets the local storage item to the api key the user inputed
   /*function handleSubmit() {
     localStorage.setItem(saveKeyData, JSON.stringify(key));
     window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
   } */
 
   //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
   /*function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
     setKey(event.target.value);
   } */
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

      </div>
    </Router>
  );
}

export default App;

