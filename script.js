const header = document.querySelector(".site-header");

function syncHeaderState() {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
}

syncHeaderState();
window.addEventListener("scroll", syncHeaderState, { passive: true });
