const galleryItems = document.querySelectorAll('.gallery-item, .gallery1-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;

function updateLightbox(index) {
    const item = galleryItems[index];
    lightboxImg.src = item.src;
    lightboxCaption.textContent = item.dataset.caption || '';
    currentIndex = index;
}

function showLightbox(index) {
    lightbox.style.display = 'flex';
    updateLightbox(index);
}

// klik na fotku
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => showLightbox(index));
});

// zatvoriť krížikom
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// predchádzajúca fotka
prevBtn.addEventListener('click', () => {
    updateLightbox((currentIndex - 1 + galleryItems.length) % galleryItems.length);
});

// ďalšia fotka
nextBtn.addEventListener('click', () => {
    updateLightbox((currentIndex + 1) % galleryItems.length);
});

// klik mimo obrázka = zatvorenie
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.style.display = 'none';
});

// šípky + ESC
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display !== 'flex') return;

    if (e.key === 'ArrowRight') {
        updateLightbox((currentIndex + 1) % galleryItems.length);
    }
    if (e.key === 'ArrowLeft') {
        updateLightbox((currentIndex - 1 + galleryItems.length) % galleryItems.length);
    }
    if (e.key === 'Escape') {
        lightbox.style.display = 'none';
    }
});