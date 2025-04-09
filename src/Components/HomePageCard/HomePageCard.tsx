import Card from 'react-bootstrap/Card';
import './HomePageCard.css'
import { Container } from 'react-bootstrap';
interface HomePageCardProps {
    title: string
    shortTitle: string
    description: string
    link: string
}

export default function HomePageCard({ title, description, link, shortTitle}: HomePageCardProps) {
  return (
    <Container className='hpc-container'>
      <Card >
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <Card.Link href={link}>{shortTitle}</Card.Link>
      </Card.Body>
    </Card>
    </Container>
  )
}
