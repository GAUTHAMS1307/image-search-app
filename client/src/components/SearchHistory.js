import React from 'react';
import './SearchHistory.css';

function SearchHistory({ history, onSearchClick }) {
  if (!history || history.length === 0) {
    return null;
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="search-history">
      <h3>Your Search History</h3>
      <div className="history-list">
        {history.map((item, index) => (
          <div key={index} className="history-item">
            <span 
              className="history-term"
              onClick={() => onSearchClick(item.term)}
            >
              {item.term}
            </span>
            <span className="history-timestamp">
              {formatDate(item.timestamp)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchHistory;
