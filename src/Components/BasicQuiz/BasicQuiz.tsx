import { ProgressBar, Container, Card, Col, Row, Form, Button } from "react-bootstrap";
import { useState } from "react";

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
    prompt += "Based on these answers, suggest suitable career paths.";
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

    } catch (error) {
      console.error("Fetch error:", error);
      setResult("An error occurred. Please try again later.");
    }
  };

  return (
    <Container fluid>
      <h1 className="text-center mt-4">Basic Career Assessment</h1>
      <ProgressBar now={progress} label={`${progress}%`} className="mb-4" />
      <Row xs={1} md={2} className="g-4">
        {BasicAssessmentQuestions.map((question, idx) => (
          <Col key={idx}>
            <Card>
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
        <Button 
          onClick={handleSubmit} 
          variant="primary"
          disabled={Object.keys(answers).length !== BasicAssessmentQuestions.length}
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
