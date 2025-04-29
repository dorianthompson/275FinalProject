import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // ✅ import useNavigate
import './HomePageCard.css';

// ✅ interface looks perfect
interface HomePageCardProps {
  title: string;
  shortTitle: string;
  description: string;
  link: string;
}

export default function HomePageCard({ title, description, link, shortTitle }: HomePageCardProps) {
  const navigate = useNavigate(); // ✅ create navigate function

  function handleClick() {
    navigate(link); // ✅ when the button is clicked, navigate to the link
  }

  return (
    <Container className='hpc-container'>
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {description}
          </Card.Text>
          <Button variant="primary" size="lg" onClick={handleClick}>
            {shortTitle}
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}