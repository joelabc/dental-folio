
document.documentElement.classList.add("js");

const mobileToggle = document.querySelector("[data-mobile-toggle]");
const navLinks = document.querySelector("[data-nav-links]");
const currentYear = document.querySelector("[data-current-year]");
const revealNodes = document.querySelectorAll(".reveal");
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");

if (mobileToggle && navLinks) {
  mobileToggle.setAttribute("aria-label", "Toggle navigation menu");

  mobileToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    mobileToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      navLinks.classList.remove("is-open");
      mobileToggle.setAttribute("aria-expanded", "false");
    }
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      mobileToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (revealNodes.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealNodes.forEach((node) => observer.observe(node));
}

if (contactForm && formStatus) {
  const fields = contactForm.querySelectorAll("input, textarea");

  const clearError = (field) => {
    field.removeAttribute("aria-invalid");
    field.classList.remove("is-invalid");
  };

  fields.forEach((field) => {
    field.addEventListener("input", () => clearError(field));
  });

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const errors = [];

    if (!name) {
      const f = contactForm.querySelector("#name");
      if (f) { f.setAttribute("aria-invalid", "true"); f.classList.add("is-invalid"); }
      errors.push("name");
    }
    if (!email || !emailPattern.test(email)) {
      const f = contactForm.querySelector("#email");
      if (f) { f.setAttribute("aria-invalid", "true"); f.classList.add("is-invalid"); }
      errors.push("email");
    }
    if (!message) {
      const f = contactForm.querySelector("#message");
      if (f) { f.setAttribute("aria-invalid", "true"); f.classList.add("is-invalid"); }
      errors.push("message");
    }

    formStatus.classList.remove("is-success", "is-error");

    if (errors.length) {
      formStatus.classList.add("is-error");
      formStatus.textContent = "Please check the highlighted fields and try again.";
      const firstInvalid = contactForm.querySelector(".is-invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    formStatus.classList.add("is-success");
    formStatus.textContent = "Thanks. This static demo is ready for a backend or form service connection.";
    contactForm.reset();
  });
}

const backToTopButton = document.createElement("button");
backToTopButton.type = "button";
backToTopButton.className = "back-to-top";
backToTopButton.setAttribute("aria-label", "Back to top");
backToTopButton.setAttribute("title", "Back to top");
backToTopButton.innerHTML = "<span aria-hidden=\"true\">&#8593;</span>";

const updateBackToTopVisibility = () => {
  const shouldShow = window.scrollY > 200;
  backToTopButton.classList.toggle("is-visible", shouldShow);
  backToTopButton.tabIndex = shouldShow ? 0 : -1;
};

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.body.appendChild(backToTopButton);
window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });
updateBackToTopVisibility();


const galleryItems = Array.from(document.querySelectorAll("[data-gallery-item]"));
const galleryModal = document.querySelector("[data-gallery-modal]");
const galleryImage = galleryModal?.querySelector("[data-gallery-image]");
const galleryTitle = galleryModal?.querySelector("[data-gallery-title]");
const galleryCaption = galleryModal?.querySelector("[data-gallery-caption]");
let galleryIndex = 0;

if (galleryItems.length && galleryModal && galleryImage && galleryTitle && galleryCaption) {
  const openGallery = (index) => {
    galleryIndex = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[galleryIndex];
    if (!item) return;

    galleryImage.src = item.dataset.src || "";
    galleryImage.alt = item.dataset.alt || "";
    galleryTitle.textContent = item.dataset.title || "";
    galleryCaption.textContent = item.dataset.caption || "";
    galleryModal.hidden = false;
    document.body.classList.add("is-modal-open");
  };

  const closeGallery = () => {
    galleryModal.hidden = true;
    document.body.classList.remove("is-modal-open");
  };

  const showNext = () => openGallery(galleryIndex + 1);
  const showPrev = () => openGallery(galleryIndex - 1);

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => openGallery(index));
  });

  galleryModal.querySelectorAll("[data-gallery-close]").forEach((button) => {
    button.addEventListener("click", closeGallery);
  });

  galleryModal.querySelector("[data-gallery-prev]")?.addEventListener("click", showPrev);
  galleryModal.querySelector("[data-gallery-next]")?.addEventListener("click", showNext);

  document.addEventListener("keydown", (event) => {
    if (galleryModal.hidden) return;

    if (event.key === "Escape") {
      closeGallery();
    } else if (event.key === "ArrowRight") {
      showNext();
    } else if (event.key === "ArrowLeft") {
      showPrev();
    }
  });
}

// ---- Image carousel (auto-scroll) ----
document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const track = carousel.querySelector("[data-carousel-track]");
  const slides = track ? Array.from(track.children) : [];
  if (!track || slides.length === 0) return;

  const prevBtn = carousel.querySelector("[data-carousel-prev]");
  const nextBtn = carousel.querySelector("[data-carousel-next]");
  const dotsWrap = carousel.querySelector("[data-carousel-dots]");
  const interval = Number(carousel.dataset.carouselInterval) || 4000;

  let index = 0;
  let timer = null;

  const dots = slides.map((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
    dot.addEventListener("click", () => goTo(i, true));
    dotsWrap && dotsWrap.appendChild(dot);
    return dot;
  });

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
  }
  function goTo(i, userInitiated) {
    index = (i + slides.length) % slides.length;
    update();
    if (userInitiated) restart();
  }
  function next() { goTo(index + 1); }
  function tick() {
    next();
    timer = setTimeout(tick, interval);
  }
  function start() {
    stop();
    timer = setTimeout(tick, interval);
  }
  function stop() { if (timer) { clearTimeout(timer); timer = null; } }
  function restart() { start(); }

  prevBtn && prevBtn.addEventListener("click", () => goTo(index - 1, true));
  nextBtn && nextBtn.addEventListener("click", () => goTo(index + 1, true));

  carousel.addEventListener("mouseenter", stop);
  carousel.addEventListener("mouseleave", start);
  carousel.addEventListener("focusin", stop);
  carousel.addEventListener("focusout", start);
  document.addEventListener("visibilitychange", () => {
    document.hidden ? stop() : start();
  });

  update();
  start();
});
