 const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function closeMenu(){
    navLinks.classList.remove('open');
    navOverlay.classList.remove('open');
    menuToggle.setAttribute('aria-expanded','false');
    menuToggle.textContent = '☰';
  }
  function openMenu(){
    navLinks.classList.add('open');
    navOverlay.classList.add('open');
    menuToggle.setAttribute('aria-expanded','true');
    menuToggle.textContent = '✕';
  }
  menuToggle.addEventListener('click', () => {
    navLinks.classList.contains('open') ? closeMenu() : openMenu();
  });
  navOverlay.addEventListener('click', closeMenu);
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if(window.innerWidth > 900) closeMenu(); });

  // Typing headline effect
  const headlineEl = document.getElementById('typedHeadline');
  const headlineText = "LET'S MAKE YOUR CONTENT UNFORGETTABLE";
  let charIndex = 0;
  function typeHeadline(){
    if(charIndex <= headlineText.length){
      headlineEl.textContent = headlineText.slice(0, charIndex);
      charIndex++;
      setTimeout(typeHeadline, 45);
    }
  }
  typeHeadline();