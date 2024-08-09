import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { db } from '@/utilities/firebase';
import { collection, getDocs } from 'firebase/firestore';

//use bootstrapto get a hero card and pass in the firebase data

function BasicExample() {
  const [bookings, setBookings] = useState([]);
  const [currentBookingIndex, setCurrentBookingIndex] = useState(0);

  useEffect(() => {
    const fetchBookings = async () => {
      const querySnapshot = await getDocs(collection(db, 'Campsites'));
      const bookingsList = querySnapshot.docs.map(doc => doc.data());
      setBookings(bookingsList);
    };

    fetchBookings();
  }, []);

  const handleNextCampsite = () => {
    setCurrentBookingIndex((prevIndex) => (prevIndex + 1) % bookings.length);
  };

  if (bookings.length === 0) {
    return <div>Loading...</div>;
  }

  const currentBooking = bookings[currentBookingIndex];

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={currentBooking.image} alt={currentBooking.campsite} />
      <Card.Body>
        <Card.Title>{currentBooking.name}</Card.Title>
        <Card.Text>
          {currentBooking.description}
        </Card.Text>
        <Button variant="primary" onClick={handleNextCampsite}>Next Campsite</Button>
      </Card.Body>
    </Card>
  );
}

export default BasicExample;
