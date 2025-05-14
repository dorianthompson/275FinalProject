import { ProgressBar, Container, Card, Col, Row, Form, Button } from "react-bootstrap";
import { useState } from "react";
import './BasicQuiz.css'
import { Modal } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";

const BasicAssessmentQuestions = [
  'I thrive in a quiet work environment.',
  'I thrive when working in a group.',
  'I prefer a sedentary work style.',
  'I enjoy talking to new people every day.',
  'I enjoy maths and sciences.',
  'I am very interested in creative outlets like film, art, literature, music, etc.',
  'I enjoy looking after children or taking care of people.'
];

const BasicMultipleChoiceQuestions = [
  'Not at all like me',
  'Not much like me',
  'Neutral',
  'Somewhat like me',
  'Very much like me'
];

export function BasicQuiz() {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [progress, setProgress] = useState<number>(0);
  const [result, setResult] = useState<string>("");
  const [show, setShow] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClose = () => setShow(false);

  const navigate = useNavigate();
  
  const handleClick = (idx: number, choice: string) => {
    setAnswers(prev => {
      const updated = { ...prev, [idx]: choice };
      setProgress(Math.floor((Object.keys(updated).length / BasicAssessmentQuestions.length) * 100));
      return updated;
    });
  };

  const formatPrompt = () => {
    let prompt = "Here are my answers to a basic career assessment:\n\n";
    Object.entries(answers).forEach(([idx, ans]) => {
      const i = Number(idx);
      const question = BasicAssessmentQuestions[i];
      prompt += `Q${i + 1}: ${question}\nA: ${ans}\n\n`;
    });
    prompt += `Based on these answers, suggest 6 specific career paths.

For each career path, provide:
- Title
- A brief description (1-2 sentences max)
- Estimated salary range (in USD)
- A match percentage (0–100%)
- Education
- Similar Careers (3-4 options max)

Return the results as a JSON array sorted by match percentage (descending).
Return the results as a JSON array like this:
[
  {
    "title": "Software Engineer",
    "description": "...",
    "salary_range": "$80,000 - $120,000",
    "match_percentage": 90,
    "education": "...",
    "similar_careers": "..."

  }
]

Important: Do NOT include markdown code block syntax like triple backticks. Just return raw JSON text.`;
    return prompt;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
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

      setIsLoading(false);
      if (!response.ok) {
        const error = await response.json();
        console.error("API response error:", error);
        setResult("API Error: " + (error.error?.message || response.statusText));
        return;
      }

      const data = await response.json();

      if (data?.choices?.[0]?.message?.content) {
        setResult(data.choices[0].message.content);
      } else {
        setResult("Unexpected response structure from API.");
      }

      navigate('/report', {state: {data: data}});

    } catch (error) {
      setIsLoading(false);
      console.error("Fetch error:", error);
      setResult("An error occurred. Please try again later.");
    }

    
  };

  return (
    <Container fluid>
      <h1 style={{color: '#00539F'}}className="text-center mt-4">Basic Career Assessment</h1>
      <br></br>
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

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header style={{ backgroundColor: '#00539F', color: '#FFD200'}} closeButton>
          <Modal.Title>Welcome to Our Basic Career Assessment!</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#00539F', color: '#FFD200'}}>Our Basic Career Assessment asks the user questions surrounding different work situations and gives them 5 options to best describe how they feel in each scenario. Questions like these allow us to get some basic knowledge about the user so we can start forming results on fields the user may best be suited to work in. Please select the answer for each question that best fits your personal interest or working style.</Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#00539F', color: '#FFD200'}}>
          <Button style={{backgroundColor: '#FFD200', color: '#00539F'}} variant="secondary" onClick={handleClose}>
            Lets Get Started!
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="basic-quiz-container">
      <Row xs={1} md={2} className="g-4">
        {BasicAssessmentQuestions.map((question, idx) => (
          <Col key={idx}>
            <Card  className="card" style={{backgroundColor: '#FFD200', color: '#00539F'}}>
              <Card.Body>
                <Card.Title>{idx + 1}.</Card.Title>
                <Card.Text>{question}</Card.Text>
                <Form>
                  {BasicMultipleChoiceQuestions.map(choice => (
                    <Form.Check
                      key={choice}
                      type="radio"
                      name={`question-${idx}`}
                      label={choice}
                      id={`${idx}-${choice}`}
                      checked={answers[idx] === choice}
                      onChange={() => handleClick(idx, choice)}
                    />
                  ))}
                </Form>
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
          disabled={Object.keys(answers).length !== BasicAssessmentQuestions.length}
        >
          Get Career Suggestion
        </Button> : <Button variant="primary" disabled>
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
      </div>
    </Container>
  );
}
