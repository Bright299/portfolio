// Typing effect
const roles = [
  'Penetration Tester',
  'Ethical Hacker',
  'Full-Stack Developer',
  'Founder, Proton Company Limited'
];

let roleIndex = 0;
let characterIndex = 0;
let isDeleting = false;
const typedElement = document.getElementById('typed');

function typeRole() {
  const word = roles[roleIndex];

  typedElement.textContent = isDeleting
    ? word.slice(0, characterIndex--)
    : word.slice(0, characterIndex++);

  if (!isDeleting && characterIndex > word.length) {
    isDeleting = true;
    setTimeout(typeRole, 1400);
    return;
  }

  if (isDeleting && characterIndex < 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(typeRole, isDeleting ? 40 : 80);
}

typeRole();

// Matrix rain
const canvas = document.getElementById('matrix');
const context = canvas.getContext('2d');

function resizeMatrix() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeMatrix();
window.addEventListener('resize', resizeMatrix);

const characters = '01ABCDEF<>/{}$#';
const columnCount = Math.floor(window.innerWidth / 16);
const drops = Array(columnCount).fill(1);

setInterval(() => {
  context.fillStyle = 'rgba(3, 6, 3, 0.1)';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#00ff6a';
  context.font = '14px Fira Code';

  drops.forEach((y, index) => {
    const character = characters[Math.floor(Math.random() * characters.length)];
    context.fillText(character, index * 16, y * 16);

    if (y * 16 > canvas.height && Math.random() > 0.975) {
      drops[index] = 0;
    }

    drops[index]++;
  });
}, 50);

// 3D tilt on cards
document.querySelectorAll('.tilt').forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const bounds = card.getBoundingClientRect();
    const positionX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const positionY = (event.clientY - bounds.top) / bounds.height - 0.5;

    card.style.transform = `rotateY(${positionX * 18}deg) rotateX(${-positionY * 18}deg) translateZ(14px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'none';
  });
});

// Scroll reveal and skill bars
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      entry.target.querySelectorAll('.bar i').forEach((bar) => {
        bar.style.width = `${bar.dataset.w}%`;
      });
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((section) => {
  observer.observe(section);
});
