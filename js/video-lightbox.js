const videoCards = document.querySelectorAll('.video-card');
const videoLightbox = document.getElementById('video-lightbox');
const lightboxIframe = videoLightbox.querySelector('iframe');
const closeBtn = videoLightbox.querySelector('.close');

videoCards.forEach(card => {
  card.addEventListener('click', () => {
    const videoSrc = card.getAttribute('data-video');
    lightboxIframe.src = videoSrc + "?autoplay=1"; // pridaj autoplay až po kliknutí
    videoLightbox.style.display = 'flex';
  });
});

closeBtn.addEventListener('click', () => {
  lightboxIframe.src = '';
  videoLightbox.style.display = 'none';
});

videoLightbox.addEventListener('click', e => {
  if (e.target === videoLightbox) {
    lightboxIframe.src = '';
    videoLightbox.style.display = 'none';
  }
});