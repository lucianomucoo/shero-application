document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const items = document.querySelectorAll('.product-item');
  const indicators = document.querySelector('.carousel-indicators');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  
  // Clone items for infinite scroll
  [...items].forEach(item => {
    track.appendChild(item.cloneNode(true));
  });

  let currentIndex = 0;
  const totalItems = items.length;
  let isTransitioning = false;
  
  // Create indicators (only for original items)
  items.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.classList.add('indicator');
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(idx));
    indicators.appendChild(dot);
  });
  
  function updateCarousel(smooth = true) {
    if (!smooth) track.style.transition = 'none';
    const offset = -currentIndex * items[0].offsetWidth;
    track.style.transform = `translateX(${offset}px)`;
    if (!smooth) {
      track.offsetHeight; // Force reflow
      track.style.transition = 'transform 0.5s ease-in-out';
    }
    
    // Update indicators based on real position
    const realIndex = ((currentIndex % totalItems) + totalItems) % totalItems;
    document.querySelectorAll('.indicator').forEach((dot, idx) => {
      dot.classList.toggle('active', idx === realIndex);
    });
  }
  
  function goToSlide(index) {
    if (isTransitioning) return;
    currentIndex = index;
    updateCarousel();
  }
  
  function handleTransitionEnd() {
    if (currentIndex >= totalItems) {
      currentIndex = 0;
      updateCarousel(false);
    } else if (currentIndex < 0) {
      currentIndex = totalItems - 1;
      updateCarousel(false);
    }
    isTransitioning = false;
  }
  
  track.addEventListener('transitionend', handleTransitionEnd);
  
  prev.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;
    updateCarousel();
  });
  
  next.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    updateCarousel();
  });
  
  // Auto-advance every 5 seconds
  setInterval(() => {
    if (!isTransitioning) {
      isTransitioning = true;
      currentIndex++;
      updateCarousel();
    }
  }, 5000);
});