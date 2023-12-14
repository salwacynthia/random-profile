// Profile.js
import React from 'react';

const Profile = ({ profile, onDelete, onToggleDetails }) => {
  return (
    <div className="profile">
      <div className="info-container">
        <img src={profile.picture.thumbnail} alt="profile" />
        <p>{`${profile.name.first} ${profile.name.last}`}</p>
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
