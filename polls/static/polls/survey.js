const track = document.querySelector('.carousel-track')
const slides = Array.from(track.querySelectorAll('.poll-container'))
const startBtn = document.querySelector('.btn-start')
const nextBtns = Array.from(document.querySelectorAll('.btn-next'))
const previousBtns = Array.from(document.querySelectorAll('.btn-prev'))
const dotsNav = document.querySelector('.carousel-nav')
const indicatorDots = []

const firstName = document.querySelector('#first_name')
firstName.displayField = document.querySelector('#hp_first')
const lastName = document.querySelector('#last_name')
lastName.displayField = document.querySelector('#hp_last')
const alias = document.querySelector('#alias')
alias.displayField = document.querySelector('#hp_alias')


// make indicator dots to indicate which slide we're on
slides.forEach(slide => {
    const dot = document.createElement('button')
    dot.classList.add('carousel-indicator')
    dotsNav.appendChild(dot)
    indicatorDots.push(dot)
})

const slideWidth = slides[0].getBoundingClientRect().width

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px'
}

const moveSlidesForward = () => {
    const currentSlide = track.querySelector('.current-slide')
    const targetSlide = currentSlide.nextElementSibling
    moveToSlide(currentSlide, targetSlide)

    const currentDot = dotsNav.querySelector('.current-slide')
    const targetDot = currentDot.nextElementSibling
    updateDots(currentDot, targetDot)

}

const moveSlidesBackwards = () => {
    const currentSlide = track.querySelector('.current-slide')
    const targetSlide = currentSlide.previousElementSibling
    moveToSlide(currentSlide, targetSlide)

    const currentDot = dotsNav.querySelector('.current-slide')
    const targetDot = currentDot.previousElementSibling
    updateDots(currentDot, targetDot)
}

const moveToSlide = (currentSlide, targetSlide) => {
    track.style.transform = `translateX(-${targetSlide.style.left})`
    currentSlide.classList.remove('current-slide')
    targetSlide.classList.add('current-slide')
}

const clickDots = () => {
    
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide')
    targetDot.classList.add('current-slide')
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
indicatorDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const currentSlide = track.querySelector('.current-slide')
        const currentDot = dotsNav.querySelector('.current-slide')
        const targetDot = e.target
        const targetIndex = indicatorDots.findIndex(dot => dot === targetDot)
        const targetSlide = slides[targetIndex]
        moveToSlide(currentSlide, targetSlide)
        updateDots(currentDot, targetDot)
    })
})

// document.addEventListener('click', e => console.log(e.target))

const updateUserInput = (e) => {
    const input = e.target
    const value = input.value
    input.displayField.innerText = value;
}

firstName.addEventListener('input', updateUserInput)
lastName.addEventListener('input', updateUserInput)
alias.addEventListener('input', updateUserInput)