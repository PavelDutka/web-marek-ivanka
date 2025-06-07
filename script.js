// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', function() {
  mobileMenu.classList.toggle('active');
});

// Intersection Observer for animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1,
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    
    entry.target.style.animationPlayState = 'running';
    observer.unobserve(entry.target);
  });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
  el.style.animationPlayState = 'paused';
  appearOnScroll.observe(el);
});

// Testimonials slider
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');
const prevButton = document.querySelector('.testimonial-arrow.prev');
const nextButton = document.querySelector('.testimonial-arrow.next');
let currentTestimonial = 0;
let isAnimating = false;

function showTestimonial(index) {
  if (isAnimating) return;
  isAnimating = true;
  
  // Hide current testimonial
  testimonials[currentTestimonial].classList.remove('active');
  dots[currentTestimonial].classList.remove('active');
  
  // Show new testimonial
  currentTestimonial = index;
  testimonials[currentTestimonial].classList.add('active');
  dots[currentTestimonial].classList.add('active');
  
  setTimeout(() => {
    isAnimating = false;
  }, 500);
}

// Set up dot controls
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    if (index !== currentTestimonial) {
      showTestimonial(index);
    }
  });
});

// Set up arrow controls
prevButton.addEventListener('click', () => {
  const newIndex = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  showTestimonial(newIndex);
});

nextButton.addEventListener('click', () => {
  const newIndex = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(newIndex);
});

// Auto-advance testimonials
setInterval(() => {
  const newIndex = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(newIndex);
}, 8000);

// Scroll to top button
const scrollToTopButton = document.getElementById('scrollToTop');
scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Close mobile menu if open
    if (mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
    }
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  
  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    
    // Close all FAQ items
    faqItems.forEach(faqItem => {
      faqItem.classList.remove('active');
    });
    
    // If the clicked item wasn't active, open it
    if (!isActive) {
      item.classList.add('active');
    }
  });
});
