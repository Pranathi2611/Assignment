import React, { useState } from 'react';
import '../styles/drop-down.css';  // Ensure this path points to your CSS file
import display from '../assets/icons_FEtask/Display.svg';
import down from '../assets/icons_FEtask/down.svg';

function Dropdown({ groupBy, sortBy, onGroupChange, onSortChange }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="dropdown-container">
      {/* Display Button with Filter Icon */}
      <button onClick={toggleDropdown} className="dropdown-button">
        <span className="filter-icon"> {/* Assuming you have a filter icon */}
          <img src={display} alt="Filter" />
        </span>
        Display
        <span className="down-icon"> {/* Assuming you have a filter icon */}
          <img src={down} alt="Filter" />
        </span>
      </button>
      

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="dropdown-menu">
          {/* Dropdown for Group By */}
          <div className="dropdown-section">
            <label>
              Grouping:
              <select value={groupBy} onChange={(e) => onGroupChange(e.target.value)}>
                <option value="status">Status</option>
                <option value="priority">Priority</option>
                <option value="user">User</option>
              </select>
            </label>
          </div>

          {/* Dropdown for Sort By */}
          <div className="dropdown-section">
            <label>
              Sorting:
              <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
