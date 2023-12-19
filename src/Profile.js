import React from 'react';

const Profile = ({ profile, onDelete, onToggleDetails }) => {
  
  const thumbnailUrl = profile?.picture?.thumbnail || ''; 
  
  return (
    <div className="profile">
      <div className="list">
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


      <div className="details">
        {profile.showDetails && (
          <div >
            <p>Gender: {profile.gender}</p>
            <p>Email: {profile.email}</p>
            <p>Phone: {profile.phone}</p>
            {profile.location && (
              <p>
                Address: {profile.location.street.number} {profile.location.street.name}, {profile.location.city},{' '}
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
