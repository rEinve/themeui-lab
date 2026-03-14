const siteNav = document.querySelector("[data-app-nav]");

if (siteNav) {
  const openButton = siteNav.querySelector("[data-nav-open]");
  const closeButton = siteNav.querySelector("[data-nav-close]");
  const overlay = siteNav.querySelector("[data-nav-overlay]");
  const drawer = siteNav.querySelector("[data-nav-drawer]");
  const desktopMedia = window.matchMedia("(min-width: 840px)");

  const setOpen = (isOpen) => {
    siteNav.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("nav-open", isOpen);

    if (openButton) {
      openButton.setAttribute("aria-expanded", String(isOpen));
    }

    if (drawer) {
      drawer.setAttribute("aria-hidden", String(!isOpen && !desktopMedia.matches));
    }

    if (isOpen) {
      closeButton?.focus();
    } else {
      openButton?.focus();
    }
  };

  openButton?.addEventListener("click", () => setOpen(true));
  closeButton?.addEventListener("click", () => setOpen(false));
  overlay?.addEventListener("click", () => setOpen(false));
  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (!desktopMedia.matches) {
        setOpen(false);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setOpen(false);
    }
  });

  desktopMedia.addEventListener("change", (event) => {
    if (event.matches) {
      siteNav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      openButton?.setAttribute("aria-expanded", "false");
      drawer?.setAttribute("aria-hidden", "false");
      return;
    }

    drawer?.setAttribute("aria-hidden", "true");
  });

  drawer?.setAttribute("aria-hidden", desktopMedia.matches ? "false" : "true");
}
