import React, { useState, useEffect } from 'react';
import KanbanColumn from './KanbanColumn';
import Dropdown from './Dropdown';

function KanbanBoard({ tickets, users }) {
  // Initialize state from localStorage or fallback to defaults
  const [groupBy, setGroupBy] = useState(() => {
    const savedGroupBy = localStorage.getItem('groupBy');
    return savedGroupBy ? savedGroupBy : 'status';  // Default to 'status' if nothing is found
  });

  const [sortBy, setSortBy] = useState(() => {
    const savedSortBy = localStorage.getItem('sortBy');
    return savedSortBy ? savedSortBy : 'priority';  // Default to 'priority' if nothing is found
  });

  // Save the current groupBy and sortBy to localStorage when they change
  useEffect(() => {
    if (groupBy) {
      localStorage.setItem('groupBy', groupBy);
    }
  }, [groupBy]);

  useEffect(() => {
    if (sortBy) {
      localStorage.setItem('sortBy', sortBy);
    }
  }, [sortBy]);

  useEffect(() => {
    console.log("Users:", users); // Log users to see its structure
  }, [users]);
  

  // Handle dropdown change for grouping
  const handleGroupChange = (newGroup) => {
    setGroupBy(newGroup);
  };

  // Handle dropdown change for sorting
  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  // Group tickets based on grouping option (status, priority, userId)
  const groupTickets = (tickets, groupBy) => {
  if (!Array.isArray(tickets)) return {};

  return tickets.reduce((acc, ticket) => {
    let key;
    if (groupBy === 'user') {
      // First, check if users is an array
      if (Array.isArray(users)) {
        // Map userId to the user object from the users array
        const user = users.find(u => u.id === ticket.userId);
        // const user = users[ticket.userId]; // Directly access the user from users object

        key = user ? user.name : 'Unknown User'; // Fallback to 'Unknown User' if no match
      } else {
        console.error("Users is not an array:", users); // Log an error if users is not an array
        key = 'Unknown User';
      }
    } else {
      key = ticket[groupBy] || 'No Group';
    }

    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(ticket);
    return acc;
  }, {});
};


  // Sort tickets based on sorting option (priority or title)
  const sortTickets = (tickets, sortBy) => {
    return tickets.sort((a, b) => {
      if (sortBy === 'priority') {
        return b.priority - a.priority; // Higher priority first
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title); // Alphabetical order
      }
      return 0;
    });
  };

  // Group and sort the tickets
  const groupedTickets = groupTickets(tickets, groupBy);

  // Iterate through grouped tickets and sort each group
  const sortedGroupedTickets = Object.keys(groupedTickets).reduce((acc, group) => {
    acc[group] = sortTickets([...groupedTickets[group]], sortBy); // Spread to avoid mutating original array
    return acc;
  }, {});

  return (
    <div>
      {/* Top bar with dropdown */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
        <Dropdown
          groupBy={groupBy}
          sortBy={sortBy}
          onGroupChange={handleGroupChange}
          onSortChange={handleSortChange}
        />
      </div>
  
      {/* Kanban board below the dropdown */}
      <div className="kanban-board">
        {Object.keys(sortedGroupedTickets).length === 0 ? (
          <p>No tickets available</p> // Show message when there are no tickets
        ) : (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            {Object.keys(sortedGroupedTickets).map((group) => (
              <KanbanColumn
                key={group}
                groupName={group}
                tickets={sortedGroupedTickets[group]}
                users={users} // Pass users data to KanbanColumn
                groupBy={groupBy}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
  
}

export default KanbanBoard;
