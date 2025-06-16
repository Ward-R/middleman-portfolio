// source/javascripts/photography_loader.js

document.addEventListener('DOMContentLoaded', () => {
  const galleryContainer = document.getElementById('gallery-container');
  const loadingMessage = document.getElementById('loading-message');

  // !!! IMPORTANT: CONFIRM THESE VALUES ARE CORRECT FOR YOUR ACCOUNT !!!
  const cloudName = 'dz6noqzb3'; // Your Cloudinary Cloud Name
  const folderName = 'portfolio_photography'; // Your exact Cloudinary folder name

  // Cloudinary API endpoint to list resources (images) in a specific folder.
  // max_results=50: Fetches up to 50 images. Adjust if you have more or less.
  // We are NOT including an API key in the URL, as Resource List Access should now be public for your folder.
  const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?type=upload&prefix=${folderName}/&max_results=50`;

  // Only proceed if we are on a page that has the #gallery-container element
  if (!galleryContainer) {
    return;
  }

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        // Log details about the error for easier debugging
        console.error('Cloudinary API Error Response:', response);
        throw new Error(`HTTP error! Status: ${response.status}. Could not load images from Cloudinary.
          Please double-check:
          1. Your 'cloudName' and 'folderName' in photography_loader.js are correct.
          2. 'Resource list' is UNCHECKED under 'Restricted image types' in Cloudinary Settings > Security.`);
      }
      return response.json();
    })
    .then(data => {
      // Remove the loading message once data is fetched
      if (loadingMessage) {
        loadingMessage.remove();
      }

      if (data.resources && data.resources.length > 0) {
        // Iterate over each image resource returned by Cloudinary
        data.resources.forEach(resource => {
          // Construct the image URL with Cloudinary transformations for optimization
          // f_auto: automatically select best format (e.g., WebP)
          // q_auto: automatically select best quality
          // w_600: set width to 600px (adjust this size for your gallery layout)
          // c_limit: ensures image fits within bounds without cropping, maintains aspect ratio
          const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_600,c_limit/${resource.public_id}.${resource.format}`;

          // Attempt to get alt text and caption from Cloudinary's context metadata.
          // (You can add this metadata to your images in Cloudinary's Media Library when uploading or editing.)
          const altText = (resource.context && resource.context.alt) ? resource.context.alt : resource.public_id.split('/').pop().replace(/[-_]/g, ' ');
          const captionText = (resource.context && resource.context.caption) ? resource.context.caption : '';

          // Create the Bootstrap column div for each image
          const colDiv = document.createElement('div');
          colDiv.className = 'col-md-6 col-lg-4 mb-4'; // Responsive grid: 2 per row on medium, 3 on large screens

          // Populate the column div with the image and its caption
          colDiv.innerHTML = `
            <img src="${imageUrl}" alt="${altText}" class="img-fluid rounded shadow-sm gallery-image">
            ${captionText ? `<p class="image-caption text-center mt-2">${captionText}</p>` : ''}
          `;
          galleryContainer.appendChild(colDiv); // Add the image to the gallery container
        });
      } else {
        // Display a message if no photos are found
        galleryContainer.innerHTML = '<div class="col-12 text-center"><p style="color: #E2F1E7;">No photos found in this folder. Please double-check the folder name in your JavaScript and Cloudinary settings.</p></div>';
      }
    })
    .catch(error => {
      // Handle any errors during the fetch process
      console.error('Error fetching Cloudinary images:', error);
      if (loadingMessage) {
        loadingMessage.remove();
      }
      galleryContainer.innerHTML = '<div class="col-12 text-center"><p style="color: #E2F1E7;">Failed to load photos. Please check your browser console for details and verify your Cloudinary setup.</p></div>';
    });
});
