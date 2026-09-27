/* ============================================================
   Saifallah Ehab — Portfolio Script
   Sections: Utilities, Navbar, Mobile menu, Theme toggle,
   Typing effect, Scroll progress, Back-to-top, Scroll reveal
   (Intersection Observer, replays both ways), Skill bars,
   Parallax, Project filter, Contact form validation,
   Custom cursor, Footer year.
   ============================================================ */

(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar: style change + smooth-scroll + mobile menu ---------- */
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const navLinks = document.querySelectorAll("[data-nav]");

  function onScrollNavbar() {
    if (window.scrollY > 40) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  }
  onScrollNavbar();
  window.addEventListener("scroll", onScrollNavbar, { passive: true });

  function closeMobileMenu() {
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("open");
    document.body.style.overflow = "";
  }

  hamburger.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => closeMobileMenu());
  });

  /* ---------- Active nav link highlighting ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const navByHash = {};
  navLinks.forEach((l) => {
    const hash = l.getAttribute("href");
    if (!navByHash[hash]) navByHash[hash] = [];
    navByHash[hash].push(l);
  });

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const hash = `#${entry.target.id}`;
        document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active-link"));
        (navByHash[hash] || []).forEach((l) => {
          if (l.classList.contains("nav-link")) l.classList.add("active-link");
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((s) => navObserver.observe(s));

  /* ---------- Theme toggle (persists via localStorage) ---------- */
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;

  function applyTheme(theme) {
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
      themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
      root.removeAttribute("data-theme");
      themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
  }

  try {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved) applyTheme(saved);
  } catch (e) { /* localStorage unavailable — default dark theme is fine */ }

  themeToggle.addEventListener("click", () => {
    const isLight = root.getAttribute("data-theme") === "light";
    const next = isLight ? "dark" : "light";
    applyTheme(next);
    try { localStorage.setItem("portfolio-theme", next); } catch (e) { /* ignore */ }
  });

  /* ---------- Typing effect for hero role titles ---------- */
  const typingEl = document.getElementById("typingText");
  const roles = ["Junior Software Engineer", "Web Developer", "AI Engineer"];

  if (typingEl) {
    if (prefersReducedMotion) {
      typingEl.textContent = roles[0];
    } else {
      let roleIndex = 0, charIndex = 0, deleting = false;

      function typeLoop() {
        const current = roles[roleIndex];
        if (!deleting) {
          charIndex++;
          typingEl.textContent = current.slice(0, charIndex);
          if (charIndex === current.length) {
            deleting = true;
            return setTimeout(typeLoop, 1500);
          }
        } else {
          charIndex--;
          typingEl.textContent = current.slice(0, charIndex);
          if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
          }
        }
        setTimeout(typeLoop, deleting ? 40 : 85);
      }
      typeLoop();
    }
  }

  /* ---------- Scroll progress bar ---------- */
  const scrollProgress = document.getElementById("scrollProgress");
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = pct + "%";
  }
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  updateScrollProgress();

  /* ---------- Back to top button ---------- */
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 500);
  }, { passive: true });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });

  /* ---------- Scroll reveal (replays both directions) ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("in-view", entry.isIntersecting);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );
  revealEls.forEach((el, i) => {
    el.style.setProperty("--stagger", i % 6);
    revealObserver.observe(el);
  });

  /* ---------- Skill bar fill animation ---------- */
  const skillBars = document.querySelectorAll(".skill-bar");
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const level = entry.target.dataset.level || "0";
        entry.target.style.setProperty("--fill", level + "%");
        entry.target.classList.toggle("in-view", entry.isIntersecting);
      });
    },
    { threshold: 0.4 }
  );
  skillBars.forEach((bar) => skillObserver.observe(bar));

  /* ---------- Parallax on hero decorative blobs ---------- */
  const parallaxEls = document.querySelectorAll("[data-parallax]");
  if (parallaxEls.length && !prefersReducedMotion) {
    let ticking = false;
    function updateParallax() {
      const scrollY = window.scrollY;
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0.1;
        el.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
      });
      ticking = false;
    }
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---------- Project filter ---------- */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      projectCards.forEach((card) => {
        const match = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("filtered-out", !match);
      });
    });
  });

  /* ---------- Contact form validation ---------- */
  const form = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");

  function setError(fieldId, message) {
    const group = document.getElementById(fieldId).closest(".form-group");
    const errorEl = document.getElementById(fieldId + "Error");
    group.classList.toggle("error", Boolean(message));
    if (errorEl) errorEl.textContent = message || "";
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name) { setError("name", "Please enter your name."); valid = false; }
      else setError("name", "");

      if (!email) { setError("email", "Please enter your email."); valid = false; }
      else if (!isValidEmail(email)) { setError("email", "Please enter a valid email address."); valid = false; }
      else setError("email", "");

      if (!subject) { setError("subject", "Please enter a subject."); valid = false; }
      else setError("subject", "");

      if (!message) { setError("message", "Please write a message."); valid = false; }
      else setError("message", "");

      if (!valid) {
        formNote.textContent = "Please fix the highlighted fields.";
        formNote.classList.remove("success");
        return;
      }

      /*
        NOTE FOR CUSTOMIZATION:
        This form is front-end only, so it cannot send an email by itself.
        To make it actually deliver messages, connect it to a form backend such as
        Formspree (https://formspree.io) or EmailJS (https://www.emailjs.com) —
        both offer a free tier that works with a static site like this one.
        Once you have an endpoint, replace this block with a fetch() POST call.
      */
      formNote.textContent = "This form is a front-end demo — connect it to Formspree or EmailJS to actually send messages. See the comment in js/script.js.";
      formNote.classList.remove("success");
      form.reset();
    });
  }

  /* ---------- Custom cursor (desktop, fine-pointer only) ---------- */
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (canHover && !prefersReducedMotion) {
    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll("a, button, input, textarea, .project-card").forEach((el) => {
      el.addEventListener("mouseenter", () => ring.style.transform = "translate(-50%, -50%) scale(1.6)");
      el.addEventListener("mouseleave", () => ring.style.transform = "translate(-50%, -50%) scale(1)");
    });
  }
})();
