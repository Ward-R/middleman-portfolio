// source/javascripts/carousel.js
console.log("Carousel script starting to load (absolute first line)...");

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded fired. Carousel script executing.");

    const carouselContainer = document.getElementById('carousel-container');
    const carouselInner = document.getElementById('carousel-inner');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slides = document.querySelectorAll('.carousel-slide'); // Get all individual slide wrappers

    let currentIndex = 0;
    const totalSlides = slides.length;

    // *** NEW CRITICAL CHANGE: Calculate slideWidth based on carouselInner's total scrollWidth ***
    let slideWidth;

    // Use a function to get slideWidth, ensuring it's available after layout
    function calculateSlideWidth() {
        if (totalSlides === 0) return 0; // Avoid division by zero
        // carouselInner.scrollWidth is the total content width (all slides side-by-side)
        slideWidth = carouselInner.scrollWidth / totalSlides;
        console.log(`Calculated slideWidth from inner.scrollWidth: ${slideWidth}px`);
        return slideWidth;
    }

    // Recalculate on window resize (important for responsiveness)
    window.addEventListener('resize', () => {
        calculateSlideWidth();
        updateCarousel(); // Update carousel position after resize
    });

    // Initial calculation
    calculateSlideWidth();

    function updateCarousel() {
        if (slideWidth === 0) { // Safety check
            console.warn("slideWidth is 0, cannot translate carousel.");
            return;
        }
        carouselInner.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
        console.log(`Translating by: ${-currentIndex * slideWidth}px (Current Index: ${currentIndex})`);
    }

    // Initialize the carousel position
    updateCarousel();

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
        updateCarousel();
    });

    console.log("Carousel initialized.");
    console.log("Total slides:", totalSlides);
    console.log("Initial slideWidth calculated:", slideWidth);
});
