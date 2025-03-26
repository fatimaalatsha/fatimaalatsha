const themeToggle = document.getElementById("themeToggle");
const langToggle = document.getElementById("langToggle");
const body = document.body;
const starsContainer = document.getElementById("stars");
const cloudsContainer = document.getElementById("clouds");
const navLinks = document.querySelectorAll("nav ul li a");
const sections = document.querySelectorAll(".section");
const sun = document.getElementById("sun");
const sunray = document.getElementById("sunray");
const moon = document.getElementById("moon");
const moonlight = document.getElementById("moonlight");

// All elements that have translations
const translatedElements = document.querySelectorAll("[data-en][data-ar]");

// Create stars
function createStars() {
  starsContainer.innerHTML = "";
  const numberOfStars = 150;

  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    // Random position
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;

    // Random size
    const size = Math.random() * 3;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // Random twinkle delay
    star.style.animationDelay = `${Math.random() * 3}s`;

    starsContainer.appendChild(star);
  }
}

// Create clouds
function createClouds() {
  cloudsContainer.innerHTML = "";
  const numberOfClouds = 10;

  for (let i = 0; i < numberOfClouds; i++) {
    const cloud = document.createElement("div");
    cloud.classList.add("cloud");

    // Random position
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    cloud.style.left = `${x}px`;
    cloud.style.top = `${y}px`;

    // Random size
    const size = Math.random() * 100 + 50;
    cloud.style.width = `${size}px`;
    cloud.style.height = `${size * 0.6}px`;

    // Random float duration
    const duration = Math.random() * 60 + 30;
    cloud.style.animationDuration = `${duration}s`;

    // Random delay
    cloud.style.animationDelay = `-${Math.random() * 30}s`;

    cloudsContainer.appendChild(cloud);
  }
}

// Position celestial elements
function positionCelestialElements() {
  // For desktop only, on mobile they stay in corner
  if (window.innerWidth > 768) {
    // Random position for sun within the top part of the navbar
    const sunX = Math.random() * (window.innerWidth / 3) + 20;
    const sunY = Math.random() * 30 + 15;
    sun.style.left = `${sunX}px`;
    sun.style.top = `${sunY}px`;
    sunray.style.left = `${sunX - 5}px`;
    sunray.style.top = `${sunY - 5}px`;

    // Position moon on the opposite side
    const moonX =
      window.innerWidth - (Math.random() * (window.innerWidth / 3) + 60);
    const moonY = Math.random() * 30 + 15;
    moon.style.left = `${moonX}px`;
    moon.style.top = `${moonY}px`;
    moonlight.style.left = `${moonX - 10}px`;
    moonlight.style.top = `${moonY - 10}px`;
  }
}

// Switch language function
function switchLanguage(toArabic) {
  if (toArabic) {
    body.classList.add("rtl");
    langToggle.textContent = "English";

    // Update all translated elements
    translatedElements.forEach((element) => {
      const arabicText = element.getAttribute("data-ar");
      // For list items with HTML inside
      if (element.tagName === "LI" || element.tagName === "P") {
        element.innerHTML = arabicText;
      } else {
        element.textContent = arabicText;
      }
    });
  } else {
    body.classList.remove("rtl");
    langToggle.textContent = "العربية";

    // Update all translated elements
    translatedElements.forEach((element) => {
      const englishText = element.getAttribute("data-en");
      // For list items with HTML inside
      if (element.tagName === "LI" || element.tagName === "P") {
        element.innerHTML = englishText;
      } else {
        element.textContent = englishText;
      }
    });
  }
}

// Check for saved theme and language preferences
if (localStorage.getItem("darkMode") === "true") {
  body.classList.add("dark-mode");
  themeToggle.textContent = "Switch to Light Mode";
}

if (localStorage.getItem("arabicMode") === "true") {
  switchLanguage(true);
}

// Theme toggle functionality
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    themeToggle.textContent = body.classList.contains("rtl")
      ? "الوضع المضيء"
      : "Switch to Light Mode";
    localStorage.setItem("darkMode", "true");
  } else {
    themeToggle.textContent = body.classList.contains("rtl")
      ? "الوضع المظلم"
      : "Switch to Dark Mode";
    localStorage.setItem("darkMode", "false");
  }
});

// Language toggle functionality
langToggle.addEventListener("click", () => {
  const isCurrentlyArabic = body.classList.contains("rtl");
  switchLanguage(!isCurrentlyArabic);
  localStorage.setItem("arabicMode", !isCurrentlyArabic);

  // Update theme toggle text based on current language and theme
  if (body.classList.contains("dark-mode")) {
    themeToggle.textContent = body.classList.contains("rtl")
      ? "الوضع المضيء"
      : "Switch to Light Mode";
  } else {
    themeToggle.textContent = body.classList.contains("rtl")
      ? "الوضع المظلم"
      : "Switch to Dark Mode";
  }
});

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      // Smooth scroll to the section
      targetSection.scrollIntoView({
        behavior: "smooth",
      });

      // Update active link
      navLinks.forEach((navLink) => navLink.classList.remove("active"));
      link.classList.add("active");
    }
  });
});

// Highlight active section based on scroll position
function highlightActiveSection() {
  const scrollPosition = window.scrollY;

  // Determine which section is currently in view
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100; // Offset for header height
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionId = "#" + section.id;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      // Remove active class from all navigation links
      navLinks.forEach((link) => link.classList.remove("active"));

      // Add active class to the corresponding navigation link
      const activeLink = document.querySelector(
        `nav ul li a[href="${sectionId}"]`
      );
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });
}

// Initialize stars and clouds
createStars();
createClouds();
positionCelestialElements();

// Add scroll event listener for highlighting active section
window.addEventListener("scroll", highlightActiveSection);

// Recreate stars, clouds and reposition celestial elements when window is resized
window.addEventListener("resize", () => {
  createStars();
  createClouds();
  positionCelestialElements();
});

// Set initial active section on page load
document.addEventListener("DOMContentLoaded", () => {
  highlightActiveSection();

  // Check if there's a hash in the URL and scroll to that section
  if (window.location.hash) {
    const targetSection = document.querySelector(window.location.hash);
    if (targetSection) {
      setTimeout(() => {
        targetSection.scrollIntoView({
          behavior: "smooth",
        });

        // Update active link
        navLinks.forEach((navLink) => navLink.classList.remove("active"));
        const activeLink = document.querySelector(
          `nav ul li a[href="${window.location.hash}"]`
        );
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }, 100);
    }
  } else {
    // Set first nav link as active by default
    if (navLinks.length > 0) {
      navLinks[0].classList.add("active");
    }
  }
});
