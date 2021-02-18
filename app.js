// gsap timelines
var tl = gsap.timeline({ defaults: { delay: 1 } });
var tl2 = gsap.timeline({
  defaults: { duration: 1.5, delay: 1 },
});
var tl3 = gsap.timeline({
  defaults: { duration: 1.5 },
});
var tl4 = gsap.timeline({
  defaults: { duration: 1, delay: 1 },
});

tl.from(".btn-info", { duration: 1, opacity: 0, y: 100 }).to(".keyboard", {
  duration: 1.5,
  ease: Back.easeOut.config(2),
  y: -15,
});

// get html elements
var home = document.querySelector("#home-link");
var about = document.querySelector("#about-link");
var btnAbout = document.querySelector("#btn-about-link");
var projects = document.querySelector("#projects-link");
var contact = document.querySelector("#contact-link");

var links = document.querySelectorAll(".navbar li a");

let count = 0;

// Hamburger menu
var nav = document.querySelector(".navbar ");
var navList = document.querySelector(".navbar ul");
var toggle = document.getElementById("toggle");
var label = document.getElementById("label");

var homeSection = document.querySelector(".home");
var aboutSection = document.querySelector(".about");
var projectsSection = document.querySelector(".projects");
var contactSection = document.querySelector(".contact");

var projectOne = document.querySelector(".project__one");
var projectTwo = document.querySelector(".project__two");

var contactForm = document.querySelector(".contact__form");

// label.innerHTML = "&#9776;";

function toggleMenu() {
  if (toggle.checked) {
    navList.style.display = "flex";
    nav.style.backgroundColor = "var(--blue-color)";
    nav.animate([{ opacity: 0 }, { opacity: 1 }], 500);
    label.innerHTML = "&#10005;";

    // top 25%
    homeSection.style.top = "25%";
    aboutSection.style.top = "25%";
    projectsSection.style.top = "25%";
    contactSection.style.top = "25%";

    // projects
    projectsSection.style.overflow = "unset";

    projectOne.style.overflow = "auto";
    projectOne.style.justifyContent = "unset";
    projectTwo.style.overflow = "auto";
    projectTwo.style.justifyContent = "unset";

    // contact
    contactSection.style.overflow = "unset";
    contactForm.style.overflow = "auto";
  } else {
    navList.style.display = "none";
    nav.animate([{ opacity: 1 }, { opacity: 0 }], 500);

    setTimeout(() => {
      nav.style.backgroundColor = "transparent";
      label.innerHTML = "&#9776;";

      // top 0
      homeSection.style.top = "0";
      aboutSection.style.top = "0";
      projectsSection.style.top = "0";
      contactSection.style.top = "0";

      // projects
      projectsSection.style.overflow = "auto";
      projectOne.style.overflow = "unset";
      projectTwo.style.overflow = "unset";

      // contact
      contactSection.style.overflow = "auto";
      contactForm.style.overflow = "unset";
    }, 500);
  }
}

// sections timelines
var tlH = gsap.timeline({ defaults: { duration: 0.5 } });
var tlA = gsap.timeline({ defaults: { duration: 0.5 } });
var tlP = gsap.timeline({ defaults: { duration: 0.5 } });
var tlC = gsap.timeline({ defaults: { duration: 0.5 } });

home.addEventListener("click", () => {
  count++;
  if (count <= 1) {
    // hide sections
    tlA.to(".about", { display: "none", opacity: 0 });
    tlP.to(".projects", { display: "none", opacity: 0 });
    tlC.to(".contact", { display: "none", opacity: 0 });

    // display section
    tlH.to(".home", { delay: 0.5, display: "flex", opacity: 1 });

    for (i = 0; i < links.length; i++) {
      links[i].classList.remove("active");
      home.classList.add("active");
    }

    tl.restart();

    setTimeout(() => {
      count = 0;
    }, 1000);
  }
});

function onClickAbout() {
  count++;

  tl2.to(".personal-svg", { y: -20, repeat: 6, yoyo: true });

  if (count <= 1) {
    // hide sections
    tlH.to(".home", { display: "none", opacity: 0 });
    tlP.to(".projects", { display: "none", opacity: 0 });
    tlC.to(".contact", { display: "none", opacity: 0 });

    // display section
    tlA.to(".about", { delay: 0.5, display: "flex", opacity: 1 });

    for (i = 0; i < links.length; i++) {
      links[i].classList.remove("active");
      about.classList.add("active");
    }

    tl2.restart();

    setTimeout(() => {
      count = 0;
    }, 1000);
  }
}

projects.addEventListener("click", () => {
  count++;

  tl3
    .from(".project__one", { x: -500, opacity: 0, delay: 1, repeat: 0 })
    .from(".project__two", { x: 500, opacity: 0, delay: 0.5, repeat: 0 });

  if (count <= 1) {
    // hide sections
    tlH.to(".home", { display: "none", opacity: 0 });
    tlA.to(".about", { display: "none", opacity: 0 });
    tlC.to(".contact", { display: "none", opacity: 0 });

    // display section
    tlP.to(".projects", { delay: 0.5, display: "grid", opacity: 1 });

    for (i = 0; i < links.length; i++) {
      links[i].classList.remove("active");
      projects.classList.add("active");
    }

    setTimeout(() => {
      count = 0;
    }, 1000);
  }
});

function onClickContact() {
  count++;

  tl4.from(".contact__form", { y: 200, opacity: 0 });

  if (count <= 1) {
    // hide sections
    tlH.to(".home", { display: "none", opacity: 0 });
    tlA.to(".about", { display: "none", opacity: 0 });
    tlP.to(".projects", { display: "none", opacity: 0 });

    // display section
    tlC.to(".contact", { delay: 0.5, display: "flex", opacity: 1 });

    for (i = 0; i < links.length; i++) {
      links[i].classList.remove("active");
      contact.classList.add("active");
    }
    setTimeout(() => {
      count = 0;
    }, 1000);
  }
}

// HANDLE MAIL
window.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("contact-form");
  var status = document.getElementById("status");

  function success() {
    form.reset();
    status.classList.add("success");
    status.innerHTML = "Mail has been sent successfully";
  }

  function error() {
    status.classList.add("error");
    status.innerHTML = "Something went wrong. Try again!";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  });
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}
