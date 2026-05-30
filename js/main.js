document.addEventListener("contextmenu", (e) => {
  if (e.target.tagName === "IMG") e.preventDefault();
});

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     NAV ACTIVE LINK
  ========================= */
  const navLinks = document.querySelectorAll(".nav-link");
  const currentPage = window.location.pathname.split("/").pop();

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });


  /* =========================
     CATEGORY FILTER
  ========================= */
  const categoryButtons = document.querySelectorAll(".category-btn");
  const workSections = document.querySelectorAll(".work-section");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.target;

      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      workSections.forEach((section) => {
        section.classList.toggle(
          "active-section",
          section.id === target
        );
      });
    });
  });


  /* =========================
     LIGHTBOX
  ========================= */
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  const imgEl = document.querySelector(".lightbox-img");
  const titleEl = document.querySelector(".lightbox-title");
  const descEl = document.querySelector(".lightbox-desc");
  const sizeEl = document.querySelector(".lightbox-size");
  const statusEl = document.querySelector(".lightbox-status");
  const buttonEl = document.querySelector(".lightbox-button");
  const infoPanel = document.querySelector(".lightbox-info");

  const closeBtn = document.querySelector(".close");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let currentImages = [];
  let currentIndex = 0;


  const resetLightboxState = () => {
    lightbox.classList.remove("show", "gallery-only", "center-mode");
    document.body.style.overflow = "";
  };


  const updateStatus = (status) => {
    statusEl.classList.remove("available", "sold");

    if (status === "Available" || status === "Prints available") {
      statusEl.classList.add("available");
      buttonEl.style.display = "inline-flex";
    } else if (status === "Sold") {
      statusEl.classList.add("sold");
      buttonEl.style.display = "none";
    } else {
      buttonEl.style.display = "none";
    }
  };


  function showImage(index) {
    const el = currentImages[index];
    if (!el) return;

    currentIndex = index;

    imgEl.style.opacity = 0;

    setTimeout(() => {
      imgEl.src = el.src;
      imgEl.alt = el.alt || "";

      const title = (el.dataset.title || "").trim();
      const desc = (el.dataset.desc || "").trim();
      const size = (el.dataset.size || "").trim();
      const status = (el.dataset.status || "").trim();

      const hasInfo = title || desc || size || status;

      if (hasInfo) {
        infoPanel.style.display = "flex";

        titleEl.textContent = title;
        descEl.textContent = desc;
        sizeEl.textContent = size;
        statusEl.textContent = status;

        lightbox.classList.remove("gallery-only", "center-mode");
        updateStatus(status);

      } else {
        infoPanel.style.display = "none";
        buttonEl.style.display = "none";

        lightbox.classList.add("gallery-only", "center-mode");
      }

      imgEl.style.opacity = 1;
    }, 150);
  }


  function openLightbox(images, index) {
    currentImages = images;
    currentIndex = index;

    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";

    showImage(index);
  }


  function closeLightbox() {
    resetLightboxState();
  }


  function nextImage() {
    const next = (currentIndex + 1) % currentImages.length;
    showImage(next);
  }


  function prevImage() {
    const prev = (currentIndex - 1 + currentImages.length) % currentImages.length;
    showImage(prev);
  }


  /* =========================
     IMAGE CLICK HANDLERS
  ========================= */
  document.querySelectorAll(".work-section").forEach((section) => {
    const images = Array.from(section.querySelectorAll(".art-item img"));

    images.forEach((img, index) => {
      img.addEventListener("click", () => {
        openLightbox(images, index);
      });
    });
  });


  /* =========================
     LIGHTBOX CONTROLS
  ========================= */
  closeBtn?.addEventListener("click", closeLightbox);
  nextBtn?.addEventListener("click", nextImage);
  prevBtn?.addEventListener("click", prevImage);

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("show")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });


  /* =========================
     PROJECT MENU TOGGLE
  ========================= */
  const projectsToggle = document.getElementById("projectsToggle");
  const projectsMenu = document.getElementById("projectsMenu");

  if (projectsToggle && projectsMenu) {
    projectsToggle.addEventListener("click", () => {
      projectsMenu.classList.toggle("open");
      projectsToggle.classList.toggle("open");
    });
  }

});