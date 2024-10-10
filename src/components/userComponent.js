import React from 'react';
import './TicketCard'; // Assuming CSS is stored separately

const UserAvatar = ({ user }) => {
  if (!user) {
    return <p>Assigned to: Unknown User</p>;
  }

  return (
    <div className="user-info">
      <img
        width="50"
        height="50"
        src={user.avatar || "https://img.icons8.com/stickers/50/user-male-circle.png"}
        alt={user.name || "User"}
        className="user-avatar"
      />
      <div
        className={`availability-dot ${user.available ? 'available' : 'unavailable'}`}
      ></div>
    </div>
  );
};

export default UserAvatar;
