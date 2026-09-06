
const loader = document.getElementById("page-loader");
window.addEventListener("load", () => setTimeout(() => loader?.classList.add("hide"), 180));

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  document.querySelectorAll(".main-nav a").forEach(a => {
    if (a.dataset.nav === page || (page === "portfolio" && location.pathname.includes("project-"))) {
      a.classList.add("active");
    }
  });

  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  menu?.addEventListener("click", () => nav.classList.toggle("open"));

  document.querySelectorAll("[data-transition]").forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("http")) return;
      e.preventDefault();
      document.body.classList.add("leaving");
      setTimeout(() => window.location.href = href, 220);
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: .12});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // Image fallback: keeps the layout attractive until the user adds their own image.
  document.querySelectorAll("img").forEach(img => {
    img.addEventListener("error", () => {
      img.style.display = "none";
    });
  });

  // Project category filters
  const filters = document.querySelectorAll(".filter");
  const projects = document.querySelectorAll(".project-large");
  filters.forEach(filter => filter.addEventListener("click", () => {
    filters.forEach(f => f.classList.remove("active"));
    filter.classList.add("active");
    const value = filter.dataset.filter;
    projects.forEach(project => {
      const show = value === "all" || project.dataset.category === value;
      project.style.display = show ? "" : "none";
    });
  }));

  // Same-page hash scrolling
  if (location.hash) {
    setTimeout(() => document.querySelector(location.hash)?.scrollIntoView({behavior:"smooth"}), 250);
  }
});
