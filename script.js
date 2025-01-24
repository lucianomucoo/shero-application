document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const items = Array.from(document.querySelectorAll('.carousel-item'));
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  
  // Clone items to fill viewport
  items.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });
  
  let currentIndex = 0;
  const itemWidth = items[0].offsetWidth + 20;
  const totalItems = items.length;

  function updateCarousel(smooth = true) {
    if (!smooth) {
      track.classList.add('no-transition');
    }
    
    let offset = -currentIndex * itemWidth;
    // Reset position if we've scrolled past all original items
    if (currentIndex >= totalItems) {
      currentIndex = 0;
      offset = 0;
    }
    
    track.style.transform = `translateX(${offset}px)`;
    
    if (!smooth) {
      track.offsetHeight;
      track.classList.remove('no-transition');
    }
  }

  function nextSlide() {
    currentIndex++;
    updateCarousel();
  }

  function prevSlide() {
    if (currentIndex <= 0) {
      currentIndex = totalItems - 1;
    } else {
      currentIndex--;
    }
    updateCarousel();
  }

  // Initialize
  updateCarousel(false);

  // Event listeners
  prev.addEventListener('click', prevSlide);
  next.addEventListener('click', nextSlide);
  
  // Auto advance
  const autoAdvance = setInterval(nextSlide, 5000);
  track.addEventListener('mouseenter', () => clearInterval(autoAdvance));
});