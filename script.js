/**
 * CenterGrade Landing Page — script.js
 * Scroll-reveal, nav, hamburger, FAQ accordion, smooth scroll
 */
document.addEventListener('DOMContentLoaded', function () {

  // --------------------------------------------------------------------------
  // 1. Scroll-reveal animations (IntersectionObserver)
  // --------------------------------------------------------------------------
  var fadeElements = document.querySelectorAll('.fade-in-up');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    fadeElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // --------------------------------------------------------------------------
  // 2. Nav scroll — add .scrolled class when scrolled past 50px
  // --------------------------------------------------------------------------
  var nav = document.querySelector('.nav');

  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // --------------------------------------------------------------------------
  // 3. Hamburger toggle — mobile nav
  // --------------------------------------------------------------------------
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when a nav link is clicked
    var navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 4. FAQ accordion — one-at-a-time behavior
  // --------------------------------------------------------------------------
  var faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(function (button) {
    button.addEventListener('click', function () {
      var parentItem = this.closest('.faq-item');
      var isActive = parentItem.classList.contains('active');
      var answer = parentItem.querySelector('.faq-answer');

      // Close all other FAQ items
      document.querySelectorAll('.faq-item.active').forEach(function (item) {
        item.classList.remove('active');
        item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        item.querySelector('.faq-answer').style.maxHeight = null;
      });

      // Toggle current item
      if (!isActive) {
        parentItem.classList.add('active');
        this.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // --------------------------------------------------------------------------
  // 5. Smooth scroll — anchor links
  // --------------------------------------------------------------------------
  var anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;

      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

});
