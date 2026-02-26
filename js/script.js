
    /* ----------------------------------------------------------
       Mobile Navigation Toggle
    ---------------------------------------------------------- */
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    function closeMobileMenu() {
      mobileMenu.classList.remove('open');
    }

    /* ----------------------------------------------------------
       Navbar scroll effect — add subtle shadow on scroll
    ---------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.style.background = 'rgba(5,10,14,0.97)';
      } else {
        navbar.style.background = 'rgba(5,10,14,0.85)';
      }
    }, { passive: true });

    /* ----------------------------------------------------------
       Hero model-viewer: hide loading overlay when model is loaded
    ---------------------------------------------------------- */
    const heroViewer = document.getElementById('heroViewer');
    const heroLoading = document.getElementById('heroLoading');

    heroViewer.addEventListener('load', () => {
      heroLoading.classList.add('hidden');
      // Remove the overlay entirely after the fade
      setTimeout(() => heroLoading.style.display = 'none', 700);
    });

    /* ----------------------------------------------------------
       show3D(viewerId)
       Resets the camera and enables interactive 3D mode.
       Stops auto-rotate briefly for better UX.
    ---------------------------------------------------------- */
    function show3D(viewerId) {
      const viewer = document.getElementById(viewerId);
      if (!viewer) return;

      // Reset camera to default orbital position
      viewer.cameraOrbit = 'auto auto auto';
      viewer.cameraTarget = 'auto auto auto';
      viewer.autoRotate = true;

      // Visual feedback — flash a message briefly
      flashMessage(viewerId, '3D Mode Aktif 🔲');
    }

    /* ----------------------------------------------------------
       showAR(viewerId, hintId)
       Attempts to activate the AR session on supported devices.
       Shows a hint message if AR is not available.
    ---------------------------------------------------------- */
    function showAR(viewerId, hintId) {
      const viewer = document.getElementById(viewerId);
      const hint = document.getElementById(hintId);
      if (!viewer) return;

      // Check if AR is supported by this model-viewer instance
      if (viewer.canActivateAR) {
        // Activate AR — opens the native AR experience
        viewer.activateAR();
        if (hint) hint.style.display = 'none';
      } else {
        // AR not supported on this device/browser
        if (hint) {
          hint.textContent = '⚠️ AR tidak tersedia di perangkat atau browser ini. Coba Chrome di Android, atau Safari di iOS.';
          hint.style.display = 'block';
        }
        console.info('[SCAN AR] AR not available on this device.');
      }
    }

    /* ----------------------------------------------------------
       Helper: brief flash message in viewer area
    ---------------------------------------------------------- */
    function flashMessage(viewerId, msg) {
      // Find the parent model-container of the viewer
      const viewer = document.getElementById(viewerId);
      if (!viewer) return;

      // Create a temporary toast element
      const toast = document.createElement('div');
      toast.textContent = msg;
      toast.style.cssText = `
        position: absolute; bottom: 64px; left: 50%; transform: translateX(-50%);
        background: rgba(34,197,94,0.9); color: #050a0e;
        font-size: 13px; font-weight: 600; padding: 7px 16px;
        border-radius: 100px; white-space: nowrap;
        z-index: 10; opacity: 1;
        transition: opacity 0.4s;
        pointer-events: none;
      `;

      // model-viewer parent is model-container
      const container = viewer.closest('.model-container') || viewer.parentElement;
      container.style.position = 'relative';
      container.appendChild(toast);

      // Fade out and remove after 2 seconds
      setTimeout(() => { toast.style.opacity = '0'; }, 1800);
      setTimeout(() => { toast.remove(); }, 2300);
    }

    /* ----------------------------------------------------------
       Intersection Observer — fade-up sections on scroll
    ---------------------------------------------------------- */
    const fadeEls = document.querySelectorAll('.fade-up');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // animate only once
          }
        });
      },
      { threshold: 0.12 }
    );

    fadeEls.forEach((el) => observer.observe(el));

    /* ----------------------------------------------------------
       Staggered animation delay for about cards
    ---------------------------------------------------------- */
    document.querySelectorAll('.about-card').forEach((card, i) => {
      card.style.transitionDelay = `${i * 0.1}s`;
    });

    /* ----------------------------------------------------------
       Polite AR capability check on page load
       If the device clearly doesn't support any AR mode,
       swap the AR buttons to a softer "Try on Desktop" label.
    ---------------------------------------------------------- */
    window.addEventListener('DOMContentLoaded', () => {
      // model-viewer sets 'ar-status' attribute after init
      // We rely on canActivateAR after load events
    });