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



/* =========================
    Shop
 ========================= */

  const filters = document.querySelectorAll('.filter-btn');

filters.forEach(btn => {

  btn.addEventListener('click', () => {

    document
      .querySelector('.filter-btn.active')
      .classList.remove('active');

    btn.classList.add('active');

    const filter = btn.dataset.filter;

    document.querySelectorAll('.product-card').forEach(card => {

      if (
        filter === 'all' ||
        card.classList.contains(filter)
      ) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }

    });

  });

});

let cart = [];

function addToCart(product) {
  cart.push(product);

  localStorage.setItem(
    'cart',
    JSON.stringify(cart)
  );
}


  /* =========================
     Shop - Products Button
  ========================= */

function showOption(type, button){

    const original =
        document.getElementById("original-option");

    const print =
        document.getElementById("print-option");

    const inquireBtn =
        document.getElementById("inquireBtn");

    /* Toggle content */

    if(original){
        original.style.display =
            type === "original" ? "block" : "none";
    }

    if(print){
        print.style.display =
            type === "print" ? "block" : "none";
    }

    /* Active button */

    document.querySelectorAll(".option-btn")
        .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    /* Update inquiry link */

    if(!inquireBtn) return;

    const artwork =
        inquireBtn.dataset.artwork;

    const originalPrice =
        inquireBtn.dataset.originalPrice;

    const printPrice =
        inquireBtn.dataset.printPrice;

    if(type === "original"){

        inquireBtn.href =
        `../contact.html?artwork=${encodeURIComponent(artwork)}&type=Original%20Artwork&price=${originalPrice}`;

    } else {

        inquireBtn.href =
        `../contact.html?artwork=${encodeURIComponent(artwork)}&type=Limited%20Edition%20Print&price=${printPrice}`;

    }

}

  /* =========================
     Products Gallery Slider
  ========================= */

function initProductGallery(){

    const track = document.querySelector(".gallery-track");

    if(!track) return;

    const slides = track.querySelectorAll("img");

    const nextBtn = document.querySelector(".gallery-arrow.next");
    const prevBtn = document.querySelector(".gallery-arrow.prev");

    let currentIndex = 0;

    function updateSlider(){

        track.style.transform =
            `translateX(-${currentIndex * 100}%)`;

    }

    nextBtn?.addEventListener("click", () => {

        currentIndex++;

        if(currentIndex >= slides.length){
            currentIndex = 0;
        }

        updateSlider();

    });

    prevBtn?.addEventListener("click", () => {

        currentIndex--;

        if(currentIndex < 0){
            currentIndex = slides.length - 1;
        }

        updateSlider();

    });

    /* Swipe support */

    let startX = 0;

    track.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });

    track.addEventListener("touchend", (e) => {

        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if(diff > 50){

            currentIndex++;

            if(currentIndex >= slides.length){
                currentIndex = 0;
            }

            updateSlider();

        }

        if(diff < -50){

            currentIndex--;

            if(currentIndex < 0){
                currentIndex = slides.length - 1;
            }

            updateSlider();

        }

    });

}

if(window.location.pathname.includes("/products/")){
    document
      .querySelector('a[href="../shop.html"]')
      ?.classList.add("active");
}


document.addEventListener("DOMContentLoaded", () => {
    initProductGallery();
});



/* =========================
   Contact form autofill
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);

    const artwork = params.get("artwork");
    const type = params.get("type");
    const price = params.get("price");

    const messageField =
        document.getElementById("message");

    if (!messageField || !artwork) return;

    messageField.value =
`Hello,

I am interested in acquiring the following artwork:

Artwork: ${artwork}
Type: ${type || "Artwork"}
Price: $${price || ""} CAD

Please provide availability, shipping information, and next steps.

Thank you.`;

});


document.addEventListener("DOMContentLoaded", () => {

    const trigger =
        document.getElementById("viewCertificate");

    const modal =
        document.getElementById("certificateModal");

    const closeBtn =
        document.querySelector(".certificate-close");

    if(!trigger || !modal) return;

    trigger.addEventListener("click", (e) => {

        e.preventDefault();

        modal.classList.add("show");

    });

    closeBtn?.addEventListener("click", () => {

        modal.classList.remove("show");

    });

    modal.addEventListener("click", (e) => {

        if(e.target === modal){
            modal.classList.remove("show");
        }

    });

});


/* =========================
MailerLite Universal
========================= */
(function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
    .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
    n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
    (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
    ml('account', '2403566');


/* =========================
 Thumbnails
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const mainImage =
        document.getElementById("mainGalleryImage");

    const thumbs =
        document.querySelectorAll(".thumb");

    thumbs.forEach(thumb => {

        thumb.addEventListener("click", () => {

            mainImage.src = thumb.src;

            thumbs.forEach(t =>
                t.classList.remove("active")
            );

            thumb.classList.add("active");

        });

    });

});
