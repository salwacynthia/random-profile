// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Profile from './Profile';
import './App.css';

const App = () => {
  const [profiles, setProfiles] = useState([]);
  const [fetchCount, setFetchCount] = useState(1);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(
          `https://randomuser.me/api/?results=${fetchCount}`
        );
        const newProfiles = response.data.results.map((profile, index) => ({
          ...profile,
          id: index + 1,
          showDetails: false,
        }));
        setProfiles(newProfiles);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchProfiles();
  }, [fetchCount]);

  const handleDelete = (id) => {
    setProfiles(profiles.filter((profile) => profile.id !== id));
  };

  const handleToggleDetails = (id) => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((profile) =>
        profile.id === id ? { ...profile, showDetails: !profile.showDetails } : profile
      )
    );
  };

  const handleRenewProfiles = () => {
    setFetchCount(fetchCount + 1);
  };

  return (
    <div className="app">
      <h1>Search Random Profiles</h1>
      <button onClick={handleRenewProfiles}>Add Profile</button>
      {profiles.map((profile) => (
        <Profile
          key={profile.id}
          profile={profile}
          onDelete={handleDelete}
          onToggleDetails={handleToggleDetails}
        />
      ))}
    </div>
  );
};

export default App;
