import React from 'react';
import lowPriorityIcon from '../assets/icons_FEtask/Img - Low Priority.svg';
import mediumPriorityIcon from '../assets/icons_FEtask/Img - Medium Priority.svg';
import highPriorityIcon from '../assets/icons_FEtask/Img - High Priority.svg';
import urgentPriorityIcon from '../assets/icons_FEtask/SVG - Urgent Priority colour.svg';
import noPriorityIcon from '../assets/icons_FEtask/No-priority.svg';

import todoIcon from '../assets/icons_FEtask/To-do.svg'; // Example status icons
import inProgressIcon from '../assets/icons_FEtask/in-progress.svg';
import doneIcon from '../assets/icons_FEtask/Done.svg';
import backlogIcon from '../assets/icons_FEtask/Backlog.svg';
import '../styles/Ticketcard.css';
import UserAvatar from './userComponent';


function TicketCard({ ticket, users, groupBy }) {
  // Function to get the priority icon based on the ticket's priority level
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 0:
        return noPriorityIcon;
      case 1:
        return lowPriorityIcon;
      case 2:
        return mediumPriorityIcon;
      case 3:
        return highPriorityIcon;
      case 4:
        return urgentPriorityIcon;
      default:
        return null;
    }
  };

  // Function to get the status icon based on the ticket's status
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'todo':
        return todoIcon;
      case 'in progress':
        return inProgressIcon;
      case 'done':
        return doneIcon;
      case 'backlog':
        return backlogIcon;
      default:
        return null;
    }
  };

  // Use `find()` to locate the user by their userId
  const user = users.find((u) => u.id === ticket.userId);

  return (
    <div className="ticket-card" style={{ display: 'flex' }}>
      <div style={{ display: 'block' ,width:'100%'}}>
        <div className="ticket-card-header">
          <div style={{ display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
          }}>
          <h5 className="ticket-id">{ticket.id}</h5>
          {groupBy !== 'user' && <UserAvatar user={user} />}
          </div>
          <div style={{ display: 'flex',justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '100%'}}>
            {/* Conditionally show status icon beside the title if groupBy is 'priority' or 'user' */}
            {(groupBy === 'priority' || groupBy === 'user') && (
              <img 
              
                src={getStatusIcon(ticket.status)} 
                alt="status" 
                className="status-icon" 
                style={{ width: '15px', height: '15px', marginTop:'11px'}}
              />
            )}
            <h5 className="ticket-title">{ticket.title}</h5>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <img
            src={getPriorityIcon(ticket.priority)}
            alt={`Priority ${ticket.priority}`}
            className="priority-icon"
          />
          <p style={{ margin:'0',padding:'4px',fontSize: '12px', marginLeft: '10px', color: 'grey' }}>
  Feature Request
</p>
        </div>
      </div>
      {/* Only show the user info in the card if grouping is not by 'user' */}
      {groupBy !== 'user' && (
        <div className="ticket-card-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        </div>
      )}
    </div>
  );
}

export default TicketCard;
