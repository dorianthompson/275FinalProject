import { ProgressBar } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { ChangeEvent, useState } from "react";

const DetailedAssessmentQuestions = [
  'Imagine you had to teach a class on any subject or skill—what would it be, and what would make you an expert?',
  'If you could develop any new skill or talent – what would it be and how would you use it?',
  'If you could spend all day doing one activity without getting tired, what would it be and why?',
  'If you’re on a sinking ship with one item of your choosing – what would it be and why did you choose that?',
  'If you could have dinner with any professional, who would it be, and what would you ask them?',
  'Describe your ideal workspace. What is there? How does it help you stay in work mode?',
  'If you could be any character in your favorite movie who would it be? Why did you choose that character?'
];

export function DetailedQuiz() {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [result, setResult] = useState<string>("");
 
 
  const handleChange = (idx: number, event: ChangeEvent<any>) => {
    const value = event.target.value;
    setAnswers(prev => ({ ...prev, [idx]: value }));
  };
 
 
  const formatPrompt = () => {
    let prompt = "Here are my responses to a detailed career assessment:\n\n";
    DetailedAssessmentQuestions.forEach((q, i) => {
      const a = answers[i] || "No answer provided";
      prompt += `Q${i + 1}: ${q}\nA: ${a}\n\n`;
    });
    prompt += "Based on these answers, suggest 2-3 specific careers that align with the person's interests and personality.";
    return prompt;
  };
 
 
  const handleSubmit = async () => {
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
 
 
      if (!response.ok) {
        console.error("API response error:", data);
        setResult("API Error: " + (data.error?.message || response.statusText));
        return;
      }
 
 
      setResult(data.choices?.[0]?.message?.content || "No career suggestion generated.");
    } catch (error) {
      console.error("Fetch error:", error);
      setResult("An error occurred. Please try again later.");
    }
  };
 
 
  const progress = Math.floor((Object.keys(answers).length / DetailedAssessmentQuestions.length) * 100);
 
 
  return (
    <Container fluid>
      <h1 className="text-center mt-5 mb-3">Detailed Assessment Quiz</h1>
      <h2 className="text-center fs-5 mb-4">
        This interactive career quiz is designed to help you discover your strengths, interests, and ideal work environment through thoughtful, imaginative questions.
      </h2>
      <ProgressBar now={progress} label={`${progress}%`} className="mb-4" />
 
 
      <Row xs={1} md={2} className="g-4">
        {DetailedAssessmentQuestions.map((question, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Body>
                <Card.Title style={{ fontWeight: 'bold' }}>{idx + 1}.</Card.Title>
                <Card.Text>{question}</Card.Text>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Answer here!"
                  value={answers[idx] || ""}
                  onChange={(e) => handleChange(idx, e)}
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
 
 
      <div className="text-center mt-4">
        <Button
          onClick={handleSubmit}
          variant="primary"
          disabled={Object.keys(answers).length !== DetailedAssessmentQuestions.length}
        >
          Get Career Suggestion
        </Button>
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
 