import React from 'react';

const Profile = ({ profile, onDelete, onToggleDetails }) => {
  
  // Check if the profile object and thumbnail property are defined
  const thumbnailUrl = profile?.picture?.thumbnail || ''; // Adjust the property names as needed
  
  return (
    <div className="profile">
      <div>
      <div className="info-container">
      
      
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

      </div>

      <div>
      

      {profile.showDetails && (
        <div className="details">
         
          <p>Gender: {profile.gender}</p>
          <p>Email: {profile.email}</p>
          <p>Phone: {profile.phone}</p>
          {profile.location && (
            <p>
              Location: {profile.location.street.number} {profile.location.street.name}, {profile.location.city},{' '}
              {profile.location.state}, {profile.location.country} {profile.location.postcode}
            </p>
          )}

        </div>
      )}
    </div>
    </div>
  );
};

export default Profile;
