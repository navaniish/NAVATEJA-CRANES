/* ==========================================================================
   NAVATEJA CRANES — 3D Immersion & Spatial Physics Engine
   Location Anchor: Jammalamadugu, AP (PIN 516434)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  init3DBackgroundCanvas();
  init3DCardTiltEngine();
  setTimeout(drawSpiralConnectors, 300);
  initCounterAnimations();
  initParallaxEffects();
  init3DScrollDepthObserver();
  initMobileMenu();

  window.addEventListener('resize', () => {
    setTimeout(drawSpiralConnectors, 100);
  });
});

/* ==========================================================================
   MOBILE MENU TOGGLE
   ========================================================================== */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const navbar = document.querySelector('.navbar');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      if (navbar) navbar.classList.toggle('menu-open');
      document.body.classList.toggle('mobile-menu-expanded');
    });

    // Close menu when clicking outside or clicking any nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        if (navbar) navbar.classList.remove('menu-open');
        document.body.classList.remove('mobile-menu-expanded');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        if (navbar) navbar.classList.remove('menu-open');
        document.body.classList.remove('mobile-menu-expanded');
      }
    });
  }
}

/* ── Global Mouse & Touch Tracker for 3D Parallax ── */
let globalMouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
window.addEventListener('mousemove', (e) => {
  globalMouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
  globalMouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
});

/* Touch Move Listener for Mobile 3D Parallax */
window.addEventListener('touchmove', (e) => {
  if (e.touches.length > 0) {
    globalMouse.targetX = (e.touches[0].clientX / window.innerWidth - 0.5) * 1.5;
    globalMouse.targetY = (e.touches[0].clientY / window.innerHeight - 0.5) * 1.5;
  }
}, { passive: true });

/* ==========================================================================
   1. REAL 3D CANVAS ENGINE — Floating Wireframes & Particle Field
   ========================================================================== */
function init3DBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // 3D Particles
  const particles = [];
  const particleCount = Math.min(width < 768 ? 30 : 70, 90);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: (Math.random() - 0.5) * width * 1.5,
      y: (Math.random() - 0.5) * height * 1.5,
      z: Math.random() * 800 + 100, // Depth Z
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      vz: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1,
      isBlue: Math.random() > 0.6
    });
  }

  // 3D Floating Geometry Wireframes (Cube + Octahedron)
  function create3DPolyhedron(nodes, edges, x, y, z, scale) {
    return { nodes, edges, x, y, z, scale, rx: Math.random() * Math.PI, ry: Math.random() * Math.PI, rz: 0 };
  }

  // Cube nodes
  const cubeNodes = [
    [-1,-1,-1], [1,-1,-1], [1,1,-1], [-1,1,-1],
    [-1,-1, 1], [1,-1, 1], [1,1, 1], [-1,1, 1]
  ];
  const cubeEdges = [
    [0,1],[1,2],[2,3],[3,0],
    [4,5],[5,6],[6,7],[7,4],
    [0,4],[1,5],[2,6],[3,7]
  ];

  // Octahedron nodes
  const octNodes = [
    [1,0,0], [-1,0,0], [0,1,0], [0,-1,0], [0,0,1], [0,0,-1]
  ];
  const octEdges = [
    [0,2],[2,1],[1,3],[3,0],
    [0,4],[1,4],[2,4],[3,4],
    [0,5],[1,5],[2,5],[3,5]
  ];

  const polyhedrons = [
    create3DPolyhedron(cubeNodes, cubeEdges, -width * 0.3, -height * 0.2, 400, 70),
    create3DPolyhedron(octNodes, octEdges, width * 0.35, height * 0.15, 350, 80),
    create3DPolyhedron(cubeNodes, cubeEdges, width * 0.25, -height * 0.35, 500, 60),
    create3DPolyhedron(octNodes, octEdges, -width * 0.35, height * 0.3, 450, 75)
  ];

  function project3D(x, y, z, fov = 600) {
    const scale = fov / (fov + z);
    return {
      x: width / 2 + x * scale,
      y: height / 2 + y * scale,
      scale
    };
  }

  function rotate3D(pt, rx, ry, rz) {
    let [x, y, z] = pt;
    // Y-axis
    let cos = Math.cos(ry), sin = Math.sin(ry);
    let x1 = x * cos - z * sin;
    let z1 = z * cos + x * sin;
    // X-axis
    cos = Math.cos(rx); sin = Math.sin(rx);
    let y2 = y * cos - z1 * sin;
    let z2 = z1 * cos + y * sin;
    // Z-axis
    cos = Math.cos(rz); sin = Math.sin(rz);
    let x3 = x1 * cos - y2 * sin;
    let y3 = y2 * cos + x1 * sin;
    return [x3, y3, z2];
  }

  function renderLoop() {
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse lerp
    globalMouse.x += (globalMouse.targetX - globalMouse.x) * 0.05;
    globalMouse.y += (globalMouse.targetY - globalMouse.y) * 0.05;

    const camOffsetX = globalMouse.x * 60;
    const camOffsetY = globalMouse.y * 40;

    // 1. Draw 3D Floating Polyhedrons
    polyhedrons.forEach(p => {
      p.rx += 0.005;
      p.ry += 0.008;

      const projectedNodes = p.nodes.map(node => {
        const rotated = rotate3D(node, p.rx, p.ry, p.rz);
        const worldX = p.x + rotated[0] * p.scale - camOffsetX;
        const worldY = p.y + rotated[1] * p.scale - camOffsetY;
        const worldZ = p.z + rotated[2] * p.scale;
        return project3D(worldX, worldY, worldZ);
      });

      ctx.strokeStyle = 'rgba(201, 128, 10, 0.14)';
      ctx.lineWidth = 1.2;

      p.edges.forEach(([i, j]) => {
        const p1 = projectedNodes[i];
        const p2 = projectedNodes[j];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });
    });

    // 2. Draw 3D Particle Constellation
    const projectedParticles = particles.map(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -width)  p.x = width;
      if (p.x > width)   p.x = -width;
      if (p.y < -height) p.y = height;
      if (p.y > height)  p.y = -height;

      const proj = project3D(p.x - camOffsetX, p.y - camOffsetY, p.z);
      return { ...proj, size: p.size * proj.scale, isBlue: p.isBlue };
    });

    // Connect close 3D particles with translucent lines
    for (let i = 0; i < projectedParticles.length; i++) {
      for (let j = i + 1; j < projectedParticles.length; j++) {
        const p1 = projectedParticles[i];
        const p2 = projectedParticles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.09;
          ctx.strokeStyle = (i + j) % 3 === 0
            ? `rgba(21, 80, 160, ${alpha})`
            : `rgba(201, 128, 10, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    // Render particles
    projectedParticles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.5, p.size), 0, Math.PI * 2);
      ctx.fillStyle = p.isBlue
        ? 'rgba(21, 80, 160, 0.25)'
        : 'rgba(201, 128, 10, 0.3)';
      ctx.fill();
    });

    requestAnimationFrame(renderLoop);
  }

  renderLoop();
}

/* ==========================================================================
   2. INTERACTIVE 3D CARD TILT ENGINE
   ========================================================================== */
function init3DCardTiltEngine() {
  const cards = document.querySelectorAll(
    '.fleet-card, .gallery-card, .testimonial-card, .contact-card, .mobile-service-card, .brand-badge-inner, .clients-scroll-section, .owner-spotlight-card, .operators-spotlight-card'
  );

  cards.forEach(card => {
    // Add specular shine layer
    const shine = document.createElement('div');
    shine.classList.add('card-3d-shine');
    shine.setAttribute('style', `
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.35) 0%, transparent 65%);
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 10;
    `);
    card.style.position = 'relative';
    card.appendChild(shine);

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // 3D rotation limits (-10deg to 10deg)
      const rotateX = -((y - centerY) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px) scale3d(1.02, 1.02, 1.02)`;
      card.style.transition = 'transform 0.08s ease-out';

      // Move specular shine
      shine.style.opacity = '1';
      shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.4) 0%, transparent 60%)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s var(--ease-spring)';
      shine.style.opacity = '0';
    });
  });
}

/* ==========================================================================
   3. DRAW SVG CONNECTORS FOR HUB
   ========================================================================== */
function drawSpiralConnectors() {
  const scene = document.getElementById('spiral-wrapper');
  if (!scene || window.innerWidth <= 900) return;

  const existing = scene.querySelector('.connector-svg');
  if (existing) existing.remove();

  const sceneRect = scene.getBoundingClientRect();
  const hub = scene.querySelector('.spiral-hub');
  if (!hub) return;

  const hubRect = hub.getBoundingClientRect();
  const hubCX = hubRect.left - sceneRect.left + hubRect.width / 2;
  const hubCY = hubRect.top  - sceneRect.top  + hubRect.height / 2;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('connector-svg');
  svg.setAttribute('style', `position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;overflow:visible;`);

  const cards = scene.querySelectorAll('.spiral-card');
  cards.forEach(card => {
    const cardRect = card.getBoundingClientRect();
    const cardCX = cardRect.left - sceneRect.left + cardRect.width  / 2;
    const cardCY = cardRect.top  - sceneRect.top  + cardRect.height / 2;

    const dx = cardCX - hubCX;
    const dy = cardCY - hubCY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const hubR = 72;
    const cardR = Math.min(cardRect.width, cardRect.height) / 2;

    const startX = hubCX  + (dx / dist) * hubR;
    const startY = hubCY  + (dy / dist) * hubR;
    const endX   = cardCX - (dx / dist) * cardR * 0.6;
    const endY   = cardCY - (dy / dist) * cardR * 0.6;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', startX);
    line.setAttribute('y1', startY);
    line.setAttribute('x2', endX);
    line.setAttribute('y2', endY);
    line.setAttribute('stroke', 'rgba(201, 128, 10, 0.4)');
    line.setAttribute('stroke-width', '1.5');
    line.setAttribute('stroke-dasharray', '6 4');

    svg.appendChild(line);
  });

  scene.insertBefore(svg, scene.firstChild);
}

/* ==========================================================================
   4. COUNTERS FOR SOCIAL PROOF
   ========================================================================== */
function initCounterAnimations() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(num => {
          const target = parseInt(num.getAttribute('data-target'));
          if (isNaN(target)) return;

          let count = 0;
          const duration = 2000;
          const increment = Math.ceil(target / (duration / 16));

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              num.innerText = target;
              clearInterval(timer);
            } else {
              num.innerText = count;
            }
          }, 16);
        });
      }
    });
  }, { threshold: 0.5 });

  const statsRow = document.querySelector('.stats-row');
  if (statsRow) observer.observe(statsRow);
}

/* ==========================================================================
   5. PARALLAX SCROLL PHYSICS
   ========================================================================== */
function initParallaxEffects() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElems = document.querySelectorAll('[data-parallax]');

    parallaxElems.forEach(elem => {
      const speed = parseFloat(elem.getAttribute('data-parallax'));
      elem.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
    });
  });
}

/* ==========================================================================
   6. 3D SCROLL DEPTH OBSERVER
   ========================================================================== */
function init3DScrollDepthObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view-3d');
      }
    });
  }, { threshold: 0.15 });

  const revealElems = document.querySelectorAll('section, .fleet-card, .gallery-card, .spiral-hub');
  revealElems.forEach(el => observer.observe(el));
}

/* ==========================================================================
   7. SINGLE LAYOUT TESTIMONIAL SWIPE TRACK ENGINE
   ========================================================================== */
let currentTestimonialIndex = 0;

function swipeTestimonials(direction) {
  const track = document.getElementById('testimonialTrack');
  if (!track) return;

  const totalCards = track.querySelectorAll('.testimonial-card').length;
  currentTestimonialIndex = (currentTestimonialIndex + direction + totalCards) % totalCards;
  scrollToTestimonial(currentTestimonialIndex);
}

function scrollToTestimonial(index) {
  const track = document.getElementById('testimonialTrack');
  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  if (!cards[index]) return;

  currentTestimonialIndex = index;
  const targetCard = cards[index];
  track.scrollTo({
    left: targetCard.offsetLeft - track.offsetLeft,
    behavior: 'smooth'
  });

  updateSwipeDots(index);
}

function updateSwipeDots(index) {
  const dots = document.querySelectorAll('.swipe-dot');
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Track touch scroll to sync dots automatically
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('testimonialTrack');
  if (track) {
    track.addEventListener('scroll', () => {
      const cards = track.querySelectorAll('.testimonial-card');
      const trackLeft = track.scrollLeft;
      cards.forEach((card, index) => {
        if (Math.abs(card.offsetLeft - track.offsetLeft - trackLeft) < card.offsetWidth / 2) {
          updateSwipeDots(index);
          currentTestimonialIndex = index;
        }
      });
    }, { passive: true });
  }
});
