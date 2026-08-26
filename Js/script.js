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















  const grid = document.getElementById('tGrid');
  const prevBtn = document.getElementById('tPrev');
  const nextBtn = document.getElementById('tNext');
  const dotsContainer = document.getElementById('tDots');
  const cards = grid.querySelectorAll('.t-card');

  nextBtn.addEventListener('click', () => {
    const cardWidth = cards[0].offsetWidth + 22;
    grid.scrollBy({ left: cardWidth, behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    const cardWidth = cards[0].offsetWidth + 22;
    grid.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  });

  cards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('t-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      grid.scrollTo({ left: cards[index].offsetLeft - grid.offsetLeft, behavior: 'smooth' });
    });
    dotsContainer.appendChild(dot);
  });

  grid.addEventListener('scroll', () => {
    const scrollPosition = grid.scrollLeft;
    cards.forEach((card, i) => {
      if (Math.abs(card.offsetLeft - grid.offsetLeft - scrollPosition) < card.offsetWidth / 2) {
        document.querySelectorAll('.t-dot').forEach(d => d.classList.remove('active'));
        if (dotsContainer.children[i]) dotsContainer.children[i].classList.add('active');
      }
    });
  });
