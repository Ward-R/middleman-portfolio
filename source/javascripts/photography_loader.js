// source/javascripts/photography_loader.js

document.addEventListener('DOMContentLoaded', () => {
  const galleryContainer = document.getElementById('gallery-container');
  const loadingMessage = document.getElementById('loading-message');

  // Path to your local image folder relative to Middleman's build root
  const imageFolderPath = '/images/portfolio_photography/';

  // Data is now loaded directly from a global variable set by photography.html.erb
  const data = window.photography_data_local;

  if (!galleryContainer) {
    return;
  }

  if (loadingMessage) {
    loadingMessage.remove();
  }

  if (data && data.resources && data.resources.length > 0) {
    data.resources.forEach(photo => {
      // Construct the image URL using the local path and filename
      const imageUrl = `${imageFolderPath}${photo.filename}`;

      // Use alt and caption directly from the generated data
      const altText = photo.alt;
      const captionText = photo.caption;

      const colDiv = document.createElement('div');
      colDiv.className = 'col-md-6 col-lg-4 mb-4';

      colDiv.innerHTML = `
        <img src="${imageUrl}" alt="${altText}" class="img-fluid rounded shadow-sm gallery-image">
        ${captionText ? `<p class="image-caption text-center mt-2">${captionText}</p>` : ''}
      `;
      galleryContainer.appendChild(colDiv);
    });
  } else {
    galleryContainer.innerHTML = '<div class="col-12 text-center"><p style="color: #E2F1E7;">No photos found in local data. Check source/images/portfolio_photography folder and config.rb.</p></div>';
  }
});
