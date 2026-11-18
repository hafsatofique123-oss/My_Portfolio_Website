
// Portfolio interactions: mobile menu, theme toggle, project details and reveal effects.

document.addEventListener("DOMContentLoaded", () => {

  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const themeLabel = document.getElementById("theme-label");
  const year = document.getElementById("current-year");

  // Footer year
  if (year) year.textContent = new Date().getFullYear();

  // Mobile navigation
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      }
    });
  }

  // Theme toggle
  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "light") {
    document.body.classList.replace("theme-dark", "theme-light");
  }

  function updateThemeButton() {
    const isLight = document.body.classList.contains("theme-light");

    if (themeIcon) themeIcon.textContent = isLight ? "☾" : "☀";
    if (themeLabel) themeLabel.textContent = isLight ? "Dark mode" : "Light mode";

    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark theme" : "Switch to light theme"
      );
    }
  }

  if (themeToggle) {
    updateThemeButton();

    themeToggle.addEventListener("click", () => {
      const isLight = document.body.classList.toggle("theme-light");
      document.body.classList.toggle("theme-dark", !isLight);

      localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
      updateThemeButton();
    });
  }

  // Individual project details
  const projects = [

    {
      title: "My Grocery Website",
      description:
        "My Grocery is a user-friendly grocery shopping website that allows users to browse grocery products and explore different categories. It features a clean, attractive, and responsive interface designed to make online grocery shopping simple and convenient.",
      stack: "Tools: HTML, CSS, JavaScript",
      github: ""
    },

    {
      title: "Furniture Shop",
      description:
        "My Furniture Shop is a modern and user-friendly e-commerce website designed to showcase furniture products. It features an attractive layout that allows users to explore different furniture collections, view product details, and enjoy a smooth browsing experience.",
      stack: "Tools: HTML, CSS, JavaScript",
      github: ""
    },

    {
      title: "Job Posting Website",
      description:
        "My Job Posting Website is a user-friendly platform designed to connect job seekers with employment opportunities. It allows users to explore job listings, view job details, and find opportunities based on their interests.",
      stack: "Tools: HTML, CSS, JavaScript",
      github: ""
    },

    {
      title: "Music Website",
      description:
        "My Music Website is a user-friendly platform designed for music lovers to explore and enjoy music. It features an attractive interface that allows users to browse songs, discover music, and enjoy a smooth listening experience.",
      stack: "Tools: HTML, CSS, JavaScript",
      github: ""
    },

    {
      title: "Netflix Clone",
      description:
        "My Netflix Clone is a streaming platform website inspired by Netflix, featuring a modern and attractive user interface. It allows users to explore movies and TV shows, browse different entertainment categories, and enjoy a familiar streaming-style experience.",
      stack: "Tools: HTML, CSS",
      github: "https://github.com/hafsatofique123-oss/Netflix-Clone"
    },

    {
      title: "Spotify Clone",
      description:
        "My Spotify Clone is a music streaming website inspired by Spotify, featuring a modern and user-friendly interface. It allows users to explore songs, browse music playlists, and enjoy an interactive music-listening experience.",
      stack: "Tools: HTML, CSS",
      github: "https://github.com/hafsatofique123-oss/Spotify-Clone-CSS_Project"
    }

  ];

  // Project dialog elements
  const dialog = document.getElementById("project-dialog");
  const dialogTitle = document.getElementById("dialog-title");
  const dialogDescription = document.getElementById("dialog-description");
  const dialogStack = document.getElementById("dialog-stack");
  const dialogGithub = document.getElementById("dialog-github");
  const dialogClose = document.getElementById("dialog-close");
  const dialogDone = document.getElementById("dialog-done");

  // Open the correct project details
  document.querySelectorAll(".project-details").forEach((button) => {

    button.addEventListener("click", (event) => {
      event.preventDefault();

      const projectIndex = Number(button.dataset.project);
      const project = projects[projectIndex];

      if (!project || !dialog) return;

      dialogTitle.textContent = project.title;
      dialogDescription.textContent = project.description;
      dialogStack.textContent = project.stack;

      // Show GitHub button only when a link exists
      if (project.github) {
        dialogGithub.href = project.github;
        dialogGithub.hidden = false;
      } else {
        dialogGithub.hidden = true;
      }

      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      }
    });

  });

  // Close project dialog
  function closeDialog() {
    if (dialog && dialog.open) {
      dialog.close();
    }
  }

  if (dialogClose) {
    dialogClose.addEventListener("click", closeDialog);
  }

  if (dialogDone) {
    dialogDone.addEventListener("click", closeDialog);
  }

  if (dialog) {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        closeDialog();
      }
    });
  }

  // Reveal animations
  const revealElements = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if ("IntersectionObserver" in window && !reduceMotion) {

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });

      },
      { threshold: 0.12 }
    );

    revealElements.forEach((element) => observer.observe(element));

  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

});
 
