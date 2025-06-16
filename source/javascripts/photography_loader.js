// source/javascripts/photography_loader.js

document.addEventListener('DOMContentLoaded', () => {
  const galleryContainer = document.getElementById('gallery-container');
  const loadingMessage = document.getElementById('loading-message');

  const cloudName = 'dz6noqzb3';
  const folderNameAsTag = 'portfolio_photography'; // Using folder name as the tag

  // !!! CRITICAL CHANGE TO API URL !!!
  // Now using the 'tag' endpoint, which is designed for client-side listing of resources.
  // This endpoint is generally designed to work with public assets and correct CORS.
  const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/tag/${folderNameAsTag}?max_results=50`;


  // Only proceed if we are on a page that has the #gallery-container element
  if (!galleryContainer) {
    return;
  }

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        console.error('Cloudinary API Error Response:', response);
        throw new Error(`HTTP error! Status: ${response.status}. Failed to load images using the TAG endpoint.
          Please check:
          1. Your 'cloudName' and 'folderNameAsTag' in photography_loader.js are correct.
          2. All your photos in Cloudinary are TAGGED with 'portfolio_photography'.
          3. Your Cloudinary API settings (Resource List UNCHECKED, Allowed Fetch Domains EMPTY).`);
      }
      return response.json();
    })
    .then(data => {
      if (loadingMessage) {
        loadingMessage.remove();
      }

      if (data.resources && data.resources.length > 0) {
        data.resources.forEach(resource => {
          // Construct the image URL. resource.public_id will include the folder name.
          const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_600,c_limit/${resource.public_id}.${resource.format}`;

          const altText = (resource.context && resource.context.alt) ? resource.context.alt : resource.public_id.split('/').pop().replace(/[-_]/g, ' ');
          const captionText = (resource.context && resource.context.caption) ? resource.context.caption : '';

          const colDiv = document.createElement('div');
          colDiv.className = 'col-md-6 col-lg-4 mb-4';
          colDiv.innerHTML = `
            <img src="${imageUrl}" alt="${altText}" class="img-fluid rounded shadow-sm gallery-image">
            ${captionText ? `<p class="image-caption text-center mt-2">${captionText}</p>` : ''}
          `;
          galleryContainer.appendChild(colDiv);
        });
      } else {
        galleryContainer.innerHTML = '<div class="col-12 text-center"><p style="color: #E2F1E7;">No photos found with this tag. Please ensure images are tagged correctly.</p></div>';
      }
    })
    .catch(error => {
      console.error('Error fetching Cloudinary images:', error);
      if (loadingMessage) {
        loadingMessage.remove();
      }
      galleryContainer.innerHTML = '<div class="col-12 text-center"><p style="color: #E2F1E7;">Failed to load photos. Please check your browser console for details and verify Cloudinary setup.</p></div>';
    });
});
