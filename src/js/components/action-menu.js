function supportsPopover() {
  return 'popover' in HTMLElement.prototype;
}

function supportsAnchorPositioning() {
  return typeof CSS !== 'undefined' && CSS.supports('position-area: block-end');
}

function ensureId(element, prefix, index) {
  if (!element.id) {
    element.id = `${prefix}-${index}`;
  }

  return element.id;
}

function setExpanded(trigger, open) {
  trigger.setAttribute('aria-expanded', String(open));
}

function positionFallback(trigger, panel) {
  if (supportsAnchorPositioning()) return;

  const triggerBox = trigger.getBoundingClientRect();
  const panelBox = panel.getBoundingClientRect();
  const inset = 8;
  const gap = 8;
  const roomBelow = window.innerHeight - triggerBox.bottom;
  const top = roomBelow >= panelBox.height + gap
    ? triggerBox.bottom + gap
    : Math.max(inset, triggerBox.top - panelBox.height - gap);
  const left = Math.min(
    Math.max(inset, triggerBox.right - panelBox.width),
    window.innerWidth - panelBox.width - inset,
  );

  panel.style.position = 'fixed';
  panel.style.inset = 'auto';
  panel.style.top = `${top}px`;
  panel.style.left = `${left}px`;
}

/**
 * Initialises action menus as Popover API button groups. In browsers without
 * Popover, the same markup falls back to a scoped disclosure with Escape and
 * outside-click dismissal.
 */
export function initActionMenus(scope = document) {
  const cleanups = [];
  const nativePopover = supportsPopover();

  Array.from(scope.querySelectorAll('[data-action-menu]')).forEach((root, index) => {
    if (root.dataset.actionMenuReady === 'true') return;

    const trigger = root.querySelector('[data-action-menu-trigger]');
    const panel = root.querySelector('[data-action-menu-panel]');

    if (!(trigger instanceof HTMLButtonElement) || !panel) return;

    root.dataset.actionMenuReady = 'true';
    const panelId = ensureId(panel, 'action-menu-panel', index);
    trigger.setAttribute('popovertarget', panelId);
    trigger.setAttribute('aria-controls', panelId);
    setExpanded(trigger, false);

    if (nativePopover) {
      panel.setAttribute('popover', 'auto');

      const position = () => {
        if (panel.matches(':popover-open')) {
          positionFallback(trigger, panel);
        }
      };
      const onToggle = (event) => {
        const open = event.newState === 'open';
        setExpanded(trigger, open);

        if (open) position();
      };

      panel.addEventListener('toggle', onToggle);
      window.addEventListener('resize', position);
      window.addEventListener('scroll', position, true);

      const resizeObserver = typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(position);

      resizeObserver?.observe(trigger);
      resizeObserver?.observe(panel);

      cleanups.push(() => {
        panel.removeEventListener('toggle', onToggle);
        window.removeEventListener('resize', position);
        window.removeEventListener('scroll', position, true);
        resizeObserver?.disconnect();
      });

      return;
    }

    const close = ({ restoreFocus = false } = {}) => {
      panel.removeAttribute('data-fallback-open');
      setExpanded(trigger, false);

      if (restoreFocus) trigger.focus();
    };
    const toggle = () => {
      const open = !panel.hasAttribute('data-fallback-open');

      if (open) {
        panel.setAttribute('data-fallback-open', '');
      } else {
        close({ restoreFocus: true });
        return;
      }

      setExpanded(trigger, true);
    };
    const onTriggerClick = (event) => {
      event.preventDefault();
      toggle();
    };
    const onDocumentClick = (event) => {
      if (!root.contains(event.target)) close();
    };
    const onKeydown = (event) => {
      if (event.key === 'Escape' && panel.hasAttribute('data-fallback-open')) {
        close({ restoreFocus: true });
      }
    };

    trigger.addEventListener('click', onTriggerClick);
    document.addEventListener('click', onDocumentClick);
    root.addEventListener('keydown', onKeydown);

    cleanups.push(() => {
      trigger.removeEventListener('click', onTriggerClick);
      document.removeEventListener('click', onDocumentClick);
      root.removeEventListener('keydown', onKeydown);
      close();
    });
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}
