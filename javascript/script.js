document.addEventListener("DOMContentLoaded", () => {

    /* MENU HAMBÚRGUER */
    const menuToggle = document.getElementById("menuToggle");
    const navList = document.getElementById("navList");
    const body = document.body;

    menuToggle.addEventListener("click", () => {
        navList.classList.toggle("active");
        body.classList.toggle("menu-open");
    });

    /* FECHAR MENU AO CLICAR EM LINK */
    document.querySelectorAll(".navList a").forEach(link => {
        link.addEventListener("click", () => {
            navList.classList.remove("active");
            body.classList.remove("menu-open");
        });
    });

    /* FAQ */
    document.querySelectorAll(".faq-item").forEach(item => {
        item.querySelector(".faq-question").addEventListener("click", () => {
            item.classList.toggle("active");
        });
    });

});

(function () {
  const track = document.getElementById("trackResultados");
  if (!track) return;

  const prev = document.querySelector(".carrossel-btn.prev");
  const next = document.querySelector(".carrossel-btn.next");

  // Quanto vai rolar quando clicar
  function slideWidth() {
    const first = track.querySelector(".slide");
    if (!first) return 300;
    return first.getBoundingClientRect().width + 16; // + gap
  }

  prev?.addEventListener("click", () => {
    track.scrollBy({ left: -slideWidth(), behavior: "smooth" });
  });

  next?.addEventListener("click", () => {
    track.scrollBy({ left: slideWidth(), behavior: "smooth" });
  });

  // Arrastar com mouse (desktop)
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  track.addEventListener("mousedown", (e) => {
    isDown = true;
    track.classList.add("dragging");
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener("mouseleave", () => {
    isDown = false;
    track.classList.remove("dragging");
  });

  track.addEventListener("mouseup", () => {
    isDown = false;
    track.classList.remove("dragging");
  });

  track.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.2;
    track.scrollLeft = scrollLeft - walk;
  });
})();

(function () {
  const track = document.getElementById("trackResultados");
  if (!track) return;

  const prev = document.querySelector(".carrossel-btn.prev");
  const next = document.querySelector(".carrossel-btn.next");

  function slideWidth() {
    const first = track.querySelector(".slide");
    if (!first) return 300;
    return first.getBoundingClientRect().width + 16;
  }

  prev?.addEventListener("click", () => {
    track.scrollBy({ left: -slideWidth(), behavior: "smooth" });
  });

  next?.addEventListener("click", () => {
    track.scrollBy({ left: slideWidth(), behavior: "smooth" });
  });

  // Arrastar no mouse (desktop)
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  track.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    track.style.cursor = "grabbing";
  });

  track.addEventListener("mouseup", () => {
    isDown = false;
    track.style.cursor = "grab";
  });

  track.addEventListener("mouseleave", () => {
    isDown = false;
    track.style.cursor = "grab";
  });

  track.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.2;
    track.scrollLeft = scrollLeft - walk;
  });
})();
 