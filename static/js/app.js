"use strict";
// CHANGES JOB ROLE TEXT 

/* 
        --------------------------------------------------------------------
        DYNAMIC TEXT CHANGING IN HERO IMAGE
        --------------------------------------------------------------------
*/

// ARRAY OF JOBS
const jobs = [
    "Back-End Developer",
    "Machine Learning Enthusiast",
    "Cyber-Security Expert",
    "Networking Guru",
    "Linux Guru"
];

// DOM ELEMENTS
const jobRoleDomString = "heading-primary--sub";
const hidejobRoleDomString = "heading-primary--sub--hide";

// SELECTING DOM ELEMENTS
const jobRole = document.querySelector(`.${jobRoleDomString}`);

// VARIBALE TO TRACK CURRENT JOB TYPE
let counter = 1;

// CHANGING ASYNCHRONOUSLY
setInterval(() => {
    if (jobRole.className.includes(hidejobRoleDomString)) {
        // CHANGE JOB TYPE
        if (counter < jobs.length) { 
            jobRole.textContent = jobs[counter];
            counter += 1;
        } else {
            // RESET JOB TYPE
            counter = 0;
            jobRole.textContent = jobs[counter];
            // NORMALIZES AFTER RESET
            counter += 1;
        }
    }

    // HIDING AND SHOWING JOB TYPE
    jobRole.classList.toggle(hidejobRoleDomString);
}, 1100);

/* 
        --------------------------------------------------------------------
        FIXED HEADER THAT RESPONDS TO SCROLL EVENT
        --------------------------------------------------------------------
*/

// DOM ELEMENTS
const DOMStrings = {
    headerNavWrapper: "header__nav-wrapper",
    headerNavWrapperActive: "header__nav-wrapper--active",
    headerLogo: "header__logo",
    headerLink: "header__link",
    colorBlack: "color-black"
};

let count = 0;

// ON RELOAD CHECK IF PAGE IS NOT AT TOP AND APPLY STYLING
const scrollY = window.scrollY;
// const scrollY = document.documentElement.style.getPropertyValue("--scroll-y");

if (scrollY > 20 && count == 0) {
    fixedNav(DOMStrings, "add");
    count += 1;
}

window.addEventListener("scroll", () => {

    // MAKE NAV FIXED
    if (window.scrollY > 20 && count == 0) {
        fixedNav(DOMStrings, "add");
        count += 1;
    } 
    // REMOVE FIXED NAV
    else if (window.scrollY < 20 && count == 1) {
        fixedNav(DOMStrings, "remove");
        count = 0;
    }
});


/*  
    ---------******************---------
    MAKES NAV FIXED OR NOT FIXED DEPENDING ON THE TYPE OF job PASSED IN
    ---------******************---------
 */
function fixedNav(DOMStrings, job) {
    // MAKE NAV FIXED
    if (job === "add") {
        const headernavWrapper = document.querySelector(`.${DOMStrings.headerNavWrapper}`);
        headernavWrapper.classList.add(DOMStrings.headerNavWrapperActive);

        // CHANGE HEADER LOGO COLOR
        const headerLogo = document.querySelector(`.${DOMStrings.headerLogo}`);
        headerLogo.classList.add(DOMStrings.colorBlack);

        // CHANGE HEADER LINKS COLOR
        const headerLinks = document.querySelectorAll(`.${DOMStrings.headerLink}`);
        Array.from(headerLinks, (current) => {
            current.classList.add(DOMStrings.colorBlack);
        })
    }

    // REMOVE FIXED NAV
    else if (job === "remove") {
        const headernavWrapper = document.querySelector(`.${DOMStrings.headerNavWrapper}`);
        headernavWrapper.classList.remove(DOMStrings.headerNavWrapperActive);

        // CHANGE HEADER LOGO COLOR
        const headerLogo = document.querySelector(`.${DOMStrings.headerLogo}`);
        headerLogo.classList.remove(DOMStrings.colorBlack);

        // CHANGE HEADER LINKS COLOR
        const headerLinks = document.querySelectorAll(`.${DOMStrings.headerLink}`);
        Array.from(headerLinks, (current) => {
            current.classList.remove(DOMStrings.colorBlack);
        })
    }
}

/* 
        --------------------------------------------------------------------
        RESPONSIVE NAVIGAITON
        --------------------------------------------------------------------
*/


// DOM CLASS NAMES
const DOMElements = {
    navigationIcon: "navigation__icon-wrapper",

    navigationBackground: "navigation__background", // OPACTIY DARK BACKGROUND
    navigationBackgroundActive: "navigation__background--active", // OPACTIY DARK BACKGROUND ACTIVATED

    navigationNav: "navigation__nav", // NAVIGATION NAV
    navigationNavActive: "navigation__nav--active", // NAVIGATION NAV


    navigationCloseIcon: "navigation__close-box", // CLOSE (X) ICON
    navigationCloseIconActive: "navigation__close-box--active", // CLOSE (X) ICON ACTIVATED

    navigationListWrapper: "navigation__list-wrapper", // WHITE BOX IN NAVIGATION
    navigationListWrapperActive: "navigation__list-wrapper--active" // WHITE BOX IN NAVIGATION ACTIVATED
}

// SELECTED DOM ELEMENTS (PREVENT  OVERHEAD OF SELECCTING ELEMETS OVER AND OVER AGAIN)
const DOMElementsMAP = new Map();
DOMElementsMAP.set("navigationIcon", document.querySelector(`.${DOMElements.navigationIcon}`));

DOMElementsMAP.set("navigationBackground", document.querySelector(`.${DOMElements.navigationBackground}`));

DOMElementsMAP.set("navigationCloseIcon", document.querySelector(`.${DOMElements.navigationCloseIcon}`));

DOMElementsMAP.set("navigationNav", document.querySelector(`.${DOMElements.navigationNav}`));

DOMElementsMAP.set("navigationListWrapper", document.querySelector(`.${DOMElements.navigationListWrapper}`));

/*  
    ---------------------------------------
    IMPLEMENTING NAV OPENEING AND FIXED NAV
    ---------------------------------------
*/
DOMElementsMAP.get("navigationIcon").addEventListener("click", () => {
    // 1. DISPLAY NAVIGATION
    navOpenClose(DOMElementsMAP, DOMElements, "add");

    
    // 2. MAKE BUDY FIXED
    const scrollY = document.documentElement.style.getPropertyValue("--scroll-y");
    
    const body = document.body;
    body.style.position = "fixed";
    body.style.overflowY = "hidden";
    body.style.height = "100vh";
    // body.style.top = `-${scrollY}`; // BUG WITH NAV BAR FIX IT, WHEN ACTIVE NAV DOES NOT WORk
});


/*      
    --------------------------------------
    IMPLEMENTING NAV CLOSING AND FIXED NAV 
    --------------------------------------
*/
DOMElementsMAP.get("navigationCloseIcon").addEventListener("click", () => {
    // 1. CLOSE NAVIGATION
    navOpenClose(DOMElementsMAP, DOMElements, "remove");

    // 2. MAKE BUDY UNFIXED
    const scrollY = document.documentElement.style.getPropertyValue("--scroll-y");

    const body = document.body;
    body.style.position = "";
    body.style.overflowY = "";
    body.style.height = "";
    body.style.top = "";
    
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
    console.log(scrollY);
});


// SETTING THE CURRENT USER LOCATION
window.addEventListener("scroll", () => {
    document.documentElement.style.setProperty("--scroll-y", `${window.scrollY}px`);
});

// A FUNCTION THAT OPENS OR CLOSES THE NAV BASED ON ARGUMENT PASSED
function navOpenClose(DOMElementsMAP, DOMElements, job) {

    // OPEN NAV
    if (job === "add") {
        // 1. DISPLAY NAVIGATION BACKGROUND
        DOMElementsMAP.get("navigationBackground").classList.add(DOMElements.navigationBackgroundActive);

        // 2. DISPLAY NAVIGATION NAV
        DOMElementsMAP.get("navigationNav").classList.add(DOMElements.navigationNavActive);

        // 3. DISPLAY NAVIGATION WHITE BOX (ListWrapper)
        DOMElementsMAP.get("navigationListWrapper").classList.add(DOMElements.navigationListWrapperActive);

        // 4. DISPLAY NAVIGATION CLOSE ICON (SCALED IN  FROM 0)
        DOMElementsMAP.get("navigationCloseIcon").classList.add(DOMElements.navigationCloseIconActive);
    }

    // CLOSE NAV
    else if (job === "remove") {
        // 1. REMOVE NAVIGATION BACKGROUND
        DOMElementsMAP.get("navigationBackground").classList.remove(DOMElements.navigationBackgroundActive);

        // 2. REMOVE NAVIGATION NAV
        DOMElementsMAP.get("navigationNav").classList.remove(DOMElements.navigationNavActive);

        // 3. REMOVE NAVIGATION WHITE BOX (ListWrapper)
        DOMElementsMAP.get("navigationListWrapper").classList.remove(DOMElements.navigationListWrapperActive);

        // 4. REMOVE NAVIGATION CLOSE ICON (SCALED IN  FROM 0)
        DOMElementsMAP.get("navigationCloseIcon").classList.remove(DOMElements.navigationCloseIconActive);
    }
}