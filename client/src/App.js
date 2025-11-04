import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Login from './components/Login';
import SearchBar from './components/SearchBar';
import TopSearches from './components/TopSearches';
import ImageGrid from './components/ImageGrid';
import SearchHistory from './components/SearchHistory';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [topSearches, setTopSearches] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/current-user`, {
        withCredentials: true
      });
      setUser(response.data.user);
      if (response.data.user) {
        fetchTopSearches();
        fetchHistory();
      }
    } catch (err) {
      console.error('Not authenticated');
    } finally {
      setLoading(false);
    }
  };

  const fetchTopSearches = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/top-searches`, {
        withCredentials: true
      });
      setTopSearches(response.data);
    } catch (err) {
      console.error('Failed to fetch top searches');
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/history`, {
        withCredentials: true
      });
      setHistory(response.data);
    } catch (err) {
      console.error('Failed to fetch history');
    }
  };

  const handleSearch = async (term) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/search`,
        { term },
        { withCredentials: true }
      );
      setSearchResults(response.data);
      setSelectedImages([]);
      fetchTopSearches();
      fetchHistory();
    } catch (err) {
      console.error('Search failed:', err);
      alert('Search failed. Please try again.');
    }
  };

  const handleImageToggle = (imageId) => {
    setSelectedImages(prev => {
      if (prev.includes(imageId)) {
        return prev.filter(id => id !== imageId);
      } else {
        return [...prev, imageId];
      }
    });
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${API_URL}/auth/logout`, {
        withCredentials: true
      });
      setUser(null);
      setSearchResults(null);
      setSelectedImages([]);
      setTopSearches([]);
      setHistory([]);
    } catch (err) {
      console.error('Logout failed');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return <Login apiUrl={API_URL} />;
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>Image Search App</h1>
        <div className="user-info">
          {user.avatar && <img src={user.avatar} alt={user.name} className="user-avatar" />}
          <span>{user.name}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <main className="main-content">
        <TopSearches searches={topSearches} />
        
        <SearchBar onSearch={handleSearch} />

        {searchResults && (
          <div className="search-results-section">
            <div className="results-header">
              <h2>You searched for "{searchResults.term}" - {searchResults.count} results</h2>
              <div className="selection-counter">
                Selected: {selectedImages.length} images
              </div>
            </div>
            <ImageGrid
              images={searchResults.images}
              selectedImages={selectedImages}
              onImageToggle={handleImageToggle}
            />
          </div>
        )}

        <SearchHistory history={history} onSearchClick={handleSearch} />
      </main>
    </div>
  );
}

export default App;
