// ======= INTERACTIVE FOOTNOTES (true fade-out before fade-in) =======
const noteNumbers = document.querySelectorAll('.footnote-number');
const footnoteDisplay = document.querySelector('.footnote-display');
let activeId = null; // track which note is currently active

noteNumbers.forEach(num => {
  num.addEventListener('click', (e) => {
    e.stopPropagation();
    const id = num.dataset.note;
    const noteContent = document.getElementById(`footnote-${id}`).innerHTML;

    // If clicking the same footnote → fade it out and deactivate
    if (activeId === id) {
      num.classList.remove('active');
      activeId = null;
      footnoteDisplay.classList.remove('visible');
      return;
    }

    // Remove active state from all
    noteNumbers.forEach(n => n.classList.remove('active'));
    num.classList.add('active');

    // Handle transitions
    if (activeId) {
      // 1️⃣ Fade out current note completely first
      footnoteDisplay.classList.remove('visible');

      setTimeout(() => {
        // 2️⃣ Then update content and position AFTER fade-out
        const rect = num.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        // center the box vertically with the number
        const boxHeight = footnoteDisplay.offsetHeight;
        footnoteDisplay.style.top = `${rect.top + scrollTop - boxHeight / 2 + rect.height / 2}px`;

        footnoteDisplay.innerHTML = noteContent;

        // 3️⃣ Fade in new note
        footnoteDisplay.classList.add('visible');
        activeId = id;
      }, 200); // match this with your CSS transition duration (0.2s)
    } else {
      // If nothing visible yet → just show immediately
      const rect = num.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
   
      // center the box vertically with the number
      footnoteDisplay.innerHTML = noteContent; // first set content so height is correct
      const boxHeight = footnoteDisplay.offsetHeight;
      footnoteDisplay.style.top = `${rect.top + scrollTop - boxHeight / 2 + rect.height / 2}px`;


      footnoteDisplay.innerHTML = noteContent;
      footnoteDisplay.classList.add('visible');
      activeId = id;
    }
  });
});

// ======= CURSOR GLOW EFFECT =======
const glow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
  // Center the glow around the cursor
  const glowWidth = glow.offsetWidth / 2;
  const glowHeight = glow.offsetHeight / 2;
  glow.style.transform = `translate(${e.clientX - glowWidth}px, ${e.clientY - glowHeight}px)`;
});

// Handle mode switching
const soulBtn = document.querySelector('.mode-btn');
if (soulBtn && !soulBtn.id) {
  soulBtn.addEventListener('click', () => {
    window.location.href = 'soul.html';
  });
}

const dataBtn = document.getElementById('dataModeBtn');
if (dataBtn) {
  dataBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}


function checkScreenSize() {
  const overlay = document.querySelector('.desktop-warning');
  if (window.innerWidth < 600) { // mobile breakpoint
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // prevent scrolling
  } else {
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Run on load and on resize
window.addEventListener('load', checkScreenSize);
window.addEventListener('resize', checkScreenSize);