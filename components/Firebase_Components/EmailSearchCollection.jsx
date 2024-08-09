import React, { useState } from 'react';
import { db } from '@/utilities/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

//Use this to look for any entry in your firebase collection

const EmailSearchAndCollection = () => {
  const [email, setEmail] = useState('');
  const [collectionData, setCollectionData] = useState([]);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSearch = async () => {
    try {
      console.log('Searching for email:', email); 

      //edit contact and Bookings if your firebase differs
      const q = query(collection(db, 'Bookings'), where('Contact ', '==', email));
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        console.log('Document found:', doc.data()); 
        data.push({ 
          id: doc.id, 
          startDate: doc.data()['startDate'], 
          endDate: doc.data()['endDate'] 
        });
      });
      setCollectionData(data);
      
      console.log('Data fetched:', data); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <div>
        <input 
          type="text"
          placeholder="Enter email address"
          value={email}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {collectionData.length > 0 ? (
        <ul>
          {collectionData.map((booking) => (
            <li key={booking.id}>
              <p><strong>Start Date:</strong> {booking.startDate}</p>
              <p><strong>End Date:</strong> {booking.endDate}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reservations found.</p>
      )}
    </div>
  );
};

export default EmailSearchAndCollection;
