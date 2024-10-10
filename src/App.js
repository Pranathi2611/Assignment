import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';

function App() {
  const [tickets, setTickets] = useState([]); // State to hold fetched tickets
  const [users, setUsers] = useState([]);     // State for storing user data
  const [error, setError] = useState(null);   // State for error handling

  // Fetch data from API when the component mounts
  useEffect(() => {
    const fetchTicketsAndUsers = async () => {
      try {
        // Fetch tickets and users from the API
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();

        setTickets(data.tickets); // Set the tickets data
        setUsers(data.users);     // Set the users data
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data.');
      }
    };

    fetchTicketsAndUsers();
  }, []);

  return (
    <div className="App">
      {error ? (
        <p>{error}</p>
      ) : (
        Array.isArray(tickets) && tickets.length > 0 && Array.isArray(users) && users.length > 0 ? (
          <KanbanBoard tickets={tickets} users={users} />
        ) : (
          <p>Loading tickets...</p>
        )
      )}
    </div>
  );
}

export default App;
