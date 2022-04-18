const track = document.querySelector('.carousel-track')
const slides = Array.from(track.querySelectorAll('.poll-container'))
const startBtn = document.querySelector('.btn-start')
const nextBtns = Array.from(document.querySelectorAll('.btn-next'))
const previousBtns = Array.from(document.querySelectorAll('.btn-prev'))
const submitBtn = document.querySelector('#submit-btn')
const dotsNav = document.querySelector('.carousel-nav')
const indicatorDots = []

// image capture
const video = document.querySelector('#video')
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
const addPhotoBtn = document.querySelector('#add-photo')
const takePhotoBtn = document.querySelector('#take-photo')

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
// const profilePic = document.querySelector('#profile-pic')
// profilePic.displayField = housepassImg

// Other questions
const radioChoices = document.querySelectorAll('input[type="radio"]')
const checkboxes = document.querySelectorAll('input[type="checkbox"]')
const comment = document.querySelector('#comments')

const getVideo = () => {
    // get vid stream from webcam:
    navigator.mediaDevices.getUserMedia( {video: true, audio: false} )
        .then(localMediaStream => {
            video.srcObject = localMediaStream
            video.play()
        })
        .catch(err => console.error(err))
}

const paintToCanvas = () => {
    const width = video.videoWidth
    const height = video.videoHeight
    canvas.width = width
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0,0,width,height)
        ctx.putImageData(pixels, 0, 0)
    }, 16)
}

const takePhoto = () => {
    const data = canvas.toDataURL('image/jpeg');
    housepassImg.src = data;
    makeAlert('Mug Captured')
}

const makeAlert = (content, duration = 1000) => {
    const alertContainer = document.querySelector('.alert-container');
    const newAlert = document.createElement('div');
    newAlert.classList.add('alert');
    newAlert.innerText = content;
    alertContainer.append(newAlert)
    newAlert.addEventListener('transitionend', () => {
        newAlert.remove();
    })
    setTimeout(() => {
        newAlert.classList.add('hide');
    }, duration)
}

const choiceClicked = (e) => {
    const choice = e.target
    const question = questionIndex.find(q => q.id === choice.dataset.question)
    // console.log(choice, question)
    const displayField = question.displayField

    if (displayField) {
        if (choice.dataset.choice === '12') {
            displayField.innerText = '🚩MENACE🚩'
            displayField.classList.add('menace')
            makeAlert('Clearance Level Adjusted')
        }
        else if (choice.dataset.choice === '13') {
            displayField.innerText = '⭐ VIP ⭐'
            displayField.classList.remove('menace')
            makeAlert('Clearance Level Adjusted')
        }
        else {
            displayField.src = choice.dataset.img
            makeAlert('Badge Added')    
        }
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

const showHousepass = () => {
    housepass.classList.remove('hidden')
}

const startSurvey = () => {
    moveSlidesForward()
    showHousepass()
}

const moveSlidesForward = () => {
    const currentSlide = track.querySelector('.current-slide')
    const targetSlide = currentSlide.nextElementSibling
    moveToSlide(currentSlide, targetSlide)

    const currentDot = dotsNav.querySelector('.current-slide')
    const targetDot = currentDot.nextElementSibling
    updateDots(currentDot, targetDot)

    window.scrollTo({ top: 0, behavior: 'smooth' });

}

const moveSlidesBackwards = () => {
    const currentSlide = track.querySelector('.current-slide')
    const targetSlide = currentSlide.previousElementSibling
    moveToSlide(currentSlide, targetSlide)

    const currentDot = dotsNav.querySelector('.current-slide')
    const targetDot = currentDot.previousElementSibling
    updateDots(currentDot, targetDot)

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const moveToSlide = (currentSlide, targetSlide) => {
    track.style.transform = `translateX(-${targetSlide.style.left})`
    currentSlide.classList.remove('current-slide')
    targetSlide.classList.add('current-slide')
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide')
    targetDot.classList.add('current-slide')
}

// arrange all slides next to eachother:
slides.forEach(setSlidePosition)

indicatorDots[0].classList.add('current-slide')

const updateUserInput = (e) => {
    const input = e.target
    const value = input.value

    if (input.id === 'colorInput') {
        housepass.style.background = value
        makeAlert('House Pass Enhanced')
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
    console.log('Badge Added')
    makeAlert('House Pass Enhanced')
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


const uploadResults = async (surveyResults) => {
    const csrf_token = getCookie('csrftoken')

    try {
        const res = await fetch('uploadResults/', {
            method: 'POST',
            body: JSON.stringify(surveyResults),
            headers: { "X-CSRFToken": csrf_token},
            contentType: false,
            processData: false,
        })
        const parsed = await res.json()
        if (parsed.error) {
            throw `SERVER: ${parsed.error}`
        }
        console.log('Success')
        console.log(parsed)
        makeAlert('Survey Submitted')
        return parsed
    }
    catch(err) {
        console.error(err)
        makeAlert('Something went wrong...')
    }
}

// const addPicture = async (imageFormData, guest_id) => {
//     console.log(`Adding profile picture to Guest ${guest_id}`)
//     const csrf_token = getCookie('csrftoken')

//     try {
//         const res = await fetch(`addPicture/${guest_id}`, {
//             method: 'POST',
//             body: imageFormData,
//             headers: { "X-CSRFToken": csrf_token },
//             contentType: false,
//             processData:  false,
//         })
//         const response = await res.json()
//         if (response.error) {
//             throw `SERVER: ${response.error}`
//         }
//         console.log('Success')
//         console.log(response)
//         return response
//     }
//     catch {
//         console.error(err)
//     }
// }

// https://stackoverflow.com/questions/12368910/html-display-image-after-selecting-filename
// shows picture on screen as soon as a file is uploaded to an input type=file
// const addProfilePic = (e) => {
//     const input = e.target
//     console.log(input)
//     if (input.files && input.files[0]) {
//         const reader = new FileReader()
//         reader.onload = function (f) {
//             input.displayField.src = f.target.result
//         }
//         reader.readAsDataURL(input.files[0])
//     }
// }

// const collectProfilePic = () => {
//     const images = profilePic.files
//     let imageFormData = new FormData()
//     imageFormData.append('images', images.item(0))
//     if (images.length === 0) imageFormData = null

//     return imageFormData
// }

const collectAnswers = () => {

    const selectedChoices = [...radioChoices, ...checkboxes]
        .filter(c => c.checked === true)
        .map(c => c.dataset.choice)

    const profile_picture = housepassImg.src.includes('base64') ? housepassImg.src : null

    const surveyResults = {
        firstName: firstName.value,
        lastName: lastName.value,
        alias: alias.value,
        favColor: favColor.value,
        favDrink: favDrink.value,
        animal: animal.value,
        answers: selectedChoices,
        comments: comments.value,
        profilePic: profile_picture,
    }

    return surveyResults
}

const displayCanvas = () => {
    addPhotoBtn.classList.add('hide');
    canvas.classList.add('show');
    takePhotoBtn.classList.add('show');
    getVideo();
}

const submitSurvey = () => {
    results = collectAnswers();
    if (results.firstName === "") {
        const currentSlide = track.querySelector('.current-slide')
        const currentDot = dotsNav.querySelector('.current-slide')
        const targetIndex = 2
        const targetDot = indicatorDots[targetIndex]
        const targetSlide = slides[targetIndex]
        moveToSlide(currentSlide, targetSlide)
        updateDots(currentDot, targetDot)
    }
    else {
        uploadResults(results)
        moveSlidesForward()
    }
}

// event listeners:
startBtn.addEventListener('click', startSurvey)
nextBtns.forEach(btn => {
    btn.addEventListener('click', moveSlidesForward)
})

previousBtns.forEach(btn => btn.addEventListener('click', moveSlidesBackwards))

indicatorDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const currentSlide = track.querySelector('.current-slide')
        const currentDot = dotsNav.querySelector('.current-slide')
        const targetDot = e.target
        const targetIndex = indicatorDots.findIndex(dot => dot === targetDot)
        const targetSlide = slides[targetIndex]
        moveToSlide(currentSlide, targetSlide)
        updateDots(currentDot, targetDot)
        showHousepass()
    })
})

firstName.addEventListener('input', updateUserInput)
lastName.addEventListener('input', updateUserInput)
alias.addEventListener('input', updateUserInput)
favColor.addEventListener('input', updateUserInput)
favDrink.addEventListener('input', addBadge)
animal.addEventListener('input', addBadge)
// profilePic.addEventListener('change', addProfilePic)
video.addEventListener('canplay', paintToCanvas)
addPhotoBtn.addEventListener('click', displayCanvas)
takePhotoBtn.addEventListener('click', takePhoto)
submitBtn.addEventListener('click', submitSurvey)
radioChoices.forEach(choice => {
    choice.addEventListener('click', choiceClicked)
})


