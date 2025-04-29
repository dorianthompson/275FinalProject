import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import './HomePageCard.css';


interface HomePageCardProps {
  title: string;
  shortTitle: string;
  description: string;
  link: string;
}

export default function HomePageCard({ title, description, link, shortTitle }: HomePageCardProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  function handleClick() {
    navigate(link);
  }

  return (
    <Container className='hpc-container'>
      <Card style={{backgroundColor: '#00539F', color: '#FFD200'}}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {description}
          </Card.Text>
          <Button className={`element-hpc ${isHovered ? 'element-hpc-hover' : ''}`}
           onMouseEnter={() => setIsHovered(true)}
           onMouseLeave={() => setIsHovered(false)} variant="primary" size="lg"onClick={handleClick}>{shortTitle}</Button> 
        </Card.Body>
      </Card>
    </Container>
  );
}