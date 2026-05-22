export const componentDocs = {
  button: {
    name: 'Button',
    summary: 'Triggers a direct user action with a clear, reusable action surface.',
    accomplishes:
      'Buttons provide the primary command surface for forms, toolbars, dialogs, and section-level actions.',
    howToUse: [
      'Use `.button` on a native `<button>` or action link when the UI needs an obvious command target.',
      'Keep the label short and action-oriented so the intent is clear at a glance.',
      'Use primitives such as `.row` or `.cluster` to position buttons. Do not bake page spacing into button variants.',
    ],
    keyClasses: ['.button', '.btn (legacy alias)'],
    preview: `
      <div class="cluster">
        <button class="button" type="button">Save Changes</button>
        <button class="button" type="button">Preview</button>
      </div>
    `,
    code: `<div class="cluster">
  <button class="button" type="button">Save Changes</button>
  <button class="button" type="button">Preview</button>
</div>`,
  },
  breadcrumbs: {
    name: 'Breadcrumbs',
    summary: 'Shows the current location within a hierarchy and supports quick backtracking.',
    accomplishes:
      'Breadcrumbs provide lightweight wayfinding for documentation, settings, and multi-level content structures.',
    howToUse: [
      'Use a semantic `<nav>` with `aria-label` plus an ordered list of breadcrumb items.',
      'Mark the current page item with `aria-current="page"`.',
      'Keep breadcrumbs close to the page title or region header, not buried inside component internals.',
    ],
    keyClasses: ['.breadcrumbs', '.breadcrumbs__list', '.breadcrumbs__item', '.breadcrumbs__link'],
    preview: `
      <nav class="breadcrumbs" aria-label="Breadcrumb example">
        <ol class="breadcrumbs__list">
          <li class="breadcrumbs__item"><a class="breadcrumbs__link" href="#">Docs</a></li>
          <li class="breadcrumbs__item"><a class="breadcrumbs__link" href="#">Components</a></li>
          <li class="breadcrumbs__item" aria-current="page">Breadcrumbs</li>
        </ol>
      </nav>
    `,
    code: `<nav class="breadcrumbs" aria-label="Breadcrumb example">
  <ol class="breadcrumbs__list">
    <li class="breadcrumbs__item"><a class="breadcrumbs__link" href="#">Docs</a></li>
    <li class="breadcrumbs__item"><a class="breadcrumbs__link" href="#">Components</a></li>
    <li class="breadcrumbs__item" aria-current="page">Breadcrumbs</li>
  </ol>
</nav>`,
  },
  card: {
    name: 'Card',
    summary: 'Creates a reusable surface for grouped content without taking over page layout.',
    accomplishes:
      'Cards give content a consistent surface, border, radius, and internal rhythm while staying portable across layouts.',
    howToUse: [
      'Use `.card` for grouped content that needs a clear boundary.',
      'Pair with primitives such as `.stack` inside the card when the interior needs rhythm.',
      'Let the page shell decide width and placement. The card should not own section spacing or grid composition.',
    ],
    keyClasses: ['.card', '.card__title', '.card__text'],
    preview: `
      <article class="card stack stack--xs">
        <h2 class="card__title">Workspace Summary</h2>
        <p class="card__text">Cards hold related content while the surrounding primitive controls placement.</p>
      </article>
    `,
    code: `<article class="card stack stack--xs">
  <h2 class="card__title">Workspace Summary</h2>
  <p class="card__text">Cards hold related content while the surrounding primitive controls placement.</p>
</article>`,
  },
  carousel: {
    name: 'Carousel',
    summary: 'Presents a sequence of slides with keyboard, button, and viewport controls.',
    accomplishes:
      'The carousel supports horizontal multi-slide content rails while preserving focus management and accessible controls.',
    howToUse: [
      'Use `data-carousel` on the root and include viewport, track, slide, and control parts.',
      'Keep slide content meaningful on its own so the rail still works when users move slide by slide.',
      'Use the carousel inside a pattern when the section needs surrounding header or editorial framing.',
    ],
    keyClasses: [
      '.carousel',
      '.carousel__viewport',
      '.carousel__track',
      '.carousel__slide',
      '.carousel__button',
      '.carousel__controls',
    ],
    preview: `
      <div class="carousel" data-carousel aria-label="Component carousel example">
        <div class="carousel__viewport" data-carousel-viewport>
          <div class="carousel__track" data-carousel-track>
            <div class="carousel__slide" data-carousel-slide>
              <article class="card stack stack--xs">
                <h3 class="card__title">Slide One</h3>
                <p class="card__text">First card in the sequence.</p>
              </article>
            </div>
            <div class="carousel__slide" data-carousel-slide>
              <article class="card stack stack--xs">
                <h3 class="card__title">Slide Two</h3>
                <p class="card__text">Second card in the sequence.</p>
              </article>
            </div>
            <div class="carousel__slide" data-carousel-slide>
              <article class="card stack stack--xs">
                <h3 class="card__title">Slide Three</h3>
                <p class="card__text">Third card in the sequence.</p>
              </article>
            </div>
          </div>
        </div>
        <div class="carousel__controls">
          <div class="carousel__actions">
            <button class="carousel__button" type="button" data-carousel-prev>Prev</button>
            <button class="carousel__button" type="button" data-carousel-next>Next</button>
          </div>
          <p class="carousel__meta" data-carousel-status>1 / 3</p>
        </div>
      </div>
    `,
    code: `<div class="carousel" data-carousel aria-label="Component carousel example">
  <div class="carousel__viewport" data-carousel-viewport>
    <div class="carousel__track" data-carousel-track>
      <div class="carousel__slide" data-carousel-slide>...</div>
      <div class="carousel__slide" data-carousel-slide>...</div>
      <div class="carousel__slide" data-carousel-slide>...</div>
    </div>
  </div>
  <div class="carousel__controls">
    <div class="carousel__actions">
      <button class="carousel__button" type="button" data-carousel-prev>Prev</button>
      <button class="carousel__button" type="button" data-carousel-next>Next</button>
    </div>
    <p class="carousel__meta" data-carousel-status>1 / 3</p>
  </div>
</div>`,
    needsCarousel: true,
  },
  checkbox: {
    name: 'Checkbox',
    summary: 'Captures an independent boolean choice in a small reusable control.',
    accomplishes:
      'Checkboxes work well for opt-ins, multi-select filters, and settings that can be toggled without affecting sibling items.',
    howToUse: [
      'Wrap the control and label in `.checkbox` so the hit area stays connected.',
      'Use checkboxes when multiple options may be selected at once.',
      'Pair with field help text outside the control when the choice needs more explanation.',
    ],
    keyClasses: ['.checkbox', '.checkbox__control'],
    preview: `
      <label class="checkbox">
        <input class="checkbox__control" type="checkbox" checked />
        <span>Enable weekly digest</span>
      </label>
    `,
    code: `<label class="checkbox">
  <input class="checkbox__control" type="checkbox" checked />
  <span>Enable weekly digest</span>
</label>`,
  },
  divider: {
    name: 'Divider',
    summary: 'Separates adjacent content groups without introducing a new layout abstraction.',
    accomplishes:
      'Dividers provide a lightweight visual break inside cards, panels, settings groups, and other repeated content surfaces.',
    howToUse: [
      'Use `.divider` when content inside a surface needs a subtle separation.',
      'Keep it inside a component or grouped content region rather than using it for section-level page spacing.',
      'Use semantic headings or spacing first; use a divider when the boundary still needs reinforcement.',
    ],
    keyClasses: ['.divider'],
    preview: `
      <article class="card stack stack--sm">
        <h3 class="card__title">Workspace Settings</h3>
        <p class="card__text">Primary configuration group.</p>
        <hr class="divider" />
        <p class="card__text">Secondary configuration group.</p>
      </article>
    `,
    code: `<article class="card stack stack--sm">
  <h3 class="card__title">Workspace Settings</h3>
  <p class="card__text">Primary configuration group.</p>
  <hr class="divider" />
  <p class="card__text">Secondary configuration group.</p>
</article>`,
  },
  field: {
    name: 'Field Messaging',
    summary: 'Provides shared label and message styles around form controls.',
    accomplishes:
      'Field classes create a consistent language for labels, hints, success messages, warnings, and errors around inputs.',
    howToUse: [
      'Use `.field-label` above a control when the field needs a clear visible label.',
      'Use `.field-hint`, `.field-success`, `.field-warning`, or `.field-error` for supporting messages.',
      'Keep the form control itself separate so these helpers can be reused across input, select, and textarea.',
    ],
    keyClasses: ['.field-label', '.field-hint', '.field-success', '.field-warning', '.field-error'],
    preview: `
      <div class="stack stack--xs">
        <span class="field-label">Workspace name</span>
        <input class="input" type="text" value="themeui-lab" />
        <span class="field-hint">Used in URLs and workspace settings.</span>
        <span class="field-success">Name is available.</span>
      </div>
    `,
    code: `<div class="stack stack--xs">
  <span class="field-label">Workspace name</span>
  <input class="input" type="text" value="themeui-lab" />
  <span class="field-hint">Used in URLs and workspace settings.</span>
  <span class="field-success">Name is available.</span>
</div>`,
  },
  input: {
    name: 'Input',
    summary: 'Handles short, single-line text entry in forms and settings flows.',
    accomplishes:
      'Inputs provide a consistent single-line field surface for names, titles, email addresses, IDs, and other compact values.',
    howToUse: [
      'Use `.input` on native text-like `<input>` elements.',
      'Pair with field messaging classes when the control needs labels or supporting text.',
      'Use textarea when the value needs longer, multi-line authoring.',
    ],
    keyClasses: ['.input'],
    preview: `
      <label class="stack stack--xs">
        <span class="field-label">Display name</span>
        <input class="input" type="text" placeholder="ThemeUI Lab Team" />
        <span class="field-hint">Shown on your public workspace profile.</span>
      </label>
    `,
    code: `<label class="stack stack--xs">
  <span class="field-label">Display name</span>
  <input class="input" type="text" placeholder="ThemeUI Lab Team" />
  <span class="field-hint">Shown on your public workspace profile.</span>
</label>`,
  },
  list: {
    name: 'List',
    summary: 'Creates a reusable rhythm shell for repeated content entries.',
    accomplishes:
      'The list component keeps repeated content blocks visually consistent while leaving the item element semantic and flexible.',
    howToUse: [
      'Use `.list` as the outer shell and choose the inner item element by meaning: `li`, `article`, or `div`.',
      'Add `.list__title` and `.list__text` only when the item needs those subparts.',
      'Do not treat `.list` as a page-level layout primitive.',
    ],
    keyClasses: ['.list', '.list__item', '.list__title', '.list__text'],
    preview: `
      <div class="list">
        <article class="list__item">
          <h3 class="list__title">Release notes</h3>
          <p class="list__text">Summarize stable changes for downstream teams.</p>
        </article>
        <article class="list__item">
          <h3 class="list__title">Migration guide</h3>
          <p class="list__text">Call out what changed and how to adopt it.</p>
        </article>
      </div>
    `,
    code: `<div class="list">
  <article class="list__item">
    <h3 class="list__title">Release notes</h3>
    <p class="list__text">Summarize stable changes for downstream teams.</p>
  </article>
  <article class="list__item">
    <h3 class="list__title">Migration guide</h3>
    <p class="list__text">Call out what changed and how to adopt it.</p>
  </article>
</div>`,
  },
  pagination: {
    name: 'Pagination',
    summary: 'Provides a simple, reusable page-navigation pattern for long content sets.',
    accomplishes:
      'Pagination helps users move through multi-page datasets or archives with a predictable link-based navigation surface.',
    howToUse: [
      'Wrap the component in a semantic `<nav>` with an accessible label.',
      'Use `.pagination__list` and `.pagination__link` for the visible page controls.',
      'Mark the current page with `aria-current="page"` and disable unavailable links when needed.',
    ],
    keyClasses: ['.pagination', '.pagination__list', '.pagination__link'],
    preview: `
      <nav class="pagination" aria-label="Pagination example">
        <ul class="pagination__list">
          <li><a class="pagination__link" href="#" aria-disabled="true">Prev</a></li>
          <li><a class="pagination__link" href="#" aria-current="page">1</a></li>
          <li><a class="pagination__link" href="#">2</a></li>
          <li><a class="pagination__link" href="#">3</a></li>
          <li><a class="pagination__link" href="#">Next</a></li>
        </ul>
      </nav>
    `,
    code: `<nav class="pagination" aria-label="Pagination example">
  <ul class="pagination__list">
    <li><a class="pagination__link" href="#" aria-disabled="true">Prev</a></li>
    <li><a class="pagination__link" href="#" aria-current="page">1</a></li>
    <li><a class="pagination__link" href="#">2</a></li>
    <li><a class="pagination__link" href="#">3</a></li>
    <li><a class="pagination__link" href="#">Next</a></li>
  </ul>
</nav>`,
  },
  'post-card': {
    name: 'Post Card',
    summary: 'Presents editorial content as a compact, reusable media card.',
    accomplishes:
      'Post cards package image, eyebrow, title, and excerpt into a reusable unit for recommendation rails and editorial lists.',
    howToUse: [
      'Use `.post-card` inside lists, carousels, or related-content patterns.',
      'Keep editorial section composition outside the card so the same content unit can be reused across contexts.',
      'Use meaningful alt text on the media image and wrap the card in a link when the whole card is navigational.',
    ],
    keyClasses: [
      '.post-card',
      '.post-card__link',
      '.post-card__media',
      '.post-card__image',
      '.post-card__body',
      '.post-card__eyebrow',
      '.post-card__title',
      '.post-card__excerpt',
    ],
    preview: `
      <article class="post-card">
        <a class="post-card__link" href="#">
          <div class="post-card__media">
            <img class="post-card__image" src="/demo-related-sunset.svg" alt="Abstract sunset by the water" />
          </div>
          <div class="post-card__body">
            <p class="post-card__eyebrow">Design System</p>
            <h3 class="post-card__title">Ship portable content cards without making page-specific variants.</h3>
            <p class="post-card__excerpt">The post card stays reusable because section-level layout remains outside the component.</p>
          </div>
        </a>
      </article>
    `,
    code: `<article class="post-card">
  <a class="post-card__link" href="#">
    <div class="post-card__media">
      <img class="post-card__image" src="/demo-related-sunset.svg" alt="Abstract sunset by the water" />
    </div>
    <div class="post-card__body">
      <p class="post-card__eyebrow">Design System</p>
      <h3 class="post-card__title">Ship portable content cards without making page-specific variants.</h3>
      <p class="post-card__excerpt">The post card stays reusable because section-level layout remains outside the component.</p>
    </div>
  </a>
</article>`,
  },
  radio: {
    name: 'Radio',
    summary: 'Captures one choice from a mutually exclusive group of options.',
    accomplishes:
      'Radio controls provide a clear single-selection input for visibility, mode, and mutually exclusive setting decisions.',
    howToUse: [
      'Use native radio inputs grouped by a shared `name` attribute.',
      'Wrap each control and label inside `.radio` for consistent structure.',
      'Use radios when only one option in the group may be selected.',
    ],
    keyClasses: ['.radio', '.radio__control'],
    preview: `
      <fieldset class="stack stack--xs">
        <legend>Visibility</legend>
        <label class="radio">
          <input class="radio__control" type="radio" name="radio-docs-example" checked />
          <span>Visible to workspace</span>
        </label>
        <label class="radio">
          <input class="radio__control" type="radio" name="radio-docs-example" />
          <span>Visible to organization</span>
        </label>
      </fieldset>
    `,
    code: `<fieldset class="stack stack--xs">
  <legend>Visibility</legend>
  <label class="radio">
    <input class="radio__control" type="radio" name="radio-docs-example" checked />
    <span>Visible to workspace</span>
  </label>
  <label class="radio">
    <input class="radio__control" type="radio" name="radio-docs-example" />
    <span>Visible to organization</span>
  </label>
</fieldset>`,
  },
  select: {
    name: 'Select',
    summary: 'Lets users choose one option from a compact list of predefined values.',
    accomplishes:
      'Selects support controlled option picking for environment, team, status, and other bounded value sets.',
    howToUse: [
      'Use `.select` on a native `<select>` element.',
      'Choose select when the available values are predefined and the UI does not need freeform input.',
      'Pair with field messaging when the control needs context or validation feedback.',
    ],
    keyClasses: ['.select'],
    preview: `
      <label class="stack stack--xs">
        <span class="field-label">Environment</span>
        <select class="select">
          <option>Choose an environment</option>
          <option>Production</option>
          <option>Staging</option>
          <option>Development</option>
        </select>
      </label>
    `,
    code: `<label class="stack stack--xs">
  <span class="field-label">Environment</span>
  <select class="select">
    <option>Choose an environment</option>
    <option>Production</option>
    <option>Staging</option>
    <option>Development</option>
  </select>
</label>`,
  },
  switch: {
    name: 'Switch',
    summary: 'Represents an immediate on/off setting with a dedicated control style.',
    accomplishes:
      'Switches work well for binary settings that toggle instantly, such as autosave, notifications, or feature flags.',
    howToUse: [
      'Use `.switch` for immediate setting toggles rather than multi-choice selection.',
      'Wrap the control and label in the same element to keep the interaction target unified.',
      'Use checkbox instead when the UI represents a non-immediate opt-in choice rather than a setting state.',
    ],
    keyClasses: ['.switch', '.switch__control'],
    preview: `
      <label class="switch">
        <input class="switch__control" type="checkbox" checked />
        <span>Autosave enabled</span>
      </label>
    `,
    code: `<label class="switch">
  <input class="switch__control" type="checkbox" checked />
  <span>Autosave enabled</span>
</label>`,
  },
  table: {
    name: 'Table',
    summary: 'Styles native tables for structured data while preserving semantic HTML.',
    accomplishes:
      'The table component makes real data tables readable and reusable without replacing the native table model.',
    howToUse: [
      'Use real table elements in order: table, caption, thead, tbody, tr, and scoped header cells.',
      'Wrap large tables in `.table-wrapper` when horizontal overflow is possible.',
      'Do not rebuild table semantics with divs when the content is truly tabular.',
    ],
    keyClasses: ['.table-wrapper', '.table'],
    preview: `
      <div class="table-wrapper">
        <table class="table">
          <caption>Team access</caption>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Role</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ada Lovelace</td>
              <td>Admin</td>
              <td>Active</td>
            </tr>
            <tr>
              <td>Grace Hopper</td>
              <td>Editor</td>
              <td>Invited</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    code: `<div class="table-wrapper">
  <table class="table">
    <caption>Team access</caption>
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Role</th>
        <th scope="col">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Ada Lovelace</td>
        <td>Admin</td>
        <td>Active</td>
      </tr>
    </tbody>
  </table>
</div>`,
  },
  tabs: {
    name: 'Tabs',
    summary: 'Organizes related panels behind a small, keyboard-accessible tab interface.',
    accomplishes:
      'Tabs help users switch between related views without leaving the current page or duplicating surrounding context.',
    howToUse: [
      'Use a root with `data-tabs`, a list of tab buttons, and matching tab panels.',
      'Ensure each tab button uses `aria-controls` to reference the matching panel ID.',
      'Use tabs for closely related views, not for large page navigation.',
    ],
    keyClasses: ['.tabs', '.tabs__list', '.tabs__tab', '.tabs__panel'],
    preview: `
      <div class="tabs" data-tabs>
        <div class="tabs__list" role="tablist" aria-label="Tabs example">
          <button class="tabs__tab" id="tab-overview" type="button" role="tab" aria-selected="true" aria-controls="panel-overview">Overview</button>
          <button class="tabs__tab" id="tab-details" type="button" role="tab" aria-selected="false" aria-controls="panel-details">Details</button>
        </div>
        <section class="tabs__panel" id="panel-overview" role="tabpanel" aria-labelledby="tab-overview">
          <p>Overview content lives here.</p>
        </section>
        <section class="tabs__panel" id="panel-details" role="tabpanel" aria-labelledby="tab-details" hidden>
          <p>Details content lives here.</p>
        </section>
      </div>
    `,
    code: `<div class="tabs" data-tabs>
  <div class="tabs__list" role="tablist" aria-label="Tabs example">
    <button class="tabs__tab" id="tab-overview" type="button" role="tab" aria-selected="true" aria-controls="panel-overview">Overview</button>
    <button class="tabs__tab" id="tab-details" type="button" role="tab" aria-selected="false" aria-controls="panel-details">Details</button>
  </div>
  <section class="tabs__panel" id="panel-overview" role="tabpanel" aria-labelledby="tab-overview">
    <p>Overview content lives here.</p>
  </section>
  <section class="tabs__panel" id="panel-details" role="tabpanel" aria-labelledby="tab-details" hidden>
    <p>Details content lives here.</p>
  </section>
</div>`,
    needsTabs: true,
  },
  tag: {
    name: 'Tag',
    summary: 'Displays compact status, metadata, or category labels in a consistent pill surface.',
    accomplishes:
      'Tags help users scan short labels such as state, topic, audience, or quick metadata without adding heavy structural UI.',
    howToUse: [
      'Use `.tag` for short non-interactive labels.',
      'Keep the content concise so the tag stays compact and readable.',
      'Use buttons or links instead when the chip needs to behave like an action control.',
    ],
    keyClasses: ['.tag'],
    preview: `
      <div class="cluster">
        <span class="tag">Stable</span>
        <span class="tag">Docs</span>
        <span class="tag">Internal</span>
      </div>
    `,
    code: `<div class="cluster">
  <span class="tag">Stable</span>
  <span class="tag">Docs</span>
  <span class="tag">Internal</span>
</div>`,
  },
  textarea: {
    name: 'Textarea',
    summary: 'Handles longer freeform text entry inside the system field language.',
    accomplishes:
      'Textareas provide a reusable multi-line editing surface for notes, templates, descriptions, and longer authored content.',
    howToUse: [
      'Use `.textarea` on a native `<textarea>`.',
      'Choose textarea when the user needs multiple lines or more open-ended writing space.',
      'Pair with labels and field messages the same way as input and select controls.',
    ],
    keyClasses: ['.textarea'],
    preview: `
      <label class="stack stack--xs">
        <span class="field-label">Release notes template</span>
        <textarea class="textarea" placeholder="Write a longer message..."></textarea>
        <span class="field-hint">Keep this concise and reusable across releases.</span>
      </label>
    `,
    code: `<label class="stack stack--xs">
  <span class="field-label">Release notes template</span>
  <textarea class="textarea" placeholder="Write a longer message..."></textarea>
  <span class="field-hint">Keep this concise and reusable across releases.</span>
</label>`,
  },
};
