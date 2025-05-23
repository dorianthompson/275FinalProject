import { useLocation } from 'react-router-dom';
import { Container, Card,Col } from 'react-bootstrap';
import './CareerReport.css';
import Accordion from 'react-bootstrap/Accordion';


function CareerReport() {
  const { state } = useLocation();
  let raw = state.data.choices[0]?.message?.content || '';
  raw = raw.trim();
  if (raw.startsWith('```')) {
    raw = raw.replace(/^```[a-z]*\n?/, '').replace(/```$/, '');
  }

  let results: any[] = [];
  try {
    results = JSON.parse(raw);
  } catch (err) {
    return (
      <Container className="mt-5">
        <h2>Could not parse results</h2>
        <pre>{raw}</pre>
      </Container>
    );
  }

//<Card.Text className="salary">💰 {career.salary_range}</Card.Text>
  

  

  return (
    <Container className="report-container mt-5">
      <h1 className="text-center mb-4">Your Career Results Are In!</h1>
        {results.map((career, index) => (
          <Col key={index}>
            <Card className="career-card">
              <Card.Body>
              <h2 style={{}}className="d-flex justify-content-between align-items-center">{career.title}<span className="match-score">{career.match_percentage}% match</span></h2>
              
                <Accordion alwaysOpen={true}>
                  <Accordion.Item eventKey={String(index)}>
                    <Accordion.Header className="d-flex justify-content-between align-items-center">
                      Career Description
                    </Accordion.Header>
                    <Accordion.Body>
                      {career.description}
                    </Accordion.Body>
                  </Accordion.Item>
                  </Accordion>

                <Accordion alwaysOpen={true}>
                  <Accordion.Item eventKey={String(index)}>
                    <Accordion.Header>
                      Salary Range
                    </Accordion.Header>
                    <Accordion.Body className='salary'>
                    💰{career.salary_range}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Accordion alwaysOpen={true}>
                  <Accordion.Item eventKey={String(index)}>
                    <Accordion.Header>
                      Education
                    </Accordion.Header>
                    <Accordion.Body className='salary'>
                    {career.education}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Accordion alwaysOpen={true}>
                  <Accordion.Item eventKey={String(index)}>
                    <Accordion.Header>
                      Similar Careers
                    </Accordion.Header>
                    <Accordion.Body className='salary'>
                    {career.similar_careers}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>

            </Card>
          </Col>
      
       
        ))}
    </Container>
  );
}

export default CareerReport;