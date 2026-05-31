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

    if (!href || !href.startsWith("/")) {
      return;
    }

    const targetPath = normalizePath(href);

    if (targetPath === currentPath) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

const openActiveGroups = (root) => {
  root.querySelectorAll(".docs-sidenav__group").forEach((group) => {
    const hasCurrentPage = group.querySelector('[aria-current="page"]');
    group.open = Boolean(hasCurrentPage);
  });
};

const openDisclosureIfActive = (root) => {
  const disclosure = root.querySelector(".docs-sidenav-disclosure");
  if (!disclosure) return;
  const hasCurrentPage = disclosure.querySelector('[aria-current="page"]');
  if (hasCurrentPage) disclosure.open = true;
};

const markHeaderState = (root) => {
  const docsLink = root.querySelector('a[href="/docs/"]');

  if (!docsLink) {
    return;
  }

  if (currentPath === "/docs" || currentPath.startsWith("/docs/")) {
    docsLink.setAttribute("aria-current", "page");
  }
};

const fetchInclude = async (path) => {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to load include: ${path} (${response.status})`);
  }

  return response.text();
};

const mountDocsChrome = async () => {
  if (!headerTargets.length && !sidebarTargets.length) {
    return;
  }

  try {
    const [headerMarkup, sidebarMarkup] = await Promise.all([
      fetchInclude("/docs/_includes/header.html"),
      fetchInclude("/docs/_includes/sidebar.html"),
    ]);

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
    });
  } catch (error) {
    console.error(error);
  }
};

mountDocsChrome();
