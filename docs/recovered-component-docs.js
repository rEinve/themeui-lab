export const recoveredComponentDocs = {
  'action-menu': {
    name: 'Action Menu',
    summary: 'Groups secondary actions behind a compact, accessible menu trigger.',
    accomplishes: 'Action Menu keeps a busy interface calm while preserving ordinary buttons and links for individual actions.',
    howToUse: [
      'Use one labelled trigger and a short list of actions.',
      'Keep destructive actions visually distinct and ask for confirmation when the consequence warrants it.',
      'Call `initActionMenus()` when the menu is rendered dynamically.',
    ],
    keyClasses: ['.action-menu', '.action-menu__panel', '.action-menu__item', '.action-menu__item--danger'],
    preview: `
      <div class="action-menu" data-action-menu>
        <button class="button button--ghost" type="button" data-action-menu-trigger>More actions</button>
        <div class="action-menu__panel" data-action-menu-panel>
          <button class="action-menu__item" type="button">Duplicate</button>
          <button class="action-menu__item action-menu__item--danger" type="button">Archive</button>
        </div>
      </div>`,
    code: `<div class="action-menu" data-action-menu>
  <button type="button" data-action-menu-trigger>More actions</button>
  <div class="action-menu__panel" data-action-menu-panel>
    <button class="action-menu__item" type="button">Duplicate</button>
  </div>
</div>`,
    needsActionMenus: true,
  },
  avatar: {
    name: 'Avatar',
    summary: 'Represents a person or entity with a photo or meaningful initials.',
    accomplishes: 'Avatar gives people and accounts a consistent visual marker without deciding the surrounding layout.',
    howToUse: ['Use an image when one is available; otherwise use initials and an accessible name nearby.', 'Use size modifiers only when the surrounding control needs a different density.', 'Pair it with profile identity when a name and role are also needed.'],
    keyClasses: ['.avatar', '.avatar__image', '.avatar--sm', '.avatar--lg', '.avatar--accent', '.avatar-identity'],
    preview: `<div class="cluster" style="align-items:center"><span class="avatar avatar--accent" aria-label="Meshack M">MM</span><span class="avatar avatar--lg" aria-label="Alex Rivera">AR</span><span class="avatar-identity"><span class="avatar" aria-hidden="true">JL</span><span class="avatar-identity__name">Jordan Lee</span></span></div>`,
    code: `<span class="avatar" aria-label="Jordan Lee">JL</span>

<span class="avatar-identity">
  <span class="avatar" aria-hidden="true">JL</span>
  <span class="avatar-identity__name">Jordan Lee</span>
</span>`,
  },
  badge: {
    name: 'Badge',
    summary: 'Shows a short non-interactive state or status label.',
    accomplishes: 'Badges make compact state information scannable without pretending to be an action.',
    howToUse: ['Keep label text brief and specific.', 'Use a semantic variant for meaningful feedback states.', 'Use a button or link instead when the label must be interactive.'],
    keyClasses: ['.badge', '.badge--info', '.badge--success', '.badge--warning', '.badge--danger', '.status-indicator'],
    preview: `<div class="cluster"><span class="badge">Draft</span><span class="badge badge--success">Live</span><span class="badge badge--warning">Needs review</span><span class="status-indicator status-indicator--info"><span class="status-indicator__dot"></span>Syncing</span></div>`,
    code: `<span class="badge badge--success">Live</span>
<span class="status-indicator status-indicator--info"><span class="status-indicator__dot"></span>Syncing</span>`,
  },
  'empty-state': {
    name: 'Empty State',
    summary: 'Explains a deliberately empty region and gives the next useful action.',
    accomplishes: 'Empty State helps someone understand what is absent, why it matters, and how to move forward.',
    howToUse: ['State what is empty in plain language.', 'Use one clear action when a useful next step exists.', 'Let the parent primitive determine the page width and placement.'],
    keyClasses: ['.empty-state', '.empty-state__icon', '.empty-state__title', '.empty-state__message', '.empty-state__action', '.empty-state--compact'],
    preview: `<section class="empty-state"><span class="empty-state__icon" aria-hidden="true">+</span><h3 class="empty-state__title">No saved views yet</h3><p class="empty-state__message">Save a useful filter to find it quickly next time.</p><button class="button empty-state__action" type="button">Create a view</button></section>`,
    code: `<section class="empty-state">
  <h2 class="empty-state__title">No saved views yet</h2>
  <p class="empty-state__message">Save a useful filter to find it quickly next time.</p>
  <button class="button empty-state__action" type="button">Create a view</button>
</section>`,
  },
  'icon-button': {
    name: 'Icon Button',
    summary: 'Provides a compact action control when a familiar icon is clearer than text.',
    accomplishes: 'Icon Button preserves a usable hit target and clear focus behaviour in dense toolbars and controls.',
    howToUse: ['Always provide an accessible name with `aria-label` when no visible text is present.', 'Use an ordinary button for actions and a link for navigation.', 'Reserve the danger variant for destructive actions.'],
    keyClasses: ['.icon-button', '.icon-button--ghost', '.icon-button--danger'],
    preview: `<div class="cluster"><button class="icon-button" type="button" aria-label="Edit">✎</button><button class="icon-button icon-button--ghost" type="button" aria-label="More options">•••</button><button class="icon-button icon-button--danger" type="button" aria-label="Delete">×</button></div>`,
    code: `<button class="icon-button" type="button" aria-label="Edit">✎</button>`,
  },
  'profile-identity': {
    name: 'Profile Identity',
    summary: 'Keeps an avatar, name, and optional supporting detail together as one reusable unit.',
    accomplishes: 'Profile Identity makes account and author references consistent while leaving page placement to layout primitives.',
    howToUse: ['Use the avatar as the first element unless the trailing modifier better matches the surrounding control.', 'Use the meta line for a short role or context.', 'Choose the compact modifier for dense lists and controls.'],
    keyClasses: ['.profile-identity', '.profile-identity__content', '.profile-identity__name', '.profile-identity__meta', '.profile-identity--compact', '.profile-identity--stacked', '.profile-identity--trailing'],
    preview: `<div class="cluster"><a class="profile-identity" href="#"><span class="avatar" aria-hidden="true">MM</span><span class="profile-identity__content"><span class="profile-identity__name">Meshack M</span><span class="profile-identity__meta">Owner</span></span></a></div>`,
    code: `<a class="profile-identity" href="/profile">
  <span class="avatar" aria-hidden="true">MM</span>
  <span class="profile-identity__content"><span class="profile-identity__name">Meshack M</span><span class="profile-identity__meta">Owner</span></span>
</a>`,
  },
  progress: {
    name: 'Progress',
    summary: 'Shows task completion with a native progress element and a readable value.',
    accomplishes: 'Progress makes an active process understandable without replacing the native semantics that assistive technology recognises.',
    howToUse: ['Use a real `<progress>` with a meaningful value and max.', 'Show a readable label and value alongside the visual bar.', 'Use variants only when the status colour communicates a real state.'],
    keyClasses: ['.progress', '.progress__header', '.progress__label', '.progress__value', '.progress__bar', '.progress--success'],
    preview: `<div class="progress progress--success"><div class="progress__header"><span class="progress__label">Importing contacts</span><span class="progress__value">72%</span></div><progress class="progress__bar" value="72" max="100">72%</progress></div>`,
    code: `<div class="progress">
  <div class="progress__header"><span class="progress__label">Importing contacts</span><span class="progress__value">72%</span></div>
  <progress class="progress__bar" value="72" max="100">72%</progress>
</div>`,
  },
  'side-nav': {
    name: 'Side Navigation',
    summary: 'Presents a compact hierarchy of related destinations.',
    accomplishes: 'Side Navigation gives nearby wayfinding without taking ownership of the page shell, column, or breakpoint strategy.',
    howToUse: ['Use a semantic navigation landmark with a visible or accessible label.', 'Mark the current destination with `aria-current="page"`.', 'Use the nested list only where a real hierarchy exists.'],
    keyClasses: ['.side-nav', '.side-nav__title', '.side-nav__list', '.side-nav__sublist', '.side-nav__link'],
    preview: `<nav class="side-nav" aria-label="Account settings"><p class="side-nav__title">Settings</p><ul class="side-nav__list"><li><a class="side-nav__link" href="#profile" aria-current="page">Profile</a></li><li><a class="side-nav__link" href="#security">Security</a></li></ul></nav>`,
    code: `<nav class="side-nav" aria-label="Account settings">
  <p class="side-nav__title">Settings</p>
  <ul class="side-nav__list"><li><a class="side-nav__link" href="/settings/profile" aria-current="page">Profile</a></li></ul>
</nav>`,
  },
  tooltip: {
    name: 'Tooltip',
    summary: 'Reveals a brief supplementary description for a labelled control.',
    accomplishes: 'Tooltip supplies short clarification on hover and keyboard focus while keeping its content available to assistive technology.',
    howToUse: ['Keep the text brief and non-interactive.', 'Use `aria-describedby` to connect the control to the description.', 'Do not hide essential instructions exclusively in a tooltip.'],
    keyClasses: ['.tooltip', '.tooltip__content', '.tooltip--bottom'],
    preview: `<span class="tooltip"><button class="icon-button" type="button" aria-label="Export" aria-describedby="export-tip">↓</button><span class="tooltip__content" id="export-tip" role="tooltip">Export this report as CSV</span></span>`,
    code: `<span class="tooltip">
  <button class="icon-button" type="button" aria-label="Export" aria-describedby="export-tip">↓</button>
  <span class="tooltip__content" id="export-tip" role="tooltip">Export this report as CSV</span>
</span>`,
  },
};
