// typing headline animation
const text = "LET'S MAKE YOUR CONTENT UNFORGETTABLE";
const el = document.getElementById('typedHeadline');
const cursor = el.querySelector('.cursor');
let i = 0;

function typeLoop(){
  if(i <= text.length){
    el.textContent = text.slice(0, i);
    el.appendChild(cursor);
    i++;
    setTimeout(typeLoop, 55);
  } else {
    setTimeout(() => {
      i = 0;
      typeLoop();
    }, 2500);
  }
}
typeLoop();

// background video — fall back to the photo if the video fails to load
const bgVideo = document.getElementById('bgVideo');
const bgVideoWrap = document.getElementById('bgVideoWrap');
if (bgVideo) {
  bgVideo.addEventListener('error', () => {
    bgVideo.style.display = 'none';
  });
  // safety timeout: if it hasn't started playing shortly, assume it failed
  setTimeout(() => {
    if (bgVideo.readyState === 0) {
      bgVideo.style.display = 'none';
    }
  }, 4000);
}

// mobile menu toggle
const burger = document.getElementById('burgerBtn');
const menu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});