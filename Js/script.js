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

  // Headline (static, no typing animation)
  const headlineEl = document.getElementById('typedHeadline');
  const headlineText = "Scalable Video Editing for Brands Ready to Dominate the Feed";
  headlineEl.textContent = headlineText;















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













  // Our Work slider arrows (mobile)
  document.querySelectorAll('.grid-wrapper').forEach(wrapper=>{
    const g = wrapper.querySelector('.grid');
    const prev = wrapper.querySelector('.grid-prev');
    const next = wrapper.querySelector('.grid-next');
    const scrollByCard = (dir) => {
      const card = g.querySelector('.card');
      if(!card) return;
      g.scrollBy({ left: dir * card.offsetWidth, behavior: 'smooth' });
    };
    prev.addEventListener('click', () => scrollByCard(-1));
    next.addEventListener('click', () => scrollByCard(1));
  });

// Work

 // Tab switching
  document.querySelectorAll('.tab').forEach(tab=>{
    tab.addEventListener('click', ()=>{
      document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
      document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('panel-'+tab.dataset.tab).classList.add('active');
    });
  });

  // Build each card's placeholder content
  document.querySelectorAll('.card').forEach(card=>{
    const videoId = card.dataset.video;

    // Auto thumbnail from YouTube (falls back to sddefault if hqdefault missing)
    const thumb = new Image();
    thumb.onload = () => {
      // hqdefault always exists but can be a 120x90 gray placeholder for some IDs;
      // maxresdefault gives the sharpest image when available.
      card.style.backgroundImage = `url(https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)`;
    };
    thumb.onerror = () => {
      card.style.backgroundImage = `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)`;
    };
    thumb.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    const playBtn = document.createElement('div');
    playBtn.className = 'play-btn';
    playBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>`;
    card.appendChild(playBtn);

    const ytCorner = document.createElement('div');
    ytCorner.className = 'yt-corner';
    ytCorner.innerHTML = `<svg viewBox="0 0 28 20" fill="white"><path d="M27.4 3.1c-.3-1.2-1.3-2.1-2.5-2.4C22.7 0 14 0 14 0S5.3 0 3.1.7C1.9 1 1 1.9.6 3.1 0 5.3 0 10 0 10s0 4.7.6 6.9c.3 1.2 1.3 2.1 2.5 2.4C5.3 20 14 20 14 20s8.7 0 10.9-.7c1.2-.3 2.1-1.3 2.5-2.4.6-2.2.6-6.9.6-6.9s0-4.7-.6-6.9zM11.2 14.3V5.7L18.5 10l-7.3 4.3z"/></svg>`;
    card.appendChild(ytCorner);

    card.addEventListener('click', ()=>{
      const origin = encodeURIComponent(window.location.origin || window.location.href);
      const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${origin}`;
      card.innerHTML = `<iframe src="${embedUrl}" allow="autoplay; encrypted-media; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
    });
  });