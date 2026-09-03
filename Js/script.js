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







































// Data Array — YouTube Video IDs na lang (hindi na mp4 files)
// Paano kumuha ng ID: sa YouTube video, i-right-click > "Copy embed code"
// Sa embed code makikita mo: src="https://www.youtube.com/embed/VIDEO_ID_DITO"
// Kunin mo lang yung VIDEO_ID (yung parte pagkatapos ng /embed/) at ilagay dito sa baba.
const videos = {
    ugcAi: [
        "y2kLSAVdmMw",
        "oszqsVyNZX4",
        "z2Cz2-o-C2A",
        "KhRJQciVmgI",
        "8Dat3xF18WA",
        "UZY62keLHg4",
        "wTSJqshgYOU",
        "rOlyYcvORxU",
        "pItk5EGHxsw",
        "BstGH-gTPdg",
        "pktvvjMV2q0"

    ],
    shortForm: [
        "zqvbF4hOmCI",
        "_OlUGoIxh4s",
        "ZBmcAjZslx0",
        "Q9qcAbtq3x8",
        "eaJRIG_yJn0",
        "xifPyMzbZfA",
        "t9g6L699CeQ",
        "KZMasOaJeuE",
        "wHtStTCpw5g"
    ],
    longForm: [
        "Vb2bHw17mw8",
        "yDylGKCnu84",
        "6i_xGgPaRSM",
        "1TrQQXeRcX8"
    ]
};

let currentCategory = 'ugcAi';
let currentIndex = 0;

// DOM Elements
const mainVideoWrapper = document.getElementById('mainVideoWrapper');
const mainThumb = document.getElementById('mainThumb');
const prevThumb = document.getElementById('prevThumb');
const nextThumb = document.getElementById('nextThumb');

const prevCard = document.getElementById('prevCard');
const nextCard = document.getElementById('nextCard');

const carouselPrevBtn = document.getElementById('prevBtn');
const carouselNextBtn = document.getElementById('nextBtn');

const categoryButtons = document.querySelectorAll('.tab-btn');
const paginationContainer = document.getElementById('paginationIndicators');

// Helper: kunin ang YouTube thumbnail URL galing sa video ID
function ytThumb(videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

// Ibalik ang main card sa thumbnail + play button (bago mag-play ng bago)
function resetMainCardToThumb(videoId) {
    mainVideoWrapper.innerHTML = `
        <img id="mainThumb" class="video-thumb" src="${ytThumb(videoId)}" alt="" loading="lazy">
        <div class="play-overlay" id="playOverlay">
            <div class="play-button">►</div>
        </div>
    `;
    document.getElementById('playOverlay').addEventListener('click', () => {
        playMainVideo(videoId);
    });
}

// Palitan ang thumbnail ng aktwal na YouTube player pag pinindot
function playMainVideo(videoId) {
    mainVideoWrapper.innerHTML = `
        <iframe
            src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1"
            title="YouTube video player"
            frameborder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowfullscreen>
        </iframe>
    `;
}

// Set video sources safely
function updateVideoSources() {
    const list = videos[currentCategory];
    if (!list || list.length === 0) return;

    const total = list.length;

    // Boundary check
    currentIndex = (currentIndex + total) % total;

    const prevIndex = (currentIndex - 1 + total) % total;
    const nextIndex = (currentIndex + 1) % total;

    // Long form video = 16:9 landscape cards; others stay 9:16 portrait
    document.getElementById('carouselContainer').classList.toggle('landscape', currentCategory === 'longForm');

    // Set Main Video (thumbnail muna, hindi agad naglalaro)
    resetMainCardToThumb(list[currentIndex]);

    // Set Previews (thumbnail images lang, hindi kailangan mag-play)
    prevThumb.src = ytThumb(list[prevIndex]);
    nextThumb.src = ytThumb(list[nextIndex]);

    renderPagination();
}

// Pagination Dots
function renderPagination() {
    paginationContainer.innerHTML = '';
    const total = videos[currentCategory].length;

    for (let i = 0; i < total; i++) {
        const dot = document.createElement('div');
        dot.className = 'indicator' + (i === currentIndex ? ' active' : '');
        dot.onclick = () => {
            currentIndex = i;
            updateVideoSources();
        };
        paginationContainer.appendChild(dot);
    }
}




// Controls
function goNext() {
    currentIndex++;
    updateVideoSources();
}

function goPrev() {
    currentIndex--;
    updateVideoSources();
}


// Note: hindi na kailangan ng togglePlay function — ang YouTube iframe
// mismo na ang may sariling play/pause controls pag naka-load na siya.
// Ang playOverlay click ay hinahandle na sa loob ng resetMainCardToThumb().

// Event Listeners
carouselNextBtn.onclick = goNext;
carouselPrevBtn.onclick = goPrev;

nextCard.onclick = goNext;
prevCard.onclick = goPrev;

categoryButtons.forEach(btn => {
    btn.onclick = (e) => {
        categoryButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        currentCategory = btn.getAttribute('data-category');
        currentIndex = 0;
        updateVideoSources();
    };
});

// Run on load
document.addEventListener('DOMContentLoaded', () => {
    updateVideoSources();
});


// ===== STRATEGY PHOTO STACK =====
// Click sends the front photo to the back, revealing the next one.
const photoStack = document.getElementById('photoStack');
if (photoStack) {
    photoStack.addEventListener('click', () => {
        const firstPhoto = photoStack.querySelector('img');
        if (firstPhoto) {
            photoStack.appendChild(firstPhoto);
        }
    });
}


// ===== SCROLL REVEAL =====
// Section headings/text fade + slide in (like the hero sub text) once they enter view.
const revealEls = document.querySelectorAll('.reveal-left');
if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    revealEls.forEach(el => revealObserver.observe(el));
}



