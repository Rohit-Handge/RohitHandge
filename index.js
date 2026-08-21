// Certifications Slider Drag Logic (Guarded against null errors)
const slider = document.querySelector('.cert-slider-wrapper');

if (slider) {
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  const stopDragging = () => {
    isDown = false;
    slider.classList.remove('active');
  };

  slider.addEventListener('mouseleave', stopDragging);
  slider.addEventListener('mouseup', stopDragging);

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });
}

// 1. GSAP Setup & Hero Zoom
gsap.registerPlugin(ScrollTrigger);

const heroTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero-scroll-wrapper",
    start: "top top",
    end: "bottom bottom",
    scrub: 0.5,
  }
});

heroTl.to("#imgFull", { opacity: 0, scale: 1.05, ease: "power1.inOut" }, 0);
heroTl.to("#imgClose", { opacity: 1, scale: 1.1, ease: "power1.inOut" }, 0);
heroTl.to("#glow", { scale: 1.3, opacity: 0.9 }, 0);
heroTl.to(".main-title", { scale: 1.03, y: -20, opacity: 0.85, ease: "power1.inOut" }, 0);

// 2. GSAP Pinned Horizontal Scroll for Tech Stack
const track = document.getElementById("techTrack");

function getScrollAmount() {
  if (!track) return 0;
  return -(track.scrollWidth - window.innerWidth + window.innerWidth * 0.1);
}

if (track) {
  gsap.to(track, {
    x: getScrollAmount,
    ease: "none",
    scrollTrigger: {
      trigger: ".tech-pinned-wrapper",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      invalidateOnRefresh: true
    }
  });
}

// 3. Continuous Scroll Re-trigger Animation for Sections
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('appear', entry.isIntersecting);
  });
}, { 
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px" 
});

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

// 4. Chart.js SGPA Initialization
const sgpaEl = document.getElementById('sgpaChart');
if (sgpaEl) {
  const ctx = sgpaEl.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, 'rgba(0, 113, 227, 0.4)');
  gradient.addColorStop(1, 'rgba(0, 113, 227, 0.0)');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
      datasets: [{
        label: 'SGPA Trend',
        data: [9.0, 9.45, 8.95, 9.64, 9.23, 9.77],
        borderColor: '#0071e3',
        backgroundColor: gradient,
        borderWidth: 3,
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#0071e3',
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#6e6e73', font: { family: 'Inter', size: 12 } } }
      },
      scales: {
        x: { ticks: { color: '#a0a5b1', font: { size: 10 } }, grid: { color: 'rgba(0, 0, 0, 0.03)' } },
        y: { 
          min: 8.9, 
          max: 10.0, 
          ticks: { color: '#a0a5b1', font: { size: 10 } }, 
          grid: { color: 'rgba(0, 0, 0, 0.03)' } 
        }
      }
    }
  });
}

// Internship Slider Setup
let currentInternshipSlide = 0;
const totalInternshipSlides = 2;

function goToSlide(slideIndex) {
  currentInternshipSlide = slideIndex;
  const internshipTrack = document.getElementById("internshipTrack");
  const dots = document.querySelectorAll("#sliderDots .dot");

  if (internshipTrack) {
    internshipTrack.style.transform = `translateX(-${slideIndex * 100}%)`;
  }

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === slideIndex);
  });
}

setInterval(() => {
  currentInternshipSlide = (currentInternshipSlide + 1) % totalInternshipSlides;
  goToSlide(currentInternshipSlide);
}, 5000);

// 5. Achievement Showcase Gallery Logic
const achievementData = [
  { src: "cricket.png", title: "Maffick 2025-26 Sports", description: "Participated in Mens Tennis Ball Cricket Tournament" },
  { src: "2ndyr1.jpeg", title: "Academic Excellence — 1st Rank", description: "Secured 1st Rank in Second Year" },
  { src: "2ndyr2.jpeg", title: "Academic Excellence — 1st Rank", description: "Recognized for maintaining top academic standing in coursework." },
  { src: "gate1.jpeg", title: "MSPA Gate Card Recognition" },
  { src: "gate2.jpeg", title: "MSPA Gate Card Recognition" },
  { src: "1styrtop.jpg", title: "Academic Merit — 3rd Rank", description: "Secured 3rd Rank in First Year" },
  { src: "1styrprojectappreciation.jpg", title: "Project Appreciation", description: "Recognized for developing 'KKART', a peer-to-peer campus marketplace." },
  { src: "hod1.jpeg", title: "Academic Commendation by HOD", description: "Honored to receive the DELD reference book directly from the Head of Department." },
  { src: "fxebook.jpg", title: "Special Moment" },
  { src: "abb1.jpeg", title: "ABB India Ltd", description: "Successfully completed stock audit activity for ABB India." },
  { src: "essaywriting1styr.jpg", title: "ISTE Essay Writing Competition", description: "Secured 2nd consolation (Marathi)" }
];

const mainDisplayImg = document.getElementById("mainDisplayImg");
const descContainer = document.getElementById("imgDescription");
const descTitle = document.getElementById("descTitle");
const descText = document.getElementById("descText");
const ladderTrack = document.getElementById("ladderTrack");

let currentIndex = 0;
let ladderItems = [];

function selectAchievement(index) {
  currentIndex = index % achievementData.length;
  
  ladderItems.forEach((item, i) => {
    item.classList.toggle("active", i % achievementData.length === currentIndex);
  });

  if (mainDisplayImg) mainDisplayImg.classList.add("fade-out");
  if (descContainer) descContainer.classList.add("fade-out");

  setTimeout(() => {
    const currentData = achievementData[currentIndex];
    
    if (mainDisplayImg) {
      mainDisplayImg.src = currentData.src;
      mainDisplayImg.alt = currentData.title || "";
    }
    if (descTitle) descTitle.textContent = currentData.title || "";
    if (descText) descText.textContent = currentData.description || "";

    if (mainDisplayImg) mainDisplayImg.classList.remove("fade-out");
    if (descContainer) descContainer.classList.remove("fade-out");
  }, 150);
}

function createLadderItem(item, index) {
  const itemDiv = document.createElement("div");
  itemDiv.className = `ladder-item ${index === 0 ? "active" : ""}`;
  itemDiv.innerHTML = `<img src="${item.src}" alt="${item.title || ''}">`;
  itemDiv.onclick = () => selectAchievement(index);
  return itemDiv;
}

function initLadder() {
  if (!ladderTrack) return;
  
  ladderTrack.innerHTML = "";
  
  // Single duplicate pass (creates loop set)
  [...achievementData, ...achievementData].forEach((item, index) => {
    ladderTrack.appendChild(createLadderItem(item, index % achievementData.length));
  });

  ladderItems = document.querySelectorAll(".ladder-item");
  selectAchievement(0);
}

let scrollPosition = 0;
const scrollSpeed = 0.5;

function autoScroll() {
  if (!ladderTrack || ladderItems.length === 0) return;

  scrollPosition -= scrollSpeed;
  const firstItem = ladderItems[0];
  const computedGap = window.innerWidth <= 768 ? 15 : 17;
  const dynamicItemHeight = firstItem ? (firstItem.offsetHeight + computedGap) : 120;
  const resetPoint = -achievementData.length * dynamicItemHeight; 

  if (scrollPosition <= resetPoint) {
    scrollPosition = 0;
  }

  ladderTrack.style.transform = `translateY(${scrollPosition}px)`;

  const activeIndexFromScroll = Math.floor(Math.abs(scrollPosition) / dynamicItemHeight) % achievementData.length;
  if (activeIndexFromScroll !== currentIndex) {
    selectAchievement(activeIndexFromScroll);
  }

  requestAnimationFrame(autoScroll);
}

initLadder();
requestAnimationFrame(autoScroll);

function toggleInfo(element) {
  const card = element.closest('.project-card');
  const panel = card?.querySelector('.project-info-panel');
  if (panel) panel.classList.toggle('active');
}

