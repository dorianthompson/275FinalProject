//import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import HomePageCard from '../HomePageCard/HomePageCard';
import './HomePage.css'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { Form, Button } from 'react-bootstrap';


//Anderson
export function Homepage() {
  //const navigate = useNavigate();

  /*const handleBasicQuizClick = () => {
    navigate('/basic');
  };

  const handleDetailedQuizClick = () => {
    navigate('/detailed');
  };*/

  const basicAssesmentDescription = "Our Basic Career Assessment asks the user questions surrounding different work situations and gives them 5 options to best describe how they feel in each scenario."
  const detailedAssessmentDescription = "This interactive career quiz is designed to help you discover your strengths, interests, and ideal work environment through thoughtful, imaginative questions."

   //local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
 let keyData = "";
 const saveKeyData = "MYKEY";
 const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
 if (prevKey !== null) {
   keyData = JSON.parse(prevKey);
 }

  const [key, setKey] = useState<string>(keyData); //for api key input
 
  //sets the local storage item to the api key the user inputed
  const handleSubmit = async () => {
      setIsClicked(!isClicked);
      localStorage.setItem(saveKeyData, JSON.stringify(key));
      window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
    
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  const [isClicked, setIsClicked] = useState(false);
 
  return (<div>
{/*<video src={require('../../assets/CareerQuizVideo.mp4')} autoPlay loop muted/>*/}
  
    <Container fluid>
      {/*<img
      src = "data:image/png;base64,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"
      alt="pic"
      />
<p>
          Personal Career Quiz
        </p> 
      
      <button onClick={handleBasicQuizClick} className="btn btn-primary">
        Basic Quiz
      </button>

      <button onClick={handleDetailedQuizClick} className="btn btn-secondary ml-2">
        Detailed Quiz
  </button>*/}
  
  <h1 style={{color: '#00539F' ,textAlign: 'center', paddingBottom: '15vh'}}>Career Assessments</h1>
  <Row xs={1} md={2} className="g-4">
  <Col>
  <HomePageCard title='Basic Career Assessment' shortTitle='Basic' link='/basic' description={detailedAssessmentDescription}/>
  </Col>
  <Col>
  <HomePageCard title='Detailed Career Assessment' shortTitle='Detailed' link='/detailed' description={basicAssesmentDescription}/>
  </Col>
  </Row>

  <Form style={{display: 'flex', flexDirection:'column',justifyContent: 'center', gap: '15px', alignItems: 'center'}}>
             <Form.Label style={{color: '#00539F'}}>API Key:</Form.Label>
             <Form.Control style ={{width:'60%'}} type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
          <Button size="lg"className="Submit-Button" onClick={handleSubmit} style={{marginRight: '2vw'}}>Submit</Button>
       </Form>
       
    </Container>
    </div>
  );
}