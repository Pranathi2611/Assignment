import React from "react";
import TicketCard from "./TicketCard"; // Import TicketCard component
import todoIcon from "../assets/icons_FEtask/To-do.svg"; // Example status icons
import inProgressIcon from "../assets/icons_FEtask/in-progress.svg";
import doneIcon from "../assets/icons_FEtask/Done.svg";
import backlogIcon from "../assets/icons_FEtask/Backlog.svg";
import cancelledIcon from "../assets/icons_FEtask/Cancelled.svg";
import lowPriorityIcon from "../assets/icons_FEtask/Img - Low Priority.svg";
import mediumPriorityIcon from "../assets/icons_FEtask/Img - Medium Priority.svg";
import highPriorityIcon from "../assets/icons_FEtask/Img - High Priority.svg";
import urgentPriorityIcon from "../assets/icons_FEtask/SVG - Urgent Priority colour.svg";
import noPriorityIcon from "../assets/icons_FEtask/No-priority.svg";
// import "./kanbanColumn.css";
import '../styles/kanbanColumn.css';


function KanbanColumn({ groupName, tickets, users, groupBy }) {
  // Map group name to corresponding status icons
  const getStatusIcon = (groupName) => {
    switch (groupName.toLowerCase()) {
      case "todo":
        return todoIcon;
      case "in progress":
        return inProgressIcon;
      case "done":
        return doneIcon;
      case "backlog":
        return backlogIcon;
      case "cancelled":
        return cancelledIcon;
      default:
        return null;
    }
  };

  // Function to get priority icon and label based on priority level
  const getPriorityDetails = (priority) => {
    switch (priority) {
      case "4":
        return { icon: urgentPriorityIcon, label: "Urgent" };
      case "3":
        return { icon: highPriorityIcon, label: "High" };
      case "2":
        return { icon: mediumPriorityIcon, label: "Medium" };
      case "1":
        return { icon: lowPriorityIcon, label: "Low" };
      case "0":
      default:
        return { icon: noPriorityIcon, label: "No Priority" };
    }
  };

  const isPriorityGrouping = groupBy === "priority"; // Check if grouping is by priority
  const isUserGrouping = groupBy === "user"; // Check if grouping is by user

  // If grouping by user, find the user details for the current groupName
  const user = isUserGrouping ? users.find((u) => u.name === groupName) : null;

  return (
    <div className="kanban-column">
      <div className="kanban-column-header">
        <div className="kanban-column-left">
          {/* Conditional rendering for priority, status, or user icons */}
          {isPriorityGrouping ? (
            <>
              <img
                src={getPriorityDetails(groupName).icon}
                alt={getPriorityDetails(groupName).label}
                className="status-icon"
              />
              <h2 className="kanban-column-title">
                {getPriorityDetails(groupName).label}
              </h2>
            </>
          ) : isUserGrouping && user ? (
            <>
              
              <div className="user-info">
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/stickers/50/user-male-circle.png"
                alt="user-male-circle"
                className="user-avatar"
              />
              <div
                className={`availability-dot ${user.available ? 'available' : 'unavailable'}`}
              ></div>
            </div>
              <h2 className="kanban-column-title">{user.name}</h2>
              
            </>
          ) : (
            <>
              <img
                src={getStatusIcon(groupName)}
                alt={`${groupName} icon`}
                className="status-icon"
              />
              <h2 className="kanban-column-title">{groupName}</h2>
            </>
          )}
          <span className="ticket-count">({tickets.length})</span>
        </div>

        <div className="kanban-column-right">
          <button className="add-ticket">+</button>
          <button className="more-options">...</button>
        </div>
      </div>

      {/* Render all tickets for the column */}
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          users={users}
          groupBy={groupBy} // Pass the groupBy to the TicketCard
        />
      ))}
    </div>
  );
}

export default KanbanColumn;
