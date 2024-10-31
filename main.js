console.log ("JavaScript is working!");

// --------------------------- On load function ---------------------------


function onLoad(){
    var loadTl = gsap.timeline({delay:0.5});
    loadTl.from('.page1 .home-bg', {y: 50, filter:'blur(20px)', scale:'+=0.1', duration: 1})
      .from('nav', {y:-50, opacity: 0, duration: 0.5}, '-=0.5')
      .from('.page1 .h1-small', {x:-100, opacity: 0, duration: 0.5})
      .from('.page1 .h1-large', {x:-100, opacity: 0, duration: 0.5})
      .from('.page1 .lets-go-btn', {y:100, opacity: 0, duration: 0.5});
}

/* calling the load function */
onLoad();

// --------------------------- Scroll transitions ---------------------------

// Creating a versatile function which will easily complete all scroll animations where an element appears from a direction.
function onScroll(element, direction, height){
    
    // Setting these values to zero, so that they do not animate unless specified
    let xValue = 0;
    let yValue = 0;

    // If/else statement, which will change the xValue/yValue based on the direction I want the element to come in from.
    if (direction === 'left') {
        xValue = -50;
    } else if (direction === 'right') {
        xValue = 50;
    } else if (direction === 'top') {
        yValue = -50;
    } else if (direction === 'bottom') {
        yValue = 50;
    }

    /* Creating the actual animation and scroll trigger. This was informed by chatGPT, GSAP, and DesignCourse on Youtube.
    The x/y value will be passed into here. This means that the opacity will always start from zero, however the x and y
    values can be changed. The duration is always 0.5 seconds, with a GSAP ease function. The trigger of the animation
    is the element being animated. This animation will begin when the at the height which is designated when the function is called.
    Scrubbing is false, meaning that the animations will follow a set duration and always complete. */
    gsap.from(element, {
        opacity: 0,
        x: xValue,
        y: yValue,
        duration: 0.5,
        ease: "power1.inOut",
        scrollTrigger: {
            trigger: element,
            start: height,
            scrub: false
    }
    });
}

// --------------------------- Calling the scroll functions ---------------------------
onScroll('#intro-section p', 'bottom', 'top 80%');
onScroll('#locations-section h2.h2-large', 'bottom', 'top 80%');
onScroll('.fl1', 'left', '30% 80%');
onScroll('.fl2', 'left', '30% 80%');
onScroll('#locations-section .h2-small', 'bottom', 'top 80%');
onScroll('.glider-contain', 'bottom', 'top 80%');
onScroll('#plan-section .plan-left', 'bottom', '-10% 80%');
onScroll('#plan-section .plan-right', 'right', 'top 80%');
onScroll('.safety-left', 'left', 'top 80%');
onScroll('.safety-right', 'bottom', 'top 80%');
onScroll('.sustainability-left', 'bottom', 'top 80%');
onScroll('.sustainability-right', 'right', 'top 80%');

// --------------------------- Sound Button ---------------------------

const bgMusic = new Audio('audio/bg-music.mp3');

const soundBtn = document.querySelector('#sound-btn');
soundBtn.addEventListener('click', function(){
  
  if(bgMusic.paused){
    bgMusic.play();
    soundBtn.name = 'volume-up';
  }else{
    bgMusic.pause();
    soundBtn.name = 'volume-mute';
  }
})

// --------------------------- Accordion functionality ---------------------------

let accordionHeadings = document.querySelectorAll(".accordion-heading");
let accordionContents = document.querySelectorAll(".accordion-content");

accordionHeadings.forEach((heading, index) => {
    heading.addEventListener("click", function(){
        let contents = accordionContents[index];
        if (contents.style.maxHeight === contents.scrollHeight + "px"){
            contents.style.maxHeight = "0";
        } else {
            contents.style.maxHeight = contents.scrollHeight + "px";
        }
        let chevrons = document.querySelectorAll(".fa-angle-down");
        let chevron = chevrons[index];
        if (chevron.style.transform === "rotateX(180deg)") {
            chevron.style.transform = "rotateX(0deg)";
        } else {
            chevron.style.transform = "rotateX(180deg)";
        }
    });
});

// --------------------------- Locations Glider ---------------------------
const locationsGlider = new Glider(document.querySelector('.locations-glider'), {
    slidesToShow: 3,
        draggable: false,
        arrows: {
            prev: '.glider-prev',
            next: '.glider-next'
        }
});

// --------------------------- Safety icon bounces with scroll trigger ---------------------------

const tlSafetyIcons = gsap.timeline({
    scrollTrigger: {
        trigger: '#safety-section .icons-container',
        start: "-110% center"
    }
});

tlSafetyIcons
    .to('#safety-section .icon-container', {y: -50, duration: 0.5, ease: "power4.out", stagger: 0.1})
    .to('#safety-section .icon-container', {y: 0, duration: 0.5, ease: "power4.in", stagger: 0.1}, "-=0.5");

// --------------------------- Sustainability icon bounces with scroll trigger ---------------------------

const tlSustainabilityIcons = gsap.timeline({
    scrollTrigger: {
        trigger: '#sustainability-section .icons-container',
        start: "-280% center"
    }
});

tlSustainabilityIcons
    .to('#sustainability-section .icon-container', {y: -50, duration: 0.5, ease: "power4.out", stagger: 0.1})
    .to('#sustainability-section .icon-container', {y: 0, duration: 0.5, ease: "power4.in", stagger: 0.1}, "-=0.5");

// --------------------------- Safety/Sustainability Dialogs ---------------------------

function iconDialog(icon) {
    const dialog = document.querySelector("." + icon + "-dialog");
    const openButton = document.querySelector("." + icon + "-icon");
    const closeButton = dialog.querySelector('sl-button[slot="footer"]');

    openButton.addEventListener('click', () => dialog.show());
    closeButton.addEventListener('click', () => dialog.hide());
}

iconDialog('conditions');
iconDialog('contactable');
iconDialog('wildlife');
iconDialog('buddy');
iconDialog('look');
iconDialog('rubbish');
iconDialog('sunscreen');

// --------------------------- Changing to page 2 ---------------------------

let omeoWreckLink = document.querySelector('.location-learn-more.omeo-wreck');
const page1 = document.querySelector('.page1');
const page2 = document.querySelector('.page2');

function toPage2() {
    let tl = gsap.timeline({delay: 0});
    tl.to(page1, {opacity: 0, duration: 0.2})
        .to(page1, {display: 'none'}, '+=0.1');
    document.documentElement.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    tl.to(page2, {display: 'block'})
    .to(page2, {opacity: 1, duration: 0.5});
    setTimeout(() => { //refreshing the attractions glider with a delay, to re-initalise it and fix layout issues
        attractionsGlider.refresh();
      }, 1000); 
}

omeoWreckLink.addEventListener('click', function(){
    toPage2();
});

// --------------------------- Changing to page 1 ---------------------------

function toPage1(){
    let tl = gsap.timeline({delay: 0});
    tl.to(page2, {opacity: 0, duration: 0.2})
    .to(page2, {display: 'none'}, '+=0.1');
    document.documentElement.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    tl.to(page1, {display: 'block'})
    .to(page1, {opacity: 1, duration: 0.5});
    setTimeout(() => { //refreshing the locations glider with a delay, to re-initalise it and fix layout issues
        locationsGlider.refresh();
      }, 1000); 
}

document.querySelector('.page2 .back-to-home-btn').addEventListener('click', function(){
    toPage1();
});

let page2FooterLinks = document.querySelectorAll('.page2-footer-link');
page2FooterLinks.forEach(link => {
    link.addEventListener('click', function(){
        toPage1();
    });
});


// --------------------------- Gallery on page 2 ---------------------------

let omeoGallery = document.getElementById('omeo-gallery');
lightGallery(omeoGallery, {
    controls: true
});

// --------------------------- Transport buttons on page 2 ---------------------------

let publicTransportBtn = document.querySelector('.transport-left-buttons .public-transport-button');
let carBtn = document.querySelector('.transport-left-buttons .car-button');
let publicTransportContent = document.querySelector('.content-public-transport');
let carContent = document.querySelector('.content-car');

carBtn.addEventListener('click', function(){
    if(carBtn.classList.contains('active')){}
    else{
        publicTransportBtn.classList.remove('active');
        carBtn.classList.add('active');
        var tlContents = gsap.timeline({delay:0});
        tlContents.to(publicTransportContent, {opacity:0, x: -50, duration: 0.5})
            .to(publicTransportContent, {x: 0, display: 'none', duration: 0})
            .to(carContent, {display: 'block', duration: 0})
            .fromTo(carContent, {x: 50}, {x: 0, opacity:1, duration: 0.5});
    }
});

publicTransportBtn.addEventListener('click', function() {
    if(publicTransportBtn.classList.contains('active')){}
    else{
        carBtn.classList.remove('active');
        publicTransportBtn.classList.add('active');
        var tlContents = gsap.timeline({delay:0});
        tlContents.to(carContent, {opacity:0, x: 50, duration: 0.5})
            .to(carContent, {x: 0, display: 'none', duration: 0})
            .to(publicTransportContent, {display: 'block', duration: 0})
            .fromTo(publicTransportContent, {x: -50}, {x: 0, opacity:1, duration: 0.5});
    }
});

// --------------------------- Attractions Glider on page 2 ---------------------------

const attractionsGlider = new Glider(document.querySelector('.attractions-glider'), {
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: false,
      dots: '.dots',
      arrows: {
        prev: '.attractions.glider-prev',
        next: '.attractions.glider-next'
      },
      scrollLock: true
});

// --------------------------- Hamburger Icon Functionality ---------------------------

let hamburgerIcon = document.querySelector('.hamburger-icon');
let hamburgerOptions = document.querySelector('.hamburger-options');
let hamburgerClose = document.querySelector('.cross-container .fa-solid');

hamburgerIcon.addEventListener('click', function(){
    let tl = gsap.timeline({delay: 0});
    tl.fromTo(hamburgerOptions, {opacity: 0, right: -250}, {opacity: 1, right: 0});
});

hamburgerClose.addEventListener('click', function(){
    let tl = gsap.timeline({delay: 0})
    .to(hamburgerOptions, {opacity: 0, right: -250});
});
    