
const track = document.querySelector('.expert-track');
const slides = document.querySelectorAll('.expert-slide');
const btnNext = document.querySelector('.carousel-arrow-right');
const btnPrev = document.querySelector('.carousel-arrow-left');

let index = 0;
const totalSlides = slides.length;

function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;
}

btnNext.addEventListener('click', () => {
    index = (index + 1) % totalSlides;
    updateCarousel();
});

btnPrev.addEventListener('click', () => {
    index = (index - 1 + totalSlides) % totalSlides;
    updateCarousel();
});

