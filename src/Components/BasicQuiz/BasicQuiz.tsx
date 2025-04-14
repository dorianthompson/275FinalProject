import { ProgressBar } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { useState } from "react";

const BasicAssessmentQuestions = [
  'I thrive in a quiet work environment.',
  'I thrive when working in a group.',
  'I prefer a sedentary work style.',
  'I enjoy talking to new people every day.',
  'I enjoy maths and sciences.',
  'I am very interested in creative outlets like film, art, literature, music, etc.',
  'I enjoy looking after children or taking care of people.'
 ]

 const BasicMultipleChoiceQuestions =[
  'Not at all like me',
  'Not much like me',
  'Neutral',
  'Somewhat like me',
  'Very much like me'
 ]
 
 //make sure you can only check one
 //how to store data...dictionary key = idx, value which is checked
 //setProgess needs to check if that question has been selected if not then update the  progress to show completion
 
 const checkedSet = new Set<number>([]);
export function BasicQuiz() {
    const [progress, setProgress] = useState<number>(0);

    const handleClick = ((id:number) =>{
      if(!checkedSet.has(id) ){
        checkedSet.add(id);
        setProgress(Math.floor((checkedSet.size / BasicAssessmentQuestions.length) * 100));
      }
    })
    
     
    return (
      <Container fluid>
        <h1 style={{textAlign: 'center', paddingTop: '7vh', paddingBottom: '3vh'}}>Basic Assessment Quiz</h1>
        <h2 style={{textAlign: 'center', fontSize: '25px', paddingBottom: '3vh'}}>Our Basic Career Assessment asks the user questions surrounding different work situations and gives them 5 options to best describe how they feel in each scenario. Questions like these allow us to get some basic knowledge about the user so we can start forming results on fields the user may best be suited to work in. Please select the answer for each question that best fits your personal interest or working style.</h2>
        <ProgressBar now={progress} label={`${progress}%`}/>
        <Row style={{paddingTop: '3vh'}} xs={1} md={2} className="g-4">
      {BasicAssessmentQuestions.map((question, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Body>
              <Card.Title style={{fontWeight: 'bold'}}>{idx + 1}.</Card.Title>
              <Card.Text>
                {question}
              </Card.Text>
            </Card.Body>
            <Form>
      {BasicMultipleChoiceQuestions.map((choice) => (
        <div  style={{display: 'flex'}}key={choice} className="mb-3">
          
          <Form.Check // prettier-ignore
            style={{fontSize: '20px', marginLeft: '25px'}}
            id={choice}
            type="radio"
            name={`radio_${question}`}
            onClick={() => {
              handleClick(idx+1)}}
          />
          <Form.Label style={{fontSize: '20px', marginLeft: '25px'}}>{choice}</Form.Label>
        </div>
      ))}
    </Form>
          </Card>
        </Col>
      ))}
    </Row>
      </Container>
    );
  }