// source/javascripts/photography_viewer.js

console.log("Photography Viewer script loading...");

// Define the core initialization function
function initializePhotographyViewer() {
  console.log("Initializing Photography Viewer logic...");

  // Remove existing event listeners to prevent duplicates on re-initialization
  // This is crucial if elements might not be completely replaced by Turbo,
  // or if you want to be safe. For simple button clicks, replacing content
  // often cleans up old listeners, but explicit removal is safer.

  // First, find the elements. These need to be looked up every time.
  const mainPhoto = document.getElementById('main-photo');
  const zoomTrigger = mainPhoto ? mainPhoto.closest('.image-zoom-trigger') : null;
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  // If the elements don't exist (e.g., not on the photography page), exit early
  if (!mainPhoto || !prevBtn || !nextBtn || !zoomTrigger) {
    console.log("Photography viewer elements not found on current page. Skipping initialization.");
    return;
  }

  // Define image paths (these can stay constant)
  const imagePaths = [
    "/images/photography/1-DSCF3844_u4cobo.jpg",
    "/images/photography/2-DSCF3877_azr4zp.jpg",
    "/images/photography/DSCF1783_pijhnq.jpg",
    "/images/photography/DSCF1800_atuuk5.jpg",
    "/images/photography/DSCF3285_w4whqu.jpg",
    "/images/photography/DSCF3335_lxcj81.jpg",
    "/images/photography/DSCF3370_yf9y7c.jpg",
    "/images/photography/DSCF3404_m6tmgg.jpg",
    "/images/photography/DSCF3433_sxau1g.jpg",
    "/images/photography/DSCF3484_siuhpo.jpg",
    "/images/photography/DSCF3518_ivjnsg.jpg",
    "/images/photography/DSCF3525_sc0bmz.jpg",
    "/images/photography/DSCF3640_njxxby.jpg",
    "/images/photography/DSCF3723_r5q2gm.jpg",
    "/images/photography/DSCF3729_enhuzp.jpg",
    "/images/photography/DSCF4111_bru8pq.jpg",
    "/images/photography/DSCF4144_ylobor.jpg",
    "/images/photography/DSCF4183_jxoms9.jpg",
    "/images/photography/DSCF4190_ag4ln2.jpg",
    "/images/photography/DSCF4233_hhkvdu.jpg",
    "/images/photography/DSCF4320_rvduae.jpg",
    "/images/photography/DSCF4456_ldnasq.jpg",
    "/images/photography/DSCF4758_ivrwle.jpg",
    "/images/photography/DSCF4763_wfdqx0.jpg",
    "/images/photography/DSCF4806_bmodjn.jpg",
    "/images/photography/DSCF4998_kxwqtr.jpg",
    "/images/photography/PXL_20240825_024525129-EFFECTS_fliznr.jpg"
  ];

  let currentIndex = 0; // Reset index for each initialization

  // Set the initial image based on the current src, or default to the first
  if (mainPhoto && imagePaths.length > 0) {
    const initialSrc = new URL(mainPhoto.src).pathname;
    const initialIndex = imagePaths.indexOf(initialSrc);
    if (initialIndex !== -1) {
      currentIndex = initialIndex;
    } else {
      currentIndex = 0; // Ensure a valid index
      mainPhoto.src = imagePaths[0];
      console.warn(`Initial image src "${initialSrc}" not found in list or mainPhoto.src is empty. Defaulting to first image.`);
    }
    zoomTrigger.href = imagePaths[currentIndex]; // Always update zoomTrigger href
  } else if (mainPhoto) { // If mainPhoto element exists but has no src
    currentIndex = 0;
    mainPhoto.src = imagePaths[0];
    console.log("main-photo had no initial src. Setting to first image.");
    zoomTrigger.href = imagePaths[currentIndex];
  } else {
    console.error("main-photo element not found.");
    return; // Critical element missing, exit initialization
  }


  // --- Event Listener Setup ---
  // Ensure we don't add duplicate listeners if initializePhotographyViewer is called multiple times
  // Best practice is to remove existing listeners before adding new ones if the elements might persist.
  // However, since Turbo replaces the *contents* of the frame, the old elements and their listeners are removed.
  // So, simply adding them fresh to the *new* elements is usually sufficient.

  // Zoom Trigger Click
  const handleZoomClick = (event) => {
    event.preventDefault();
    zoomTrigger.classList.toggle('is-zoomed');
    document.body.classList.toggle('no-scroll', zoomTrigger.classList.contains('is-zoomed'));
  };
  zoomTrigger.removeEventListener('click', handleZoomClick); // Prevent double-listening
  zoomTrigger.addEventListener('click', handleZoomClick);

  // ESC Key to close zoom
  const handleEscapeKey = (event) => {
    if (event.key === 'Escape' && zoomTrigger.classList.contains('is-zoomed')) {
      zoomTrigger.classList.remove('is-zoomed');
      document.body.classList.remove('no-scroll');
    }
  };
  document.removeEventListener('keydown', handleEscapeKey); // Prevent double-listening
  document.addEventListener('keydown', handleEscapeKey);

  // Function to update the photo display
  function updatePhoto() {
    if (mainPhoto && imagePaths.length > 0) {
      mainPhoto.src = imagePaths[currentIndex];
      zoomTrigger.href = imagePaths[currentIndex];
      // If zoomed, unzoom when changing photos
      if (zoomTrigger.classList.contains('is-zoomed')) {
        zoomTrigger.classList.remove('is-zoomed');
        document.body.classList.remove('no-scroll');
      }
      console.log(`Updated photo to: ${imagePaths[currentIndex]} (Index: ${currentIndex})`);
    } else if (imagePaths.length === 0) {
      console.warn("No image paths defined.");
    }
  }

  // Previous Button Click
  const handlePrevClick = () => {
    currentIndex = (currentIndex === 0) ? imagePaths.length - 1 : currentIndex - 1;
    updatePhoto();
  };
  prevBtn.removeEventListener('click', handlePrevClick); // Prevent double-listening
  prevBtn.addEventListener('click', handlePrevClick);

  // Next Button Click
  const handleNextClick = () => {
    currentIndex = (currentIndex === imagePaths.length - 1) ? 0 : currentIndex + 1;
    updatePhoto();
  };
  nextBtn.removeEventListener('click', handleNextClick); // Prevent double-listening
  nextBtn.addEventListener('click', handleNextClick);

  console.log("Photography Viewer logic initialized.");
}


// 1. Initial page load: Run the initialization function
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOMContentLoaded: Running initial Photography Viewer setup.");
  initializePhotographyViewer();
});

// 2. Turbo Frame Navigation: Re-run the initialization function
// This listener should be on the document, and the `event.target` will be the turbo-frame.
document.addEventListener('turbo:frame-load', (event) => {
  // Check if the loaded frame is the one containing the photography viewer
  if (event.target.id === 'main_content') { // Or whatever your frame ID is
    console.log("turbo:frame-load on main_content detected. Re-initializing Photography Viewer.");
    initializePhotographyViewer();
  }
});

console.log("Photography Viewer script finished setup.");
