function getTabs(scope = document) {
  return Array.from(scope.querySelectorAll('[data-tabs]'));
}

function getTabButtons(root) {
  return Array.from(root.querySelectorAll('[role="tab"]'));
}

function getTabPanels(root) {
  return Array.from(root.querySelectorAll('[role="tabpanel"]'));
}

function activateTab(root, nextTab, { moveFocus = false } = {}) {
  const tabs = getTabButtons(root);
  const panels = getTabPanels(root);

  tabs.forEach((tab) => {
    const isActive = tab === nextTab;
    const panelId = tab.getAttribute('aria-controls');

    tab.setAttribute('aria-selected', String(isActive));
    tab.setAttribute('tabindex', isActive ? '0' : '-1');

    if (!panelId) return;

    const panel = panels.find((candidate) => candidate.id === panelId);
    if (panel) {
      panel.hidden = !isActive;
    }
  });

  if (moveFocus) {
    nextTab.focus();
  }
}

function onTabKeydown(event) {
  const currentTab = event.currentTarget;
  const root = currentTab.closest('[data-tabs]');

  if (!root) return;

  const tabs = getTabButtons(root);
  const index = tabs.indexOf(currentTab);

  if (index === -1) return;

  let nextIndex = index;

  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowDown':
      nextIndex = (index + 1) % tabs.length;
      break;
    case 'ArrowLeft':
    case 'ArrowUp':
      nextIndex = (index - 1 + tabs.length) % tabs.length;
      break;
    case 'Home':
      nextIndex = 0;
      break;
    case 'End':
      nextIndex = tabs.length - 1;
      break;
    default:
      return;
  }

  event.preventDefault();
  activateTab(root, tabs[nextIndex], { moveFocus: true });
}

export function initTabs(scope = document) {
  getTabs(scope).forEach((root) => {
    const tabs = getTabButtons(root);

    if (!tabs.length) return;

    const activeTab =
      tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') || tabs[0];

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => activateTab(root, tab));
      tab.addEventListener('keydown', onTabKeydown);
    });

    activateTab(root, activeTab);
  });
}
