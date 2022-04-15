const track = document.querySelector('.carousel-track')
const slides = Array.from(track.querySelectorAll('.poll-container'))
const startBtn = document.querySelector('.btn-start')
const nextBtns = Array.from(document.querySelectorAll('.btn-next'))
const previousBtns = Array.from(document.querySelectorAll('.btn-prev'))
const dotsNav = document.querySelector('.carousel-nav')
const indicatorDots = []

// housepass
const housepass = document.querySelector('#housepass')
const housepassName = housepass.querySelector('#housepass_name')
const housepassImg = housepass.querySelector('.housepass_img')
const housepassAccess = housepass.querySelector('.housepass_info-access')
const drinkBadge = housepass.querySelector('#drink-badge')
const animalBadge = housepass.querySelector('#animal-badge')
const guestBadge = housepass.querySelector('#guest-badge')
const kegBadge = housepass.querySelector('#keg-badge')
const hottubBadge = housepass.querySelector('#hottub-badge')
const sleepBadge = housepass.querySelector('#sleep-badge')

// Q1
const firstName = document.querySelector('#first_name')
firstName.displayField = document.querySelector('#hp_first')
const lastName = document.querySelector('#last_name')
lastName.displayField = document.querySelector('#hp_last')
const alias = document.querySelector('#alias')
alias.displayField = document.querySelector('#hp_alias')

// Q2
const favColor = document.querySelector('#colorInput')
const favDrink = document.querySelector('#fav-drink')
favDrink.displayField = drinkBadge
const animal = document.querySelector('#animal')
animal.displayField = animalBadge
const profilePic = document.querySelector('#profile-pic')
profilePic.displayField = housepassImg

// Other questions
const radioChoices = document.querySelectorAll('input[type="radio"]')
const checkboxes = document.querySelectorAll('input[type="checkbox"]')

const choiceClicked = (e) => {
    const choice = e.target
    const question = questionIndex.find(q => q.id === choice.dataset.question)
    // console.log(choice, question)
    const displayField = question.displayField

    if (displayField) {
        displayField.src = choice.dataset.img
        if (!choice.dataset.img.includes('svg')) {
            displayField.style.transform = 'scale(1) rotateZ(0deg)'
        }
        if (choice.dataset.img.includes('svg')){
            displayField.style.transform = 'scale(0.8)'
            console.log('svg')
        }
        if (choice.dataset.choice === '17') {
            displayField.style.transform = 'rotateZ(180deg)'
        }
    }
}

// question IDs associated with keyword
const questionIndex = [
    {
        id: '1',
        keyword: 'dates',
        displayField: null,
    },
    {
        id: '2',
        keyword: 'hottub',
        displayField: hottubBadge,
    },
    {
        id: '3',
        keyword: 'ceiling',
        displayField: housepassAccess,
    },
    {
        id: '4',
        keyword: 'guests',
        displayField: guestBadge,
    },
    {
        id: '5',
        keyword: 'kegstand',
        displayField: kegBadge,
    },
    {
        id: '6',
        keyword: 'sleep',
        displayField: sleepBadge,
    },
]


radioChoices.forEach(choice => {
    choice.addEventListener('click', choiceClicked)
})



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

    if (input.id === 'colorInput') {
        housepass.style.background = value
    }
    else {
        input.displayField.innerText = value;
        adjustFontSize(housepassName)
    }
}

const addBadge = (e) => {
    const input = e.target
    const selectedOption = input.options[input.selectedIndex]
    const value = input.value
    const img = selectedOption.dataset.img
    input.displayField.src = img
}

const adjustFontSize = (element) => {
    const spanWidth = element.getBoundingClientRect().width
    let fontSize = window.getComputedStyle(element, null).getPropertyValue('font-size').replace("px","");
    const parentWidth = element.parentElement.getBoundingClientRect().width

    if (spanWidth > parentWidth * 0.9) {
        fontSize *= 0.9
    }
    else if (spanWidth < parentWidth) {
        fontSize *= 1.1
    }

    document.documentElement.style.setProperty('--hp-footer-fs', fontSize + 'px')
}

// from Django docs - get CSRF token from cookies
function getCookie(name) {
    // console.log(`Getting cookie: ${name}`);
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


const addGuestInfo = async () => {
    const csrf_token = getCookie('csrftoken')

    const data = {
        'first_name': firstName.value,
        'last_name': lastName.value,
        'alias': alias.value,
        'fav_colour': favColor.value,
        'fav_drink': favDrink.value,
        'spirit_animal': animal.value,
        // 'profile_pic': profilePic,
    }

    try {
        const res = await fetch('update_guest/', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { "X-CSRFToken": csrf_token}
        })
        const parsed = await res.json()
        console.log('Success')
        return parsed
    }
    catch(err) {
        console.error(err)
    }
}

firstName.addEventListener('input', updateUserInput)
lastName.addEventListener('input', updateUserInput)
alias.addEventListener('input', updateUserInput)
favColor.addEventListener('input', updateUserInput)
favDrink.addEventListener('input', addBadge)
animal.addEventListener('input', addBadge)