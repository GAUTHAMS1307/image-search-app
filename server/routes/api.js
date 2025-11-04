const express = require('express');
const axios = require('axios');
const Search = require('../models/Search');
const router = express.Router();

// Middleware to check authentication
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Not authenticated' });
};

// GET /api/top-searches
router.get('/top-searches', isAuthenticated, async (req, res) => {
  try {
    const topSearches = await Search.aggregate([
      {
        $group: {
          _id: '$term',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $project: {
          term: '$_id',
          count: 1,
          _id: 0
        }
      }
    ]);

    res.json(topSearches);
  } catch (err) {
    console.error('Error fetching top searches:', err);
    res.status(500).json({ error: 'Failed to fetch top searches' });
  }
});

// POST /api/search
router.post('/search', isAuthenticated, async (req, res) => {
  try {
    const { term } = req.body;
    
    if (!term || term.trim() === '') {
      return res.status(400).json({ error: 'Search term is required' });
    }

    // Save search to database
    await Search.create({
      userId: req.user._id,
      term: term.trim()
    });

    // Fetch images from Unsplash API
    const unsplashResponse = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: term,
        per_page: 30
      },
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
      }
    });

    const images = unsplashResponse.data.results.map(photo => ({
      id: photo.id,
      url: photo.urls.regular,
      thumb: photo.urls.thumb,
      description: photo.description || photo.alt_description,
      photographer: photo.user.name,
      photographerUrl: photo.user.links.html
    }));

    res.json({
      term,
      count: images.length,
      images
    });
  } catch (err) {
    console.error('Error performing search:', err);
    res.status(500).json({ error: 'Search failed' });
  }
});

// GET /api/history
router.get('/history', isAuthenticated, async (req, res) => {
  try {
    const history = await Search.find({ userId: req.user._id })
      .sort({ timestamp: -1 })
      .limit(20)
      .select('term timestamp -_id');

    res.json(history);
  } catch (err) {
    console.error('Error fetching history:', err);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

module.exports = router;
