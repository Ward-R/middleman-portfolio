// source/javascripts/photography_viewer.js
console.log("Photography Viewer script loading...");

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOMContentLoaded: Initializing Photography Viewer.");

  const mainPhoto = document.getElementById('main-photo');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  // IMPORTANT: Use the EXACT filenames from your source/images/photography/ directory
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

  let currentIndex = 0;

  // Set the initial image based on the current src, or default to the first
  if (mainPhoto && mainPhoto.src) {
    const initialSrc = new URL(mainPhoto.src).pathname;
    const initialIndex = imagePaths.indexOf(initialSrc);
    if (initialIndex !== -1) {
      currentIndex = initialIndex;
    } else {
      // If initial src is not in our list, default to first image
      mainPhoto.src = imagePaths[0];
      console.warn(`Initial image src "${initialSrc}" not found in list. Defaulting to first image.`);
    }
  } else if (mainPhoto) {
    // If mainPhoto exists but has no src, set to the first image
    mainPhoto.src = imagePaths[0];
    console.log("main-photo had no initial src. Setting to first image.");
  } else {
    console.error("main-photo element not found.");
    return; // Exit if the main photo element isn't there
  }

  function updatePhoto() {
    if (mainPhoto && imagePaths.length > 0) {
      mainPhoto.src = imagePaths[currentIndex];
      console.log(`Updated photo to: ${imagePaths[currentIndex]} (Index: ${currentIndex})`);
    } else if (imagePaths.length === 0) {
      console.warn("No image paths defined.");
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex === 0) ? imagePaths.length - 1 : currentIndex - 1;
      updatePhoto();
    });
  } else {
    console.error("Prev button not found.");
  }


  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex === imagePaths.length - 1) ? 0 : currentIndex + 1;
      updatePhoto();
    });
  } else {
    console.error("Next button not found.");
  }

  document.addEventListener('turbo:frame-load', () => {
    console.log("turbo:frame-load detected. Re-initializing Photography Viewer.");
    // No specific re-initialization needed here for simple image swap
    // as buttons are usually outside the frame or their event listeners persist.
    // However, if the main-photo img itself is inside a frame that reloads
    // without a full page refresh, this block helps.
  });

  console.log("Photography Viewer script finished execution.");
});
