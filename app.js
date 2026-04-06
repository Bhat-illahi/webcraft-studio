// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    
    // Back to Top button visibility
  const btt = document.getElementById('backToTop');
  if (window.scrollY > 500) { btt.classList.add('active'); }
  else { btt.classList.remove('active'); }
});

document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== MOBILE NAV TOGGLE =====
document.getElementById('navToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
});

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
      e.preventDefault();
      const item = link.querySelector('.portfolio-item');
      const img = item.querySelector('img');
      const title = item.querySelector('h3').innerText;
      const url = link.getAttribute('href');
      
      lightboxImg.src = img.src;
      lightboxTitle.innerText = title;
      lightboxVisit.href = url;
      
      lightboxOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scroll
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

// Initial Run
initWorkingHours();

// ===== SUPABASE CLOUD CMS SYSTEM =====

const SUPABASE_URL = 'https://imuqwquuytcfuqbpaqoa.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltdXF3cXV1eXRjZnVxYnBhcW9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NTQwNzcsImV4cCI6MjA5MTAzMDA3N30.J_E1pbC8nJKMsIMJE-IAnI_3lV47q6WX0HuSSWIhpd4';

// Only initialize if Supabase library is loaded
let supabaseClient = null;
if (typeof supabase !== 'undefined') {
  supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
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
    const card = `
      <a href="${item.link}" class="service-item-link">
        <div class="service-card" data-aos="fade-up" data-delay="${delay}">
          <div class="service-icon" style="--clr:${item.clr || '#6C63FF'}">${item.icon}</div>
          <h3>${item.title}</h3>
          <p>${item.desc_text}</p>
          <span class="btn btn-sm btn-primary">View Demos &rarr;</span>
        </div>
    <div id="cmsStatusIndicator" style="position:fixed; bottom:10px; left:10px; font-size:10px; color:rgba(255,255,255,0.2); z-index:9999; display:flex; align-items:center; gap:5px; pointer-events:none; opacity:0.5;">
      <div id="cmsDot" style="width:6px; height:6px; border-radius:50%; background:#666;"></div>
      <span id="cmsText">Connecting CMS...</span>
    </div>
  </footer>
    `;
    grid.innerHTML += card;
  });
  
  if (typeof observer !== 'undefined') {
    document.querySelectorAll('#servicesGridDynamic [data-aos]').forEach(el => observer.observe(el));
  }
}

function renderPricing(data) {
  const grid = document.getElementById('pricingGridDynamic');
  if (!grid) return;
  grid.innerHTML = '';

  data.forEach(item => {
    const featuresList = (item.features || "").split(",").map(f => `<li><i class="fas fa-check"></i> ${f.trim()}</li>`).join("");
    const isFeatured = item.featured === true || item.featured === 'true' || item.featured === 'YES';
    const featuredClass = isFeatured ? 'featured' : '';
    const popularTag = isFeatured ? '<div class="popular-tag">Most Popular</div>' : '';
    
    const card = `
      <div class="pricing-card ${featuredClass}">
        ${popularTag}
        <div class="pricing-badge">${item.badge}</div>
        <div class="pricing-price">${item.price}</div>
        <div class="pricing-name">${item.name}</div>
        <ul class="pricing-features">
          ${featuresList}
        </ul>
        <a href="#order" class="btn ${featuredClass ? 'btn-primary' : 'btn-outline'}" onclick="${item.action_type || ''}">Order Now</a>
      </div>
    `;
    grid.innerHTML += card;
  });
}

async function initCMS() {
  const cmsDot = document.getElementById('cmsDot');
  const cmsText = document.getElementById('cmsText');

  // Wait for library if it's missing (helps on slow connections)
  if (typeof supabase === 'undefined') {
    console.warn("Supabase SDK not ready, retrying in 1s...");
    setTimeout(initCMS, 1000);
    return;
  }

  if (!supabaseClient) {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  }

  console.log("🚀 Initializing CMS Sync...");

  // Independent Loading Blocks for Max Robustness
  const loaders = [
    async () => {
      const { data } = await supabaseClient.from('services').select('*').order('id', { ascending: true });
      if (data && data.length > 0) renderServices(data);
      else renderServices(DEFAULT_SERVICES);
    },
    async () => {
      const { data } = await supabaseClient.from('pricing').select('*').order('id', { ascending: true });
      if (data && data.length > 0) renderPricing(data);
      else renderPricing(DEFAULT_PRICING);
    },
    async () => {
      const { data } = await supabaseClient.from('site_settings').select('*');
      if (data) {
        data.forEach(s => {
          if (s.key === 'primary_phone') {
            const el = document.getElementById('dynamic_phone');
            const link = document.getElementById('dynamic_whatsapp_link');
            if (el) el.innerText = s.value;
            if (link) link.href = `https://wa.me/${s.value.replace(/\D/g,'')}`;
          }
          if (s.key === 'primary_email') {
            const el = document.getElementById('dynamic_email');
            const link = document.getElementById('dynamic_email_link');
            if (el) el.innerText = s.value;
            if (link) link.href = `mailto:${s.value}`;
          }
          if (s.key === 'working_hours') {
            const el = document.getElementById('dynamic_hours');
            if (el) el.innerText = s.value;
            
            try {
              const matches = s.value.replace(/to/gi, '-').match(/(\d+)\s*(AM|PM)/gi);
              if (matches && matches.length >= 2) {
                const parseH = (str) => {
                  let h = parseInt(str);
                  if (str.toUpperCase().includes('PM') && h !== 12) h += 12;
                  if (str.toUpperCase().includes('AM') && h === 12) h = 0;
                  return h;
                };
                window.WC_BUSINESS_HOURS.start = parseH(matches[0]);
                window.WC_BUSINESS_HOURS.end = parseH(matches[1]);
                if (s.value.toLowerCase().includes('sun')) window.WC_BUSINESS_HOURS.closed = [];
              }
            } catch(e) {}
          }
          let currentPrefix = "Important Note:";
          let currentMsg = "";
          let prefixColor = "#FF6B6B";
          let msgColor = "#ffffff";
          let boxBg = "rgba(255,255,255,0.03)";
          let glassBlur = "10";
          let iconSize = "20";
          let prefixSize = "18";
          let msgSize = "16";

          data.forEach(s => {
            if (s.key === 'note_prefix') currentPrefix = s.value;
            if (s.key === 'note_prefix_color') prefixColor = s.value;
            if (s.key === 'note_prefix_size') prefixSize = s.value;
            if (s.key === 'demo_note') currentMsg = s.value;
            if (s.key === 'note_color') msgColor = s.value;
            if (s.key === 'note_msg_size') msgSize = s.value;
            if (s.key === 'note_accent') prefixColor = s.value; // Fallback
            if (s.key === 'note_icon_size') iconSize = s.value;
            if (s.key === 'note_bg') boxBg = s.value;
            if (s.key === 'note_blur') glassBlur = s.value;
            
            if (s.key === 'note_width') {
              const box = document.querySelector('.demo-note');
              if (box) box.style.maxWidth = s.value + 'px';
            }
            if (s.key === 'note_radius') {
              const box = document.querySelector('.demo-note');
              if (box) box.style.borderRadius = s.value + 'px';
            }
            if (s.key === 'note_align') {
              const box = document.querySelector('.demo-note');
              if (box) {
                if (s.value === 'left') { box.style.margin = "0 auto 0 0"; box.style.textAlign = "left"; }
                else if (s.value === 'right') { box.style.margin = "0 0 0 auto"; box.style.textAlign = "right"; }
                else { box.style.margin = "0 auto"; box.style.textAlign = "center"; }
              }
            }
            if (s.key === 'note_box') {
              const box = document.querySelector('.demo-note');
              if (box) {
                if (s.value === 'YES') {
                  const r = parseInt(boxBg.slice(1, 3), 16);
                  const g = parseInt(boxBg.slice(3, 5), 16);
                  const b = parseInt(boxBg.slice(5, 7), 16);
                  box.style.background = `rgba(${r}, ${g}, ${b}, 0.2)`; 
                  box.style.backdropFilter = `blur(${glassBlur}px)`;
                  box.style.webkitBackdropFilter = `blur(${glassBlur}px)`;
                  box.style.border = '1px solid rgba(255,255,255,0.1)';
                  box.style.padding = '20px';
                } else {
                  box.style.background = 'none';
                  box.style.backdropFilter = 'none';
                  box.style.webkitBackdropFilter = 'none';
                  box.style.border = 'none';
                  box.style.padding = '0';
                }
              }
            }
          });

          const noteP = document.getElementById('dynamic_demo_note');
          const icon = document.querySelector('.demo-note i');
          if (noteP) {
            noteP.innerHTML = `<b style="color:${prefixColor}; font-size:${prefixSize}px">${currentPrefix}</b> <span style="color:${msgColor}; font-size:${msgSize}px">${currentMsg}</span>`;
          }
          if (icon) {
            icon.style.color = prefixColor;
            icon.style.fontSize = iconSize + 'px';
          }
        });
        if (typeof initWorkingHours === 'function') initWorkingHours();
      }
    }
  ];

  // Run all loaders in parallel
  await Promise.all(loaders.map(l => l().catch(e => console.error("Loader failed", e))));

  // Success Indicator
  if (cmsDot) {
    cmsDot.style.background = '#51CF66';
    cmsDot.style.boxShadow = '0 0 5px #51CF66';
    cmsText.innerText = "CMS Connected & Live";
  }
}

// Start CMS Initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCMS);
} else {
  initCMS();
}
