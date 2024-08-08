import React, { useEffect, useState } from 'react';
import { db } from '@/firebase_setup/firebase';
import { collection, getDocs } from 'firebase/firestore';

const DisplayCollection = () => {
  const [campsites, setCampsites] = useState([]);
//looks in collecton for the table Campsites
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Campsites'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCampsites(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
//return caplsite.item 
  return (
    <div>
      {campsites.map(campsite => (
        <div key={campsite.id}>
          <h3>{campsite.name}</h3>
          <p>{campsite.description}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayCollection;
