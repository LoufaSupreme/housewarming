const track = document.querySelector('.carousel-track')
const slides = Array.from(track.querySelectorAll('.poll-container'))
const startBtn = document.querySelector('.btn-start')
const nextBtns = Array.from(document.querySelectorAll('.btn-next'))
const previousBtns = Array.from(document.querySelectorAll('.btn-prev'))
const carouselNav = document.querySelector('.carousel-nav')
const indicatorDots = Array.from(carouselNav.children)

const slideWidth = slides[0].getBoundingClientRect().width


const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px'
}

const moveSlidesForward = () => {
    const currentSlide = track.querySelector('.current-slide')
    const targetSlide = currentSlide.nextElementSibling
    moveToSlide(currentSlide, targetSlide)
}

const moveSlidesBackwards = () => {
    const currentSlide = track.querySelector('.current-slide')
    const targetSlide = currentSlide.previousElementSibling
    moveToSlide(currentSlide, targetSlide)
}

const moveToSlide = (currentSlide, targetSlide) => {
    track.style.transform = `translateX(-${targetSlide.style.left})`
    currentSlide.classList.remove('current-slide')
    targetSlide.classList.add('current-slide')
}

// arrange all slides next to eachother:
slides.forEach(setSlidePosition)

// configure btns:
startBtn.addEventListener('click', moveSlidesForward)

nextBtns.forEach(btn => {
    btn.addEventListener('click', moveSlidesForward)
})

previousBtns.forEach(btn => btn.addEventListener('click', moveSlidesBackwards))

indicatorDots[0].classList.add('current-slide')

// document.addEventListener('click', e => console.log(e.target))