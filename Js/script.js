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













// Testimonial Data Storage
const testimonials = [
  {
    quote: "Working with this team was an absolute game-changer for our brand. The attention to detail and creative execution exceeded all our original expectations.",
    name: "Sarah Jenkins",
    role: "Product Manager at TechFlow",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80",
    rating: 5
  },
  {
    quote: "Delivered our complex web application ahead of schedule with flawless code quality. Communication was consistent and clear throughout the sprint.",
    name: "Marcus Chen",
    role: "Founder & CEO, Nexus Labs",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
    rating: 5
  },
  {
    quote: "An exceptional eye for UI design and user experience. Our conversion rates increased by 35% within the first month of launching the redesign.",
    name: "Elena Rostova",
    role: "Design Lead at Studio Create",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
    rating: 5
  },
  {
    quote: "Very reliable developer who takes ownership of full-stack problems. High expertise, structured execution, and great professional ethics.",
    name: "David Kovar",
    role: "Engineering Director",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
    rating: 4
  }
];

// DOM Element Selectors
const testimonialCard = document.getElementById('testimonialCard');
const testimonialText = document.getElementById('testimonialText');
const starRating = document.getElementById('starRating');
const clientImg = document.getElementById('clientImg');
const clientName = document.getElementById('clientName');
const clientRole = document.getElementById('clientRole');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dotsContainer');

// State Variables
let currentIndex = 0;
let autoSlideInterval = null;
const AUTO_SLIDE_DELAY = 5000; // 5 Seconds

// Initialize Carousel
function initCarousel() {
  createDots();
  renderTestimonial(currentIndex);
  startAutoSlide();
}

// Generate Pagination Dots Dynamically
function createDots() {
  dotsContainer.innerHTML = '';
  testimonials.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === currentIndex) dot.classList.add('active');
    dot.addEventListener('click', () => {
      if (index !== currentIndex) {
        goToSlide(index);
        resetAutoSlide();
      }
    });
    dotsContainer.appendChild(dot);
  });
}

// Update Active Dot Styling
function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

// Generate Star Icons HTML
function renderStars(rating) {
  let starsHTML = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      starsHTML += '<i class="fa-solid fa-star"></i>';
    } else {
      starsHTML += '<i class="fa-regular fa-star"></i>';
    }
  }
  return starsHTML;
}

// Render Testimonial with Transition Animation
function renderTestimonial(index) {
  // Add animation fade class
  testimonialCard.classList.add('changing');

  setTimeout(() => {
    const item = testimonials[index];
    
    // Update contents
    testimonialText.textContent = `“${item.quote}”`;
    starRating.innerHTML = renderStars(item.rating);
    clientImg.src = item.image;
    clientImg.alt = `${item.name}'s profile picture`;
    clientName.textContent = item.name;
    clientRole.textContent = item.role;
    
    updateDots();

    // Remove animation fade class
    testimonialCard.classList.remove('changing');
  }, 250);
}

// Navigation Actions
function nextSlide() {
  currentIndex = (currentIndex + 1) % testimonials.length;
  renderTestimonial(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  renderTestimonial(currentIndex);
}

function goToSlide(index) {
  currentIndex = index;
  renderTestimonial(currentIndex);
}

// Auto Slide Control
function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, AUTO_SLIDE_DELAY);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Event Listeners
nextBtn.addEventListener('click', () => {
  nextSlide();
  resetAutoSlide();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  resetAutoSlide();
});

// Pause Auto-Slide on Card Hover for Better UX
testimonialCard.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
testimonialCard.addEventListener('mouseleave', () => startAutoSlide());

// Run Initialization when DOM is Ready
document.addEventListener('DOMContentLoaded', initCarousel);