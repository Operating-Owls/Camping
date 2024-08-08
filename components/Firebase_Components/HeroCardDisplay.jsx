import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import DisplayCollection from './displaycollection';
//bootstrap hero card, Planned to put Booking.campsite in for looking through sites
function HeroCard() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://via.placeholder.com/150" />
      <Card.Body>
        <Card.Title>{Bookings.campsite}</Card.Title>
        <Card.Text>
          {Bookings.description}
        </Card.Text>
        <Button variant="primary">Next Campsite</Button>
      </Card.Body>
    </Card>
  );
}

export default HeroCard;
