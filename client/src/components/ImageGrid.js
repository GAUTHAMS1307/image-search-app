import React from 'react';
import './ImageGrid.css';

function ImageGrid({ images, selectedImages, onImageToggle }) {
  return (
    <div className="image-grid">
      {images.map((image) => (
        <div key={image.id} className="image-card">
          <div 
            className={`image-wrapper ${selectedImages.includes(image.id) ? 'selected' : ''}`}
            onClick={() => onImageToggle(image.id)}
          >
            <img src={image.thumb} alt={image.description || 'Unsplash image'} />
            <div className="image-overlay">
              <input
                type="checkbox"
                checked={selectedImages.includes(image.id)}
                onChange={() => onImageToggle(image.id)}
                className="image-checkbox"
              />
            </div>
          </div>
          <div className="image-info">
            <small>
              Photo by <a href={image.photographerUrl} target="_blank" rel="noopener noreferrer">
                {image.photographer}
              </a>
            </small>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImageGrid;
