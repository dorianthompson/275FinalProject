import { ProgressBar } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const DetailedAssessmentQuestions = [
  'Imagine you had to teach a class on any subject or skill—what would it be, and what would make you an expert?',
  'If you could develop any new skill or talent – what would it be and how would you use it?',
  'If you could spend all day doing one activity without getting tired, what would it be and why?',
  'If you’re on a sinking ship with one item of your choosing – what would it be and why did you choose that?',
  'If you could have dinner with any professional, who would it be, and what would you ask them?',
  'Describe your ideal workspace. What is there? How does it help you stay in work mode?',
  'If you could be any character in your favorite movie who would it be? Why did you choose that character?'
 ]
 
export function DetailedQuiz() {
  const progress = 40;
    return (
      <Container fluid>
        <h1 style={{textAlign: 'center', paddingTop: '7vh', paddingBottom: '3vh'}}>Detailed Assessment Quiz</h1>
        <h2 style={{textAlign: 'center', fontSize: '25px', paddingBottom: '3vh'}}>This interactive career quiz is designed to help you discover your strengths, interests, and ideal work environment through thoughtful, imaginative questions. By exploring your values, preferences, and aspirations, the quiz offers insights into potential career paths that align with your personality and passions. Whether you're dreaming big or thinking practically, each question helps paint a clearer picture of what careers might be the best fit for you.</h2>
        <ProgressBar now={progress} label={`${progress}%`}/>
        <Row style={{paddingTop: '3vh'}} xs={1} md={2} className="g-4">
      {DetailedAssessmentQuestions.map((question, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Body>
              <Card.Title style={{fontWeight: 'bold'}}>{idx + 1}.</Card.Title>
              <Card.Text>
                {question}
              </Card.Text>
            </Card.Body>
            <Form.Control as="textarea" placeholder="Answer here!" />
            <Button style={{width: '30%', marginLeft: '17vw', marginTop: '1.5vh', marginBottom: '1.5vh'}} type="submit" variant="secondary" size="sm">Submit</Button>
          </Card>
          
        </Col>
      ))}
    </Row>
      </Container>
    );
  }