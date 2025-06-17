// Listen for Turbo Frame loads across the entire document
// This is to collapse the hamburger on mobile
document.addEventListener('turbo:frame-load', (event) => {
  // Check if the loaded frame is your main content frame
  // This ensures we only run this logic when the main content area changes
  if (event.target.id === 'main_content') {
    console.log("turbo:frame-load on main_content detected. Attempting to close navbar.");

    // Select the navbar toggler button
    const navbarToggler = document.querySelector('.navbar-toggler');

    // Select the collapsible navbar content
    const navbarCollapse = document.getElementById('navbarNav'); // Assuming this is your navbar's ID

    if (navbarToggler && navbarCollapse) {
      // Check if the navbar is currently open (Bootstrap adds/removes 'collapsed' class)
      const isNavbarOpen = navbarToggler.classList.contains('collapsed') === false;

      if (isNavbarOpen) {
        // Use Bootstrap's native JS method to hide the collapse
        // This relies on Bootstrap's JS being loaded before this script runs.
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: false // Don't toggle, just hide
        });
        bsCollapse.hide();

        // Also ensure the toggler button's state is updated for accessibility and visual consistency
        navbarToggler.classList.add('collapsed');
        navbarToggler.setAttribute('aria-expanded', 'false');
      }
    }
  }
});

// global site-wide JavaScript here
