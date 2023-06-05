const header= document.querySelector("header");
const ml_section= document.querySelector(".milestones");
const ml_counters=document.querySelectorAll(".number span");
const prt_section=document.querySelector(".portfolio");
const zoom_icons=document.querySelectorAll(".zoom-icon");
const modal_overlay=document.querySelector(".modal-overlay");
const images =document.querySelectorAll(".images img");
const prev_btn=document.querySelector(".prev-btn");
const next_btn=document.querySelector(".next-btn");


const first_skill=document.querySelector(".skill:first-child");
const sk_counters=document.querySelectorAll(".counter span");
const progress_bars=document.querySelectorAll(".skills svg circle");

const links = document.querySelectorAll(".nav-link");
const toggle_btn=document.querySelector(".toggle-btn");
const hamburger=document.querySelector(".hamburger");

window.addEventListener("scroll",()=>{
    activeLink();
    if(!skillsPlayed)skillsCounter();
    if(!mlPlayed) mlcounters();
});

/* --------------- Grab elements from DOM --------------- */

/* --------------- Sticky Navbar --- ------------ */
function stickyNavbar(){
    header.classList.toggle("scrolled", window.pageYOffset > 0);
}
stickyNavbar();

window.addEventListener("scroll", stickyNavbar);

/* --------------- Reveal Animation --------------- */
let sr = ScrollReveal(
    {
    duration: 2500,
    distance:"60px",
    });
    sr.reveal(".showcase-info", {delay: 200});
    sr.reveal(".showcase-image", {origin: top, delay: 400});



/* --------------- Skills Progress Bar Animation --------------- */
function hasReached(el){
    let topPosition = el.getBoundingClientRect().top;

    if(window.innerHeight>=topPosition+ el.offsetHeight) return true;
        return false;
}
function updateCount(num, maxNum){
    let currentNum = +num.innerText;
    if (currentNum < maxNum){
        num.innerText = currentNum +1;
        setTimeout(() => {
            updateCount(num, maxNum);
        }, 12);
    }
}
let skillsPlayed = false;
function skillsCounter(){
    if(!hasReached(first_skill)) return;
    skillsPlayed = true;
    sk_counters.forEach((counter, i) => {
        let target =+counter.dataset.target;
        let strokeValue = 427 - 427 * (target / 100);

        progress_bars[i].style.setProperty("--target", strokeValue);
        setTimeout(() => {
            updateCount(counter, target);
        }, 400);
    
    
});

    sk_counters.forEach((counter, i) =>{
        let target = +counter.dataset.target;
        // let strokeValue =+counter.dataset.target;
        let strokeValue =427 - 427 * (target / 100);
        progress_bars[i].style.setProperty("--target", strokeValue);
    });
    progress_bars.forEach(
        (p) => (p.style.animation="progress 2s ease-in-out forwards")
        );
}

const swiper = new Swiper(".swiper",{
    loop: true,
    speed:500,
    autoplay: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
},
});

function activeLink(){
    let sections = document.querySelectorAll("section[id]");
    let passedSections = Array.from(sections)
    .map((sct, i) => {
        return{
            y: sct.getBoundingClientRect().top - header.offsetHeight,
            id: i,
        };
    })
    .filter((sct) => sct.y <= 0);


    let currSectionID = passedSections.at(-1).id;
    links.forEach(l => l.classList.remove("active"));
    links[currSectionID].classList.add("active"); 

}
activeLink();

hamburger.addEventListener("click", () => {
    document.body.classList.toggle("open");
    document.body.classList.toggle("stopScrolling");
});
links.forEach((link) =>
 link.addEventListener("click", () => {
    document.body.classList.remove("open");
    document.body.classList.remove("stopScrolling");
 })
);