import React, { useState } from 'react';
import { db } from '@/firebase_setup/firebase'; // Adjust the path based on your project structure
import { collection, query, where, getDocs } from 'firebase/firestore';
//as long as firebase config file is set up and you are connected to intenet we can search for a resevation booking through Contact: email 
const EmailSearchCollection = () => {
  const [email, setEmail] = useState('');
  const [collectionData, setCollectionData] = useState([]);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const q = query(collection(db, 'Bookings'), where('Contact ', '==', email));
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setCollectionData(data);
      
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
 //input displayed on (html)
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
      <ul>
      {collectionData.map((booking) => (
  <li key={booking.id}>{booking}</li>

        ))}
      </ul>
    </div>
    //return the table where the email is correct. Need to put in an error catch or no res found

  );
};

export default EmailSearchCollection;
