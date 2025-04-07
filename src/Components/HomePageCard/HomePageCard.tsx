import Card from 'react-bootstrap/Card';
import './HomePageCard.css'
interface HomePageCardProps {
    title: string
    shortTitle: string
    description: string
    link: string
}

export default function HomePageCard({ title, description, link, shortTitle}: HomePageCardProps) {
  return (
    <div className='hpc-container'>
      <Card style={{ width: '18rem', height: '21rem', fontSize: '20px' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <Card.Link href={link}>{shortTitle}</Card.Link>
      </Card.Body>
    </Card>
    </div>
  )
}
