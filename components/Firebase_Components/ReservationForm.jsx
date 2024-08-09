import { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { firebaseApp } from '@/utilities/firebase'; // Adjust the path based on your project structure

const db = getFirestore(firebaseApp);

const ReservationForm = () => {
  const [contact, setContact] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [site, setSite] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await addDoc(collection(db, 'Bookings'), {
            'Contact ': contact, // Ensure the field name matches exactly, including the space
            startDate,
            endDate,
            site
          
      });
      alert('Reservation successful!');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error making reservation.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Contact:</label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Site:</label>
        <input
          type="text"
          value={site}
          onChange={(e) => setSite(e.target.value)}
          required
        />
      </div>
      <button type="submit">Reserve</button>
    </form>
  );
};

export default ReservationForm;
