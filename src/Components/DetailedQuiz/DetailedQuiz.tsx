import { ProgressBar } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { ChangeEvent, useState } from "react";
import { Modal } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";

const DetailedAssessmentQuestions = [
  'Imagine you had to teach a class on any subject or skill—what would it be, and what would make you an expert?',
  'If you could develop any new skill or talent – what would it be and how would you use it?',
  'If you could spend all day doing one activity without getting tired, what would it be and why?',
  'If you’re on a sinking ship with one item of your choosing – what would it be and why did you choose that?',
  'If you could have dinner with any professional, who would it be, and what would you ask them?',
  'Describe your ideal workspace. What is there? How does it help you stay in work mode?',
  'If you could be any character in your favorite movie who would it be? Why did you choose that character?'
];

let seenSet = new Set();

export function DetailedQuiz() {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [result, setResult] = useState<string>("");
  const [show, setShow] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0)

  const handleClose = () => setShow(false);
  
  const navigate = useNavigate();
 
  const handleChange = (idx: number, event: ChangeEvent<any>) => {
    const value = event.target.value;
    setAnswers(prev => ({ ...prev, [idx]: value }));
    if(seenSet.has(idx)){
      if(value.length < 10){
        seenSet.delete(idx)
        setProgress(Math.floor((seenSet.size / DetailedAssessmentQuestions.length) * 100));
      }
    } else {
      if(value.length >= 10){
        seenSet.add(idx)
        setProgress(Math.floor((seenSet.size / DetailedAssessmentQuestions.length) * 100));
      }
    }

    
  };
 
 
  const formatPrompt = () => {
    let prompt = "Here are my responses to a detailed career assessment:\n\n";
    DetailedAssessmentQuestions.forEach((q, i) => {
      const a = answers[i] || "No answer provided";
      prompt += `Q${i + 1}: ${q}\nA: ${a}\n\n`;
    });
    prompt += `Based on these answers, suggest 3 specific career paths.

For each career path, provide:
- Title
- A brief description (2-4 sentences max)
- Estimated salary range (in USD)
- A match percentage (0–100%)

Return the results as a JSON array sorted by match percentage (descending).
Return the results as a JSON array like this:
[
  {
    "title": "Software Engineer",
    "description": "...",
    "salary_range": "$80,000 - $120,000",
    "match_percentage": 90
  }
]

Important: Do NOT include markdown code block syntax like triple backticks. Just return raw JSON text.`;
    return prompt;
  };
 
 
  const handleSubmit = async () => {
    setIsLoading(true)
    const key = JSON.parse(localStorage.getItem("MYKEY") || '""');
    if (!key) {
      alert("API Key not found. Please enter it on the homepage.");
      return;
    }
 
 
    const prompt = formatPrompt();
 
 
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a career advisor." },
            { role: "user", content: prompt }
          ]
        })
      });
 
 
      const data = await response.json();
 
      setIsLoading(false);
      if (!response.ok) {
        console.error("API response error:", data);
        setResult("API Error: " + (data.error?.message || response.statusText));
        return;
      }
 
  
      setResult(data.choices?.[0]?.message?.content || "No career suggestion generated.");
      navigate('/report', {state: {data}});
    } catch (error) {
      setIsLoading(false);
      console.error("Fetch error:", error);
      setResult("An error occurred. Please try again later.");
    }

    
  };
 
 
 
  return (
    <Container fluid >

      <Modal  show={show} onHide={handleClose} backdrop="static">
        <Modal.Header style={{ backgroundColor: '#00539F', color: '#FFD200'}}closeButton>
          <Modal.Title>Welcome to Our Detailed Career Assessment!</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#00539F', color: '#FFD200'}}>This interactive career quiz is designed to help you discover your strengths, interests, and ideal work environment through thoughtful, imaginative questions.</Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#00539F', color: '#FFD200'}}>
          <Button style={{backgroundColor: '#FFD200', color: '#00539F'}} variant="secondary" onClick={handleClose}>
            Lets Get Started!
          </Button>
        </Modal.Footer>
      </Modal>
      <h1 style={{color: '#00539F'}} className="text-center mt-5 mb-3">Detailed Assessment Quiz</h1>
      <div className="sticky-progress neu-progress-container">
  <ProgressBar 
    now={progress} 
    label={`${progress}%`} 
    variant="primary" 
    animated 
    striped 
    className="neu-progress-bar"
  />
</div>
 
      <Row xs={1} md={2} className="g-4">
        {DetailedAssessmentQuestions.map((question, idx) => (
          <Col key={idx}>
            <Card className="card" style={{backgroundColor: '#FFD200', color: '#00539F'}}>
              <Card.Body>
                <Card.Title style={{ fontWeight: 'bold' }}>{idx + 1}.</Card.Title>
                <Card.Text>{question}</Card.Text>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Answer here!"
                  value={answers[idx]}
                  onChange={(e) => handleChange(idx, e)}
                  isValid={seenSet.has(idx) && answers[idx].length >= 10}
                  isInvalid={(answers[idx] !== undefined) && answers[idx].length <= 10}
                />
                <Form.Control.Feedback type="invalid" tooltip>
        10 Character Minimum!
      </Form.Control.Feedback>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
 
 
      <div className="text-center mt-4">
        {!isLoading ? <Button
          onClick={handleSubmit}
          variant="primary"
          size="lg"
          disabled={Object.keys(answers).length !== DetailedAssessmentQuestions.length}
        >
          Get Career Suggestion
        </Button>: <Button variant="primary" disabled>
         <Spinner
           as="span"
           animation="border"
           size="sm"
           role="status"
           aria-hidden="true"
         />
         <span className="visually-hidden">Loading...</span>
       </Button>}
      </div>
 
 
      {result && (
        <div className="mt-4 p-3 border rounded bg-light">
          <h3>Your Suggested Career:</h3>
          <p>{result}</p>
        </div>
      )}
    </Container>
  );
 }
 