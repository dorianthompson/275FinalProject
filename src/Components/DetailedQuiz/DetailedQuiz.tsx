import { ProgressBar } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { ChangeEvent, useState } from "react";

const DAQ = [
  'Imagine you had to teach a class on any subject or skill—what would it be, and what would make you an expert?',
  'If you could develop any new skill or talent – what would it be and how would you use it?',
  'If you could spend all day doing one activity without getting tired, what would it be and why?',
  'If you’re on a sinking ship with one item of your choosing – what would it be and why did you choose that?',
  'If you could have dinner with any professional, who would it be, and what would you ask them?',
  'Describe your ideal workspace. What is there? How does it help you stay in work mode?',
  'If you could be any character in your favorite movie who would it be? Why did you choose that character?'
 ]

 /*interface DAQ_Name {
   q1: string
   q2: string
   q3: string
   q4: string
   q5: string
   q6: string
   q7: string
 }*/

 /*let detailedDictionary = new Map<number, string>();

 const initialDetailedState = {}
 DetailedAssessmentQuestions.map((_,idx:number) =>{
  initialDetailedState`Q${idx+1}` = ""
 })*/   
 
 //const var_array = ["q1", "q2", "q3","q4", "q5", "q6","q7", "q8"];
 const submittedQuestions = new Set<number>([]);
 
export function DetailedQuiz() {
  const [assessmentData, setAssessmentData] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ])
  //const progress = 40;
  const [progress, setProgress] = useState<number>(0);
  
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAssessmentData((prev) => {
     let temp:string[] = [...prev];
     let id = event.target.id;
     temp[Number(id)] = event.target.value;

     return temp;
    })
  }

    const handleSubmit = ((id:number) =>{
      if(!submittedQuestions.has(id) ){
        submittedQuestions.add(id);
        setProgress(Math.floor((submittedQuestions.size / DAQ.length) * 100));
      }
    })
  /*const handleChangeSubmit= (idx: number, answer: string) => {
    detailedDictionary.set(idx + 1, answer);
    setProgress(Math.ceil((detailedDictionary.size / DetailedAssessmentQuestions.length)*100))
   }*/
  
    return (
      <Container fluid>
        <h1 style={{textAlign: 'center', paddingTop: '7vh', paddingBottom: '3vh'}}>Detailed Assessment Quiz</h1>
        <h2 style={{textAlign: 'center', fontSize: '25px', paddingBottom: '3vh'}}>This interactive career quiz is designed to help you discover your strengths, interests, and ideal work environment through thoughtful, imaginative questions. By exploring your values, preferences, and aspirations, the quiz offers insights into potential career paths that align with your personality and passions. Whether you're dreaming big or thinking practically, each question helps paint a clearer picture of what careers might be the best fit for you.</h2>
        <ProgressBar now={progress} label={`${progress}%`}/>

        <Row style={{paddingTop: '3vh'}} xs={1} md={2} className="g-4">
        <Col key={0}>
          <Card>
            <Card.Body>
              <Card.Title style={{fontWeight: 'bold'}}>{1}.</Card.Title>
              <Card.Text>
                {DAQ[0]}
              </Card.Text>
            </Card.Body>
            <Form.Control id={"0"} name={"0"}type="text"  value={assessmentData[0]} onChange={handleChange} as="textarea" placeholder="Answer here!" />
            <Button onClick={() => handleSubmit(0)} style={{width: '30%', marginLeft: '17vw', marginTop: '1.5vh', marginBottom: '1.5vh'}} type="submit" variant="secondary" size="sm">Submit</Button>
          </Card>
        </Col>

        <Col key={1}>
          <Card>
            <Card.Body>
              <Card.Title style={{fontWeight: 'bold'}}>{2}.</Card.Title>
              <Card.Text>
                {DAQ[1]}
              </Card.Text>
            </Card.Body>
            <Form.Control id={"1"} name={"1"}type="text"  value={assessmentData[1]} onChange={handleChange} as="textarea" placeholder="Answer here!" />
            <Button onClick={() => handleSubmit(1)} style={{width: '30%', marginLeft: '17vw', marginTop: '1.5vh', marginBottom: '1.5vh'}} type="submit" variant="secondary" size="sm">Submit</Button>
          </Card>
        </Col>
        </Row>

        <Row style={{paddingTop: '3vh'}} xs={1} md={2} className="g-4">
        <Col key={2}>
          <Card>
            <Card.Body>
              <Card.Title style={{fontWeight: 'bold'}}>{3}.</Card.Title>
              <Card.Text>
                {DAQ[2]}
              </Card.Text>
            </Card.Body>
            <Form.Control id={"2"} name={"2"}type="text"  value={assessmentData[2]} onChange={handleChange} as="textarea" placeholder="Answer here!" />
            <Button onClick={() => handleSubmit(2)} style={{width: '30%', marginLeft: '17vw', marginTop: '1.5vh', marginBottom: '1.5vh'}} type="submit" variant="secondary" size="sm">Submit</Button>
          </Card>
        </Col>

        <Col key={3}>
          <Card>
            <Card.Body>
              <Card.Title style={{fontWeight: 'bold'}}>{4}.</Card.Title>
              <Card.Text>
                {DAQ[3]}
              </Card.Text>
            </Card.Body>
            <Form.Control id={"3"} name={"3"}type="text"  value={assessmentData[3]} onChange={handleChange} as="textarea" placeholder="Answer here!" />
            <Button onClick={() => handleSubmit(3)} style={{width: '30%', marginLeft: '17vw', marginTop: '1.5vh', marginBottom: '1.5vh'}} type="submit" variant="secondary" size="sm">Submit</Button>
          </Card>
        </Col>
        </Row>

        <Row style={{paddingTop: '3vh'}} xs={1} md={2} className="g-4">
        <Col key={4}>
          <Card>
            <Card.Body>
              <Card.Title style={{fontWeight: 'bold'}}>{5}.</Card.Title>
              <Card.Text>
                {DAQ[4]}
              </Card.Text>
            </Card.Body>
            <Form.Control id={"4"} name={"4"}type="text"  value={assessmentData[4]} onChange={handleChange} as="textarea" placeholder="Answer here!" />
            <Button onClick={() => handleSubmit(4)} style={{width: '30%', marginLeft: '17vw', marginTop: '1.5vh', marginBottom: '1.5vh'}} type="submit" variant="secondary" size="sm">Submit</Button>
          </Card>
        </Col>

        <Col key={5}>
          <Card>
            <Card.Body>
              <Card.Title style={{fontWeight: 'bold'}}>{6}.</Card.Title>
              <Card.Text>
                {DAQ[5]}
              </Card.Text>
            </Card.Body>
            <Form.Control id={"5"} name={"5"}type="text"  value={assessmentData[5]} onChange={handleChange} as="textarea" placeholder="Answer here!" />
            <Button onClick={() => handleSubmit(5)} style={{width: '30%', marginLeft: '17vw', marginTop: '1.5vh', marginBottom: '1.5vh'}} type="submit" variant="secondary" size="sm">Submit</Button>
          </Card>
        </Col>
        </Row>
        <Row style={{paddingTop: '3vh'}} xs={1} md={2} className="g-4">
        <Col key={6}>
          <Card>
            <Card.Body>
              <Card.Title style={{fontWeight: 'bold'}}>{7}.</Card.Title>
              <Card.Text>
                {DAQ[6]}
              </Card.Text>
            </Card.Body>
            <Form.Control id={"6"} name={"6"}type="text"  value={assessmentData[6]} onChange={handleChange} as="textarea" placeholder="Answer here!" />
            <Button onClick={() => handleSubmit(6)} style={{width: '30%', marginLeft: '17vw', marginTop: '1.5vh', marginBottom: '1.5vh'}} type="submit" variant="secondary" size="sm">Submit</Button>
          </Card>
        </Col>
        </Row>
      </Container>
    );
  }