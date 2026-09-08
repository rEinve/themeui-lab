const headerTargets = document.querySelectorAll("[data-docs-header]");
const sidebarTargets = document.querySelectorAll("[data-docs-sidebar]");

const normalizePath = (path) => {
  const normalized = path.replace(/index\.html$/, "").replace(/\/+$/, "");
  return normalized === "" ? "/" : normalized;
};

const currentPath = normalizePath(window.location.pathname);

const markCurrentLink = (root) => {
  root.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("/")) return;

    if (normalizePath(href) === currentPath) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

const openActiveGroups = (root) => {
  root.querySelectorAll(".docs-sidenav__group").forEach((group) => {
    group.open = Boolean(group.querySelector('[aria-current="page"]'));
  });
};

const openDisclosureIfActive = (root) => {
  const disclosure = root.querySelector(".docs-sidenav-disclosure");
  if (disclosure) disclosure.open = Boolean(disclosure.querySelector('[aria-current="page"]'));
};

const markHeaderState = (root) => {
  const docsLink = root.querySelector('a[href="/docs/"]');
  if (docsLink && (currentPath === "/docs" || currentPath.startsWith("/docs/"))) {
    docsLink.setAttribute("aria-current", "page");
  }
};

const createNavigationDialog = (sidebarTarget) => {
  const sourceNav = sidebarTarget.querySelector(".docs-sidenav");
  if (!sourceNav || document.querySelector("[data-docs-nav-dialog]")) return;

  const dialog = document.createElement("dialog");
  dialog.className = "docs-nav-dialog";
  dialog.id = "docs-navigation";
  dialog.dataset.docsNavDialog = "";
  dialog.setAttribute("aria-labelledby", "docs-navigation-title");

  const header = document.createElement("div");
  header.className = "docs-nav-dialog__header";
  const title = document.createElement("h2");
  title.id = "docs-navigation-title";
  title.textContent = "Browse documentation";
  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "docs-nav-dialog__close";
  closeButton.textContent = "Close";
  header.append(title, closeButton);

  const search = document.createElement("div");
  search.className = "docs-nav-search";
  search.setAttribute("role", "search");
  const label = document.createElement("label");
  label.htmlFor = "docs-navigation-search";
  label.textContent = "Filter documentation";
  const input = document.createElement("input");
  input.id = "docs-navigation-search";
  input.type = "search";
  input.placeholder = "Try “avatar” or “spacing”";
  input.autocomplete = "off";
  search.append(label, input);

  const nav = sourceNav.cloneNode(true);
  markCurrentLink(nav);
  openActiveGroups(nav);
  dialog.append(header, search, nav);
  document.body.append(dialog);

  const filterLinks = () => {
    const query = input.value.trim().toLowerCase();
    nav.querySelectorAll("a[href]").forEach((link) => {
      link.hidden = Boolean(query) && !link.textContent.toLowerCase().includes(query);
    });
    nav.querySelectorAll(".docs-sidenav__group").forEach((group) => {
      const hasVisibleLink = Array.from(group.querySelectorAll("a[href]")).some((link) => !link.hidden);
      group.hidden = !hasVisibleLink;
      if (query && hasVisibleLink) group.open = true;
    });
  };

  input.addEventListener("input", filterLinks);

  const triggers = document.querySelectorAll("[data-docs-nav-open]");
  const setExpanded = (expanded) => {
    triggers.forEach((trigger) => trigger.setAttribute("aria-expanded", String(expanded)));
  };

  closeButton.addEventListener("click", () => {
    if (dialog.open) dialog.close();
  });
  dialog.addEventListener("close", () => {
    setExpanded(false);
    input.value = "";
    filterLinks();
  });

  triggers.forEach((trigger) => {
    trigger.setAttribute("aria-controls", "docs-navigation");
    trigger.setAttribute("aria-expanded", "false");
    trigger.addEventListener("click", () => {
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
      setExpanded(true);
      input.focus();
    });
  });
};

const fetchInclude = async (path) => {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Failed to load include: ${path} (${response.status})`);
  return response.text();
};

const mountDocsChrome = async () => {
  if (!headerTargets.length && !sidebarTargets.length) return;

  try {
    const [headerMarkup, sidebarMarkup] = await Promise.all([
      fetchInclude("/docs/_includes/header.html"),
      fetchInclude("/docs/_includes/sidebar.html"),
    ]);

    const main = document.querySelector("main");
    if (main && !main.id) main.id = "main-content";

    headerTargets.forEach((target) => {
      target.innerHTML = headerMarkup;
      markCurrentLink(target);
      markHeaderState(target);
    });

    sidebarTargets.forEach((target) => {
      target.innerHTML = sidebarMarkup;
      markCurrentLink(target);
      openActiveGroups(target);
      openDisclosureIfActive(target);
      createNavigationDialog(target);
    });
  } catch (error) {
    console.error(error);
  }
};

mountDocsChrome();
