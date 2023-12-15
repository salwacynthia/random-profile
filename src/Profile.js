import React from 'react';

const Profile = ({ profile, onDelete, onToggleDetails }) => {
  
  // Check if the profile object and thumbnail property are defined
  const thumbnailUrl = profile?.picture?.thumbnail || ''; // Adjust the property names as needed
  
  return (
    <div className="profile">
      <div className="info-container">
      
      
       {/* Check if the profile object and name property are defined */}
       {profile?.name && (
          <>
            <img alt="profile" src={thumbnailUrl} />
            <p>{`${profile.name.first} ${profile.name.last}`}</p>
          </>
        )}
     
      </div>
      <div className="buttons">
        <button onClick={() => onDelete(profile.id)}>Delete</button>
        <button onClick={() => onToggleDetails(profile.id)}>
          {profile.showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>
      {profile.showDetails && (
        <div className="details">
          <p>Email: {profile.email}</p>
          <p>Gender: {profile.gender}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
