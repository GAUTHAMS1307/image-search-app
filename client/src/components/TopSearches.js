import React from 'react';
import './TopSearches.css';

function TopSearches({ searches }) {
  if (!searches || searches.length === 0) {
    return null;
  }

  return (
    <div className="top-searches-banner">
      <h3>🔥 Top Searches:</h3>
      <div className="top-searches-list">
        {searches.map((search, index) => (
          <span key={index} className="top-search-item">
            {search.term} ({search.count})
          </span>
        ))}
      </div>
    </div>
  );
}

export default TopSearches;
