import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Profile from './Profile';
import './App.css';

const App = () => {
  const [profiles, setProfiles] = useState([]);
  const [loadingAllowed, setLoadingAllowed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const profilesPerPage = 5;
  const profilesToShow = 5;

  // const fetchProfile = async () => {
  //   try {
  //     const response = await axios.get('https://randomuser.me/api/');
  //     const newProfile = {
  //       ...response.data.results[0],
  //       id: profiles.length + 1,
  //       showDetails: false,
  //     };
  //     setProfiles((prevProfiles) => [...prevProfiles, newProfile]);
  //   } catch (error) {
  //     console.error('Error fetching profile:', error);
  //   }
  // };


  const fetchProfile = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api/');
      const newProfile = {
        ...response.data.results[0],
        id: profiles.length + 1,
        showDetails: false,
      };
      setProfiles((prevProfiles) => [...prevProfiles, newProfile]);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoadingAllowed(false);
    }
  };
  

  useEffect(() => {
    if (loadingAllowed) {
      fetchProfile();
    }
  }, [loadingAllowed]);

  const handleDelete = (id) => {
    setProfiles((prevProfiles) => {
       return prevProfiles.filter((profile) => profile.id !== id);
    })
  };

  const handleToggleDetails = (id) => {
    setProfiles((prevProfiles) =>
    prevProfiles.map((profile) =>
      profile.id === id
        ? { ...profile, showDetails: !profile.showDetails }
        : profile
    )
  );
  };

  const handleRenewProfiles = () => {
    setLoadingAllowed(true);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = profiles.slice(indexOfFirstProfile, indexOfLastProfile);

  return (
    <div className="app">
      <h1>Search Random Profiles</h1>
      <button onClick={handleRenewProfiles}>Add Profile</button>

      {currentProfiles.map((profile) => (
        <Profile
          key={profile.id}
          profile={profile}
          onDelete={handleDelete}
          onToggleDetails={handleToggleDetails}
        />
      ))}

      {profiles.length > profilesToShow && (
        <div className="pagination">
          {Array.from({ length: Math.ceil(profiles.length / profilesPerPage) }, (_, index) => (
            <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
