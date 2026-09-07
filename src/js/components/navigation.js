function getNavigationRoots(scope = document) {
  return Array.from(scope.querySelectorAll('.nav-main'));
}

function getDropdown(trigger) {
  return trigger.parentElement?.querySelector('.nav-main__dropdown') ?? null;
}

function ensureId(element, prefix, index) {
  if (!element.id) {
    element.id = `${prefix}-${index}`;
  }

  return element.id;
}

function setDropdownState(trigger, open) {
  const dropdown = getDropdown(trigger);

  if (!dropdown) return;

  trigger.setAttribute('aria-expanded', String(open));
  dropdown.toggleAttribute('data-open', open);
  dropdown.hidden = !open;
}

function setDrawerState(toggle, drawer, open, { restoreFocus = true } = {}) {
  if (!drawer) return;

  toggle.setAttribute('aria-expanded', String(open));
  drawer.toggleAttribute('data-open', open);
  drawer.hidden = !open;

  if (open) {
    requestAnimationFrame(() => {
      drawer.querySelector('a[href], button:not([disabled])')?.focus();
    });
  } else if (restoreFocus) {
    toggle.focus();
  }
}

/**
 * Adds the small amount of state management needed by the navigation
 * component. Links remain ordinary links; only disclosures receive JS.
 */
export function initMainNavigation(scope = document) {
  getNavigationRoots(scope).forEach((root, rootIndex) => {
    if (root.dataset.navigationReady === 'true') return;

    root.dataset.navigationReady = 'true';
    const dropdownTriggers = Array.from(root.querySelectorAll('.nav-main__link--dropdown'));
    const toggle = root.querySelector('.nav-main__toggle');
    const drawerId = toggle?.getAttribute('aria-controls');
    const drawer = drawerId ? document.getElementById(drawerId) : null;

    dropdownTriggers.forEach((trigger, triggerIndex) => {
      const dropdown = getDropdown(trigger);
      if (!dropdown) return;

      trigger.setAttribute('aria-controls', ensureId(dropdown, `nav-dropdown-${rootIndex}`, triggerIndex));
      setDropdownState(trigger, false);

      trigger.addEventListener('click', () => {
        const shouldOpen = trigger.getAttribute('aria-expanded') !== 'true';
        dropdownTriggers.forEach((candidate) => setDropdownState(candidate, candidate === trigger && shouldOpen));
      });
    });

    if (toggle && drawer) {
      setDrawerState(toggle, drawer, false, { restoreFocus: false });
      toggle.addEventListener('click', () => {
        setDrawerState(toggle, drawer, toggle.getAttribute('aria-expanded') !== 'true');
      });
    }

    root.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;

      const openTrigger = dropdownTriggers.find((trigger) => trigger.getAttribute('aria-expanded') === 'true');

      if (openTrigger) {
        setDropdownState(openTrigger, false);
        openTrigger.focus();
      } else if (toggle && drawer && !drawer.hidden) {
        setDrawerState(toggle, drawer, false);
      }
    });

    document.addEventListener('click', (event) => {
      if (root.contains(event.target)) return;
      dropdownTriggers.forEach((trigger) => setDropdownState(trigger, false));
    });
  });
}
