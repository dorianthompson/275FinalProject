import { ProgressBar } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

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
 
 
export function BasicQuiz() {
    const progress = 40;
    
     
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
        <div key={choice} className="mb-3">
          <Form.Check // prettier-ignore
            style={{fontSize: '20px', marginLeft: '25px'}}
            id={choice}
            label={choice}
            type="radio"
            name="radio"
          />
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