// ===== ULTIMATE NAVIGATION LOGIC (V11.0 FRESH RECONSTRUCTION) =====
const navElement = document.getElementById('main-nav');
const navToggleBtn = document.getElementById('nav-mobile-toggle');
const navList = document.getElementById('nav-items-list');

// 1. Scroll State (Floating Island Effect)
window.addEventListener('scroll', () => {
    if (navElement) {
        navElement.classList.toggle('scrolled-nav', window.scrollY > 50);
    }
}, { passive: true });

// 2. Precise Jump-to-Section Function
function navigateToSection(id) {
    const section = document.getElementById(id);
    if (!section) return;

    // FORCE visibility animations immediately so layout is final
    section.classList.add('active');
    section.querySelectorAll('.reveal, .reveal-up').forEach(el => el.classList.add('active'));

    // Wait a tiny bit for animations/rendering to settle
    setTimeout(() => {
        const hHeight = navElement ? navElement.offsetHeight : 80;
        const isFloating = navElement && navElement.classList.contains('scrolled-nav');
        
        // Offset: if floating, add the 15px top gap + height + 20px buffer
        const totalOffset = (isFloating ? 15 : 0) + hHeight + 20;
        
        const scrollTarget = section.getBoundingClientRect().top + window.scrollY - totalOffset;
        window.scrollTo({ top: Math.max(0, scrollTarget), behavior: 'smooth' });
        
        // Update URL hash without jumping
        history.pushState(null, null, '#' + id);
    }, 20);
}

// 3. Global Interceptor for ALL hash links
document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;
    
    const href = anchor.getAttribute('href');
    if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        
        // Close mobile menu if it was open
        if (navList) navList.classList.remove('nav-mobile-open');

        if (targetId === 'home') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            history.pushState(null, null, ' ');
        } else if (document.getElementById(targetId)) {
            e.preventDefault();
            navigateToSection(targetId);
        }
    }
});

// 4. Mobile Menu Toggler
if (navToggleBtn && navList) {
    navToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navList.classList.toggle('nav-mobile-open');
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!navToggleBtn.contains(e.target) && !navList.contains(e.target)) {
            navList.classList.remove('nav-mobile-open');
        }
    });
}

// 5. Active Link Highlighting
const siteSections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-items-list a');

function syncActiveNav() {
    const scrollY = window.scrollY + 150;
    let currentId = 'home';

    siteSections.forEach(sec => {
        if (scrollY >= sec.offsetTop) {
            currentId = sec.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('nav-active');
        if (link.getAttribute('href') === '#' + currentId) {
            link.classList.add('nav-active');
        }
    });
}

window.addEventListener('scroll', syncActiveNav, { passive: true });
syncActiveNav();

/* 10. REAL-TIME LOGO TRANSPARENCY ENGINE (V1.1) */
function processLogoTransparency() {
    const logos = document.querySelectorAll('.brand-logo');
    logos.forEach(img => {
        if (img.dataset.processed === "true") return;
        if (!img.complete) {
            img.onload = () => processLogoTransparency();
            return;
        }
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0);
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imgData.data;
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i], g = data[i+1], b = data[i+2];
                if (r < 30 && g < 30 && b < 30) data[i+3] = 0;
            }
            ctx.putImageData(imgData, 0, 0);
            
            // CRITICAL: Disable onload before setting src to prevent infinite loop
            img.onload = null; 
            img.src = canvas.toDataURL();
            img.dataset.processed = "true";
            img.style.mixBlendMode = "normal";
            img.style.filter = "none";
        } catch (e) { console.warn("Transparency engine limited by CORS or cross-origin headers."); }
    });
}
window.addEventListener('load', processLogoTransparency);
processLogoTransparency();


// REMAINDER OF APP LOGIC CONTINUES...

// 4. Active Link Highlight
const sectionsToTrack = document.querySelectorAll('section[id]');
const navItemsToTrack = document.querySelectorAll('.menu-list a');

function highlightNav() {
  const scrollPos = window.scrollY + 140;
  let currentId = 'home';

  sectionsToTrack.forEach(section => {
    if (scrollPos >= section.offsetTop) {
      currentId = section.getAttribute('id');
    }
  });

  navItemsToTrack.forEach(item => {
    item.classList.remove('active');
    const href = item.getAttribute('href');
    if (href === '#' + currentId || (currentId === 'home' && href === '#home')) {
      item.classList.add('active');
    }
  });
}

window.addEventListener('scroll', highlightNav, { passive: true });
highlightNav();



// ===== SESSION ID FOR REVIEWS =====
let userSessionId = localStorage.getItem('wc_session_id');
if (!userSessionId) {
  userSessionId = 'sess_' + Date.now() + Math.random().toString(36).substr(2, 9);
  localStorage.setItem('wc_session_id', userSessionId);
}

// ===== GLOBAL PARTICLES (ANTI-GRAVITY) =====
function createParticles() {
  const existingCanvas = document.getElementById('global-particles-canvas');
  if (existingCanvas) existingCanvas.remove();
  
  const canvas = document.createElement('canvas');
  canvas.id = 'global-particles-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.zIndex = '-1'; 
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  
  let width, height;
  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  window.addEventListener('resize', resize);
  resize();

  const particles = [];
  const colors = ['#6C63FF', '#FF6B6B', '#FFD43B', '#51CF66', '#a78bfa'];
  
  // Performance Density: 100 on mobile for smoothness, 300 on desktop for WOW
  const particleCount = window.innerWidth < 768 ? 100 : 300;
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.5 + 1.2, // slightly smaller max radius
      baseDx: (Math.random() - 0.5) * 1.5,
      baseDy: (Math.random() - 0.5) * 1.5,
      vx: 0,
      vy: 0,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  let mouse = { x: -1000, y: -1000, radius: 150 }; // Unified 150 radius for all devices

  // Track mouse across the whole page viewport
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  // Mobile Touch Support
  window.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }, { passive: true });
  
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      // Gentle Repulsion (Anti-Gravity)
      if (mouse.x !== -1000) {
        let dx = p.x - mouse.x;
        let dy = p.y - mouse.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          p.vx += forceDirectionX * force * 3.0; // Gentle but visible repel
          p.vy += forceDirectionY * force * 3.0;
        }
      }
      
      // Friction
      p.vx *= 0.88;
      p.vy *= 0.88;
      p.x += p.baseDx + p.vx;
      p.y += p.baseDy + p.vy;

      // Wrap around edges dynamically
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;
      if (p.y < -10) p.y = height + 10;
      if (p.y > height + 10) p.y = -10;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.5;
      ctx.fill();
    });

    // DRAW LINES: Skip on mobile because it's a huge CPU drain (O(N^2))
    if (window.innerWidth >= 768) {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          let dx = particles[i].x - particles[j].x;
          let dy = particles[i].y - particles[j].y;
          let distSq = dx * dx + dy * dy;
          
          if (distSq < 3500) { 
            let dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = particles[i].color;
            ctx.globalAlpha = 0.15 * (1 - dist / Math.sqrt(7000));
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}
createParticles();

// ===== LUXURY UX SUITE =====

// 1. Custom Glowing Cursor
const cursorBlob = document.getElementById('cursor-blob');
document.addEventListener('mousemove', (e) => {
  if (cursorBlob) {
    cursorBlob.style.left = e.clientX + 'px';
    cursorBlob.style.top = e.clientY + 'px';
  }
});

// Image Load Detection for Skeleton Loaders
function handleImgLoad() {
    document.querySelectorAll('.portfolio-item img').forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
            img.parentElement.classList.add('img-loaded');
        } else {
            img.onload = () => {
                img.classList.add('loaded');
                img.parentElement.classList.add('img-loaded');
            };
        }
    });
}
window.addEventListener('load', handleImgLoad);
handleImgLoad(); 

// Expand cursor on interactive elements
const interactables = document.querySelectorAll('a, button, .service-card, .portfolio-item, .star');
interactables.forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursorBlob) {
      cursorBlob.style.width = '450px';
      cursorBlob.style.height = '450px';
      cursorBlob.style.background = 'radial-gradient(circle, rgba(167, 139, 250, 0.2) 0%, transparent 70%)';
    }
  });
  el.addEventListener('mouseleave', () => {
    if (cursorBlob) {
      cursorBlob.style.width = '300px';
      cursorBlob.style.height = '300px';
      cursorBlob.style.background = 'radial-gradient(circle, rgba(108, 99, 255, 0.15) 0%, transparent 70%)';
    }
  });
});

// Hacker Click Animation
document.addEventListener('mousedown', (e) => {
  if (window.innerWidth <= 768) return;

  // 1. Create the Ring
  const ring = document.createElement('div');
  ring.className = 'hacker-ring';
  ring.style.left = e.clientX + 'px';
  ring.style.top = e.clientY + 'px';
  document.body.appendChild(ring);
  setTimeout(() => ring.remove(), 600);

  // 2. Create Fragments
  for (let i = 0; i < 8; i++) {
    const frag = document.createElement('div');
    frag.className = 'hacker-fragment';
    frag.style.left = e.clientX + 'px';
    frag.style.top = e.clientY + 'px';
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = 5 + Math.random() * 10;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    document.body.appendChild(frag);
    
    let opacity = 1;
    let x = e.clientX;
    let y = e.clientY;
    
    const anim = () => {
      x += vx;
      y += vy;
      opacity -= 0.05;
      frag.style.left = x + 'px';
      frag.style.top = y + 'px';
      frag.style.opacity = opacity;
      
      if (opacity > 0) requestAnimationFrame(anim);
      else frag.remove();
    };
    requestAnimationFrame(anim);
  }
});

// 3. Scroll Reveal Logic
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .reveal-up').forEach(el => revealObserver.observe(el));

// 4. 3D Magnetic Tilt Logic
const tiltElements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card');

tiltElements.forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -12.5; // Increased by 25%
    const rotateY = ((x - centerX) / centerX) * 12.5;
    
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });
  
  el.addEventListener('mouseleave', () => {
    el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
});

// 5. Portfolio Lightbox Logic
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxVisit = document.getElementById('lightboxVisit');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.portfolio-item-link').forEach(link => {
  link.addEventListener('click', (e) => {
    // Only intercept if screen is large enough or specific meta key not pressed
    if (window.innerWidth > 768) {
      const item = link.querySelector('.portfolio-item');
      const img = item.querySelector('img');
      const url = link.getAttribute('href');
      
      // If no image exists (it's a mockup), let the link open normally!
      if (!img) return;

      e.preventDefault();
      const title = item.querySelector('h3').innerText;
      
      lightboxImg.src = img.src;
      lightboxTitle.innerText = title;
      lightboxVisit.href = url;
      
      lightboxOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; 
    }
  });
});

lightboxClose.addEventListener('click', () => {
  lightboxOverlay.classList.remove('active');
  document.body.style.overflow = '';
});

lightboxOverlay.addEventListener('click', (e) => {
  if (e.target === lightboxOverlay) {
    lightboxOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-aos]').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = `opacity 0.6s ease ${el.dataset.delay || 0}ms, transform 0.6s ease ${el.dataset.delay || 0}ms`;
  observer.observe(el);
});

// ===== GENERATE ORDER ID =====
function generateOrderId() {
  const prefix = 'WC';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 9000 + 1000);
  return `${prefix}-${timestamp}-${random}`;
}

// ===== ORDER FORM SUBMISSION =====
document.getElementById('orderForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const type = document.getElementById('websiteType').value;
  const budget = document.getElementById('budget').value;
  const req = document.getElementById('requirements').value.trim();

  // Email and requirements are optional now
  if (!name || !phone || !type || !budget) {
    showToast('Please fill in all required fields.', 'error');
    return;
  }

  // Validate 10 digit number
  if (phone.length !== 10) {
    showToast('Please enter a valid 10-digit phone number.', 'error');
    return;
  }

  const orderId = generateOrderId();
  const formattedPhone = `+91 ${phone}`;
  const validEmail = email || 'customer@no-email-provided.com';
  
  const orderData = { 
    name, 
    phone: formattedPhone, 
    email: validEmail,
    type, 
    budget, 
    requirements: req, 
    orderId 
  };

  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

  // Send order directly via Formspree
  const formspreeURL = "https://formspree.io/f/mlgoojvn";
  fetch(formspreeURL, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      ...orderData,
      _subject: `📦 NEW ORDER #${orderId} – ${name} (${type})`
    })
  })
  .then(response => {
    if (response.ok) {
      // Mark as ordered to unlock review prompt
      localStorage.setItem('wc_ordered', 'true');
      document.getElementById('orderForm').reset();
      window.location.href = `success.html?id=${orderId}`;
    } else {
      // Something went wrong (e.g. Formspree limits, captcha requirement)
      response.json().then(data => {
        if (data && data.errors) {
          showToast(data.errors.map(err => err.message).join(", "), 'error');
        } else {
          showToast('Failed to send order. We might be experiencing high volume. Please contact via WhatsApp!', 'error');
        }
      }).catch(err => {
        showToast('Failed to process order securely. Please message us on WhatsApp!', 'error');
      });
    }
  })
  .catch(error => {
    showToast('Network error! Please check your internet connection and try again.', 'error');
  })
  .finally(() => {
    // Reset buttons
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Order & Start My Project';
  });
});// ===== TOAST NOTIFICATION =====
function showToast(message, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.cssText = `
    position: fixed; top: 80px; right: 20px; z-index: 99999;
    background: ${type === 'error' ? '#FF6B6B' : '#51CF66'};
    color: #fff; padding: 14px 22px; border-radius: 12px;
    font-weight: 600; font-size: 0.9rem;
    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
    animation: slideIn 0.3s ease;
  `;
  toast.textContent = message;

  const style = document.createElement('style');
  style.textContent = `@keyframes slideIn { from { transform: translateX(120%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`;
  document.head.appendChild(style);
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) a.style.color = '#6C63FF';
  });
});

// ===== COPY PAYMENT DETAILS =====
document.querySelectorAll('.payment-detail strong').forEach(el => {
  el.style.cursor = 'pointer';
  el.title = 'Click to copy';
  el.addEventListener('click', () => {
    navigator.clipboard.writeText(el.textContent).then(() => {
      showToast('Copied: ' + el.textContent);
    });
  });
});

// ===== PREFILL FROM SERVICES =====
function selectService(type) {
  const select = document.getElementById('websiteType');
  if (select) {
    select.value = type;
  }
}

// ===== PREFILL FROM PRICING =====
function selectPackage(type, budget) {
  const typeSelect = document.getElementById('websiteType');
  const budgetSelect = document.getElementById('budget');
  if (typeSelect) typeSelect.value = type;
  if (budgetSelect) budgetSelect.value = budget;

  // SCROLL TO ORDER SECTION
  if (typeof navigateToSection === 'function') {
    navigateToSection('order-section');
  } else {
    const orderSection = document.getElementById('order-section');
    if (orderSection) orderSection.scrollIntoView({ behavior: 'smooth' });
  }
}


// ===== REVIEW SYSTEM =====
const STAR_LABELS = ['', 'Poor 😞', 'Fair 😐', 'Good 😊', 'Great 😄', 'Excellent 🤩'];

function openReviewModal() {
  document.getElementById('reviewModalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeReviewModal() {
  document.getElementById('reviewModalOverlay').classList.remove('active');
  document.body.style.overflow = '';
  const url = new URL(window.location.href);
  url.searchParams.delete('showReview');
  window.history.replaceState({}, '', url);
}

// Show/hide the "Give Us a Review" button based on localStorage
(function initReviewSystem() {
  if (localStorage.getItem('wc_ordered') === 'true') {
    const area = document.getElementById('reviewPromptArea');
    if (area) area.classList.remove('hidden');
  }
  // Auto-open if redirected from order success page
  const params = new URLSearchParams(window.location.search);
  if (params.get('showReview') === 'true') {
    setTimeout(openReviewModal, 700);
  }
})();

// Open modal on button click
const openBtn = document.getElementById('openReviewBtn');
if (openBtn) openBtn.addEventListener('click', openReviewModal);

// Close modal on X button
const closeReviewBtn = document.getElementById('closeReviewModal');
if (closeReviewBtn) closeReviewBtn.addEventListener('click', closeReviewModal);

// Close modal on Cancel button
const cancelReviewBtn = document.getElementById('cancelReviewBtn');
if (cancelReviewBtn) cancelReviewBtn.addEventListener('click', closeReviewModal);

// Close modal on backdrop click
const reviewOverlay = document.getElementById('reviewModalOverlay');
if (reviewOverlay) {
  reviewOverlay.addEventListener('click', function (e) {
    if (e.target === reviewOverlay) closeReviewModal();
  });
}

// Star rating interaction
let selectedStars = 0;
const starEls = document.querySelectorAll('.star');
const starLabel = document.getElementById('starLabel');

starEls.forEach(function (star) {
  star.addEventListener('mouseover', function () {
    const val = parseInt(this.dataset.value);
    starEls.forEach(function (s) {
      s.classList.toggle('hovered', parseInt(s.dataset.value) <= val);
    });
  });
  star.addEventListener('mouseout', function () {
    starEls.forEach(function (s) { s.classList.remove('hovered'); });
  });
  star.addEventListener('click', function () {
    selectedStars = parseInt(this.dataset.value);
    starEls.forEach(function (s) {
      s.classList.toggle('selected', parseInt(s.dataset.value) <= selectedStars);
    });
    if (starLabel) starLabel.textContent = STAR_LABELS[selectedStars];
  });
});

// Submit review
const submitReviewBtn = document.getElementById('submitReviewBtn');
let editingReviewId = null; // null = new review, string = editing existing id

if (submitReviewBtn) {
  submitReviewBtn.addEventListener('click', function () {
    const name = document.getElementById('reviewName').value.trim();
    const text = document.getElementById('reviewText').value.trim();

    if (!selectedStars) { showToast('Please select a star rating.', 'error'); return; }
    if (!name) { showToast('Please enter your name.', 'error'); return; }
    if (!text) { showToast('Please write your review.', 'error'); return; }

    const reviews = JSON.parse(localStorage.getItem('wc_reviews') || '[]');
    const grid = document.getElementById('testimonialsGrid');

    if (editingReviewId) {
      // ---- EDIT MODE: update existing review ----
      const idx = reviews.findIndex(function (r) { return r.id === editingReviewId; });
      if (idx !== -1) {
        reviews[idx].name = name;
        reviews[idx].text = text;
        reviews[idx].stars = selectedStars;
        localStorage.setItem('wc_reviews', JSON.stringify(reviews));
        // Replace the card in the DOM
        const existing = document.querySelector('[data-review-id="' + editingReviewId + '"]');
        if (existing && grid) {
          const updated = buildReviewCard(reviews[idx]);
          existing.replaceWith(updated);
        }
        showToast('Review updated! ✏️');
      }
      editingReviewId = null;
    } else {
      // ---- NEW REVIEW ----
      const review = { 
        id: 'rv_' + Date.now(), 
        name: name, 
        text: text, 
        stars: selectedStars, 
        date: Date.now(),
        sessionId: userSessionId
      };
      reviews.unshift(review);
      localStorage.setItem('wc_reviews', JSON.stringify(reviews));
      if (grid) grid.prepend(buildReviewCard(review));
      showToast('Thank you for your review! 🌟');
    }

    closeReviewModal();
    resetReviewForm();
  });
}

function resetReviewForm() {
  selectedStars = 0;
  starEls.forEach(function (s) { s.classList.remove('selected', 'hovered'); });
  if (starLabel) starLabel.textContent = 'Tap a star to rate';
  document.getElementById('reviewName').value = '';
  document.getElementById('reviewText').value = '';
  // Reset modal title back to "new review" mode
  const h2 = document.querySelector('.review-modal h2');
  const sub = document.querySelector('.review-modal-sub');
  const btn = document.getElementById('submitReviewBtn');
  if (h2) h2.textContent = 'How Was Your Experience?';
  if (sub) sub.textContent = "Your feedback helps us improve. We'd love to hear from you!";
  if (btn) btn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Review';
  editingReviewId = null;
}

function buildReviewCard(r) {
  const starStr = '★'.repeat(r.stars) + '☆'.repeat(5 - r.stars);
  const initial = r.name.charAt(0).toUpperCase();
  const card = document.createElement('div');
  card.className = 'testimonial-card new-review';
  card.setAttribute('data-review-id', r.id);
  let actionsHtml = '';
  if (r.sessionId === userSessionId) {
    actionsHtml = 
      '<div class="review-actions">' +
      '<button class="review-action-btn edit-review-btn" data-id="' + r.id + '" title="Edit Review">✏️ Edit</button>' +
      '<button class="review-action-btn delete-review-btn" data-id="' + r.id + '" title="Delete Review">🗑️ Delete</button>' +
      '</div>';
  }

  card.innerHTML =
    '<div class="stars">' + starStr + '</div>' +
    '<p>"' + r.text + '"</p>' +
    '<div class="testimonial-author">' +
    '<div class="author-avatar">' + initial + '</div>' +
    '<div><strong>' + r.name + '</strong><span>Verified Customer</span></div>' +
    '</div>' + actionsHtml;

  // Attach edit listener
  if (card.querySelector('.edit-review-btn')) {
  card.querySelector('.edit-review-btn').addEventListener('click', function () {
    const reviews = JSON.parse(localStorage.getItem('wc_reviews') || '[]');
    const review = reviews.find(function (rv) { return rv.id === r.id; });
    if (!review) return;
    // Pre-fill the modal
    document.getElementById('reviewName').value = review.name;
    document.getElementById('reviewText').value = review.text;
    selectedStars = review.stars;
    starEls.forEach(function (s) {
      s.classList.toggle('selected', parseInt(s.dataset.value) <= review.stars);
    });
    if (starLabel) starLabel.textContent = STAR_LABELS[review.stars];
    // Update modal UI to "Edit" mode
    const h2 = document.querySelector('.review-modal h2');
    const sub = document.querySelector('.review-modal-sub');
    const btn = document.getElementById('submitReviewBtn');
    if (h2) h2.textContent = 'Edit Your Review';
    if (sub) sub.textContent = 'Update your stars and message below.';
    if (btn) btn.innerHTML = '<i class="fas fa-save"></i> Save Changes';
    editingReviewId = r.id;
    openReviewModal();
  });
  }

  // Attach delete listener
  if (card.querySelector('.delete-review-btn')) {
  card.querySelector('.delete-review-btn').addEventListener('click', function () {
    if (!confirm('Delete your review? This cannot be undone.')) return;
    let reviews = JSON.parse(localStorage.getItem('wc_reviews') || '[]');
    reviews = reviews.filter(function (rv) { return rv.id !== r.id; });
    localStorage.setItem('wc_reviews', JSON.stringify(reviews));
    card.style.transition = 'opacity 0.3s, transform 0.3s';
    card.style.opacity = '0';
    card.style.transform = 'scale(0.9)';
    setTimeout(function () { card.remove(); }, 320);
    showToast('Review deleted.', 'error');
  });
  }

  return card;
}

// Load previously saved reviews from localStorage
(function loadSavedReviews() {
  const reviews = JSON.parse(localStorage.getItem('wc_reviews') || '[]');
  const grid = document.getElementById('testimonialsGrid');
  if (!grid || !reviews.length) return;
  
  let needsUpdate = false;
  reviews.slice().reverse().forEach(function (r) {
    // Ensure legacy reviews without id get one
    if (!r.id) {
      r.id = 'rv_' + (r.date || Date.now() + Math.floor(Math.random() * 10000));
      needsUpdate = true;
    }
    grid.prepend(buildReviewCard(r));
  });

  if (needsUpdate) {
    localStorage.setItem('wc_reviews', JSON.stringify(reviews));
  }
})();

window.WC_BUSINESS_HOURS = { start: 9, end: 21, closed: [0] }; 

// Make this function GLOBAL so we can call it anytime
function initWorkingHours() {
  const statusBadge = document.getElementById('workingStatus');
  if (!statusBadge) return;

  const now = new Date();
  const day = now.getDay(); 
  const hour = now.getHours();
  
  const bh = window.WC_BUSINESS_HOURS;
  const isOpen = (!bh.closed.includes(day)) && (hour >= bh.start && hour < bh.end);
  
  if (isOpen) {
    statusBadge.innerHTML = '🟢 Available Now';
    statusBadge.className = 'available-badge open';
    statusBadge.style.background = 'rgba(81, 207, 102, 0.15)';
    statusBadge.style.color = '#51CF66';
  } else {
    statusBadge.innerHTML = '🔴 Closed / WhatsApp Us';
    statusBadge.className = 'available-badge closed';
    statusBadge.style.background = 'rgba(255, 107, 107, 0.15)';
    statusBadge.style.color = '#FF6B6B';
  }
}

// ===== SUPABASE CLOUD CMS SYSTEM =====

const SUPABASE_URL = 'https://imuqwquuytcfuqbpaqoa.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltdXF3cXV1eXRjZnVxYnBhcW9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NTQwNzcsImV4cCI6MjA5MTAzMDA3N30.J_E1pbC8nJKMsIMJE-IAnI_3lV47q6WX0HuSSWIhpd4';

// Initialize Supabase Client
let _supabase = null;
if (typeof supabase !== 'undefined') {
    _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}

const DEFAULT_SERVICES = [
    { icon: '✂️', clr: '#6C63FF', title: 'Salon & Spa Websites', desc_text: 'Beautiful booking-enabled websites for salons, spas, and beauty studios.', link: 'gallery-salon.html' },
    { icon: '💈', clr: '#FF6584', title: 'Barber Shop Sites', desc_text: 'Masculine, modern designs for barber shops with gallery and online booking.', link: 'gallery-barber.html' },
    { icon: '💍', clr: '#FFD43B', title: 'Jewellery Websites', desc_text: 'Luxurious, product-showcasing websites for goldsmith and jewellery businesses.', link: 'gallery-jewelry.html' },
    { icon: '🏪', clr: '#51CF66', title: 'Small Business Sites', desc_text: 'Professional landing pages for local shops, clinics, and restaurants.', link: 'gallery-business.html' },
    { icon: '🛒', clr: '#339AF0', title: 'E-Commerce Stores', desc_text: 'Online stores with product listings, cart, and payment integration.', link: 'gallery-ecommerce.html' },
    { icon: '📱', clr: '#F06595', title: 'Portfolio Websites', desc_text: 'Showcase your work beautifully with a personal or professional portfolio.', link: 'gallery-portfolio.html' }
];

const DEFAULT_PRICING = [
    { badge: 'Starter', price: '₹2500 – ₹3000', name: 'Basic Page', features: '1-Page Site,Mobile Friendly,Contact Form,Basic SEO', featured: false, action_type: "selectPackage('Small Business / Shop', '₹2500 – ₹3000 (Basic)')" },
    { badge: 'Professional', price: '₹3000 – ₹5000', name: 'Business Website', features: 'Multi-Page Site,Modern Animations,Photo Gallery,WhatsApp Integration,SEO Optimized', featured: true, action_type: "selectPackage('Small Business / Shop', '₹3000 – ₹5000 (Professional)')" },
    { badge: 'Premium', price: '₹5000+', name: 'E-Commerce', features: 'Online Store,Payment Gateway,Product Management,Admin Panel,Advanced SEO,Priority Support', featured: false, action_type: "selectPackage('E-Commerce Store', '₹5000+ (Premium)')" }
];

function renderServices(data) {
    const grid = document.getElementById('servicesGridDynamic');
    if (!grid) return;
    grid.innerHTML = '';
    data.forEach((item, index) => {
        const delay = index * 100;
        grid.innerHTML += `
      <a href="${item.link}" class="service-item-link">
        <div class="service-card" data-aos="fade-up" data-delay="${delay}">
          <div class="service-icon" style="--clr:${item.clr || '#6C63FF'}">${item.icon}</div>
          <h3>${item.title}</h3>
          <p>${item.desc_text}</p>
          <span class="btn btn-sm btn-primary">View Demos &rarr;</span>
        </div>
      </a>
    `;
    });
}

function renderPricing(data) {
    const grid = document.getElementById('pricingGridDynamic');
    if (!grid) return;
    grid.innerHTML = '';
    data.forEach((pkg, index) => {
        // Sync Hero Prices with the FIRST (Starter) plan
        if (index === 0) {
            // Robust split: handles "-", "–" (en-dash), "—" (em-dash), or " to "
            const starterPrice = pkg.price.split(/[-\u2013\u2014]|\s+to\s+/)[0].trim();
            ['hero-starter-price', 'hero-price-badge', 'hero-stat-price'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.innerText = starterPrice;
            });
        }
        const delay = index * 150;
        grid.innerHTML += `
      <div class="pricing-card ${pkg.featured ? 'featured' : ''}" data-aos="fade-up" data-delay="${delay}">
        ${pkg.featured ? '<div class="popular-tag">Most Popular</div>' : ''}
        <div class="pricing-badge">${pkg.badge}</div>
        <div class="pricing-price">${pkg.price}</div>
        <div class="pricing-name">${pkg.name}</div>
        <ul class="pricing-features">
          ${pkg.features.split(',').map(f => `<li><i class="fas fa-check"></i> ${f.trim()}</li>`).join('')}
        </ul>
        <button class="btn btn-block ${pkg.featured ? 'btn-primary' : 'btn-outline'}" onclick="${pkg.action_type}">
          Choose ${pkg.badge} Plan
        </button>
      </div>
    `;
    });
}

    // ===== V5 LIVE SYNC ENGINE: RE-ENFORCED (V7.1) =====
async function loadV5Visuals() {
  const { data, error } = await supabaseClient.from('site_settings').select('*');
  if (error) return;
  
  let css = "";
  data.forEach(item => {
    // 1. SECTION-BASED LOGIC (The Professional Bridge)
    if (item.key === 'v5_note_bg') {
        css += `#v5-note-box { background-color: ${item.value} !important; border-color: ${item.value} !important; } `;
    }
    if (item.key === 'v5_note_text') {
        css += `#v5-note-box, #v5-note-box p, #v5-note-box b { color: ${item.value} !important; } `;
    }
    if (item.key === 'v5_note_radius') {
        css += `#v5-note-box { border-radius: ${item.value}px !important; } `;
    }

    // 2. Legacy ID-Based Logic (Fallback)
    if (item.key.startsWith('v5_style_')) {
      const id = item.key.replace('v5_style_', '');
      const styles = JSON.parse(item.value);
      css += `#${id} { `;
      for (const [prop, val] of Object.entries(styles)) {
        if (prop !== 'text') {
            const cssProp = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
            css += `${cssProp}: ${val} !important; `;
        }
      }
      css += "} ";
      
      // Update Text Content
      const el = document.getElementById(id);
      if (el && styles.text) el.innerText = styles.text;
    }
  });

  if (css) {
    let heart = document.getElementById('v5-heart-pulse');
    if (!heart) {
      heart = document.createElement('style');
      heart.id = 'v5-heart-pulse';
      document.head.appendChild(heart);
    }
    heart.innerHTML += css;
  }
}

async function loadSiteContent() {
    if (!_supabase) return;
    
    // 1. Fetch all settings and styles
    const { data: settings } = await _supabase.from('site_settings').select('*');
    if (settings) {
        settings.forEach(s => {
            if (s.key === 'primary_phone') {
                const raw = s.value || '';
                const digits = raw.replace(/[^0-9]/g, '');
                const waUrl = 'https://wa.me/' + digits + '?text=Hi!%20I\'m%20interested%20in%20getting%20a%20website.';

                // 1. Footer link
                document.querySelectorAll('.dynamic-phone').forEach(el => {
                    el.innerText = 'WhatsApp: ' + raw.replace(/^\+91\s?/, '');
                    el.href = waUrl;
                });
                // 2. Contact section - text
                const dp = document.getElementById('dynamic_phone');
                if (dp) dp.innerText = raw;
                // 3. Contact section - button
                const dwl = document.getElementById('dynamic_whatsapp_link');
                if (dwl) dwl.href = waUrl;
                // 4. Floating WhatsApp button
                const wf = document.getElementById('whatsapp-float');
                if (wf) wf.href = waUrl;
            }

            if (s.key === 'primary_email') {
                const raw = s.value || '';
                const mailUrl = 'mailto:' + raw;

                // 1. Footer link
                document.querySelectorAll('.dynamic-email').forEach(el => {
                    el.innerText = raw;
                    el.href = mailUrl;
                });
                // 2. Contact section - text
                const de = document.getElementById('dynamic_email');
                if (de) de.innerText = raw;
                // 3. Contact section - button
                const del1 = document.getElementById('dynamic_email_link');
                if (del1) del1.href = mailUrl;
            }

            if (s.key === 'working_hours') {
                const raw = s.value || 'Mon – Sat: 9 AM – 9 PM';
                const el = document.getElementById('dynamic_hours');
                if (el) el.innerText = raw;
                // Initial update
                updateWorkingStatus();
                // Refresh every minute
                if (window._workingInterval) clearInterval(window._workingInterval);
                window._workingInterval = setInterval(updateWorkingStatus, 60000);
            }

            // Legacy Design Pulse Loader (v5_...)
            if (s.key.startsWith('v5_')) {
                const id = s.key.replace('v5_', '');
                // PROTECT modern design elements from being overwritten by legacy CMS data
                if (id === 'v5-note-box' || id === 'notePrefixText' || id === 'noteMsgText') return; 
                try {
                    const styles = JSON.parse(s.value);
                    const el = document.getElementById(id);
                    if (el) {
                        for (let [prop, val] of Object.entries(styles)) {
                            if (prop === 'text') el.innerText = val;
                            else el.style.setProperty(prop.replace(/([A-Z])/g, "-$1").toLowerCase(), val, 'important');
                        }
                    }
                } catch(e) {}
            }
        });
    }


    // 2. Load Services Grid
    const { data: services } = await _supabase.from('services').select('*').order('id');
    renderServices(services && services.length ? services : DEFAULT_SERVICES);

    // 3. Load Pricing Grid
    const { data: pricing } = await _supabase.from('pricing').select('*').order('id');
    renderPricing(pricing && pricing.length ? pricing : DEFAULT_PRICING);
}

// ===== AUTOMATED WORKING STATUS =====
function updateWorkingStatus() {
    const hoursEl = document.getElementById('dynamic_hours');
    const statusEl = document.getElementById('workingStatus');
    if (!hoursEl || !statusEl) return;

    try {
        const text = hoursEl.innerText.trim();
        // Regex to extract Day Range and Time Range
        // Format: "Day - Day: Start - End" or "Day: Start - End"
        const dayMatch = text.match(/^([A-Za-z\s\u2013\u2014-]+):/);
        const timeMatch = text.match(/:\s*(.*)$/);
        
        if (!timeMatch) return;

        const now = new Date();
        const currentDay = now.getDay(); // 0=Sun, 1=Mon...6=Sat
        const currentTime = now.getHours() * 100 + now.getMinutes(); // e.g. 1430 for 2:30 PM

        // 1. Day Check
        let isDayActive = false;
        const dayText = dayMatch ? dayMatch[1].toLowerCase() : "mon-sun";
        const daysMap = { "sun":0, "mon":1, "tue":2, "wed":3, "thu":4, "fri":5, "sat":6 };
        
        if (dayText.includes("mon") && dayText.includes("sat")) {
            if (currentDay >= 1 && currentDay <= 6) isDayActive = true;
        } else if (dayText.includes("mon") && dayText.includes("sun")) {
            isDayActive = true;
        } else if (dayText.includes("sun") && !dayText.includes("-") && !dayText.includes("\u2013")) {
            if (currentDay === 0) isDayActive = true;
        } else {
            // Default to Mon-Sat if pattern not recognized
            if (currentDay >= 1 && currentDay <= 6) isDayActive = true;
        }

        // 2. Time Check
        const timeRange = timeMatch[1].split(/[-\u2013\u2014]/);
        if (timeRange.length < 2) return;

        function parseTimeString(t) {
            t = t.trim().toLowerCase();
            let [h, m] = t.replace(/(am|pm)/, '').split(':').map(Number);
            if (!m) m = 0;
            if (t.includes('pm') && h < 12) h += 12;
            if (t.includes('am') && h === 12) h = 0;
            return h * 100 + m;
        }

        const start = parseTimeString(timeRange[0]);
        const end = parseTimeString(timeRange[1]);

        let isOpen = false;
        if (isDayActive) {
            if (end > start) {
                // Normal case: 9 AM to 5 PM
                if (currentTime >= start && currentTime < end) isOpen = true;
            } else {
                // Crossover case: 9 PM to 1 AM
                if (currentTime >= start || currentTime < end) isOpen = true;
            }
        }

        // 3. UI Update
        if (isOpen) {
            statusEl.innerHTML = '🟢 Open Now';
            statusEl.style.background = 'rgba(81, 207, 102, 0.15)';
            statusEl.style.color = '#51CF66';
            statusEl.style.borderColor = 'rgba(81, 207, 102, 0.3)';
        } else {
            statusEl.innerHTML = '🔴 Closed Now';
            statusEl.style.background = 'rgba(255, 107, 107, 0.15)';
            statusEl.style.color = '#FF6B6B';
            statusEl.style.borderColor = 'rgba(255, 107, 107, 0.3)';
        }

    } catch (err) {
        console.error("Working status error:", err);
    }
}

// ===== SMART ANCHOR JUMP (MOBILE FIX) =====
window.addEventListener('load', () => {
    const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('WebCraft-Studio/');
    
    // If refreshing or landing on index page without a hash, force top
    if (isIndex && (!window.location.hash || window.location.hash === '#home' || window.location.hash === '')) {
        window.scrollTo(0, 0);
    } else if (window.location.hash) {
        const h = window.location.hash === '#order' ? '#order-section' : window.location.hash;
        setTimeout(() => {
            try {
                const target = document.querySelector(h);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } catch(e) {}
        }, 500);
    }
});

(async function initCMS() {
    const check = setInterval(async () => {
        if (typeof _supabase !== 'undefined' && _supabase) {
            clearInterval(check);
            await loadSiteContent();
        }
    }, 100);
})();
