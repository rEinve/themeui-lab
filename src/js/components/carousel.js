function getCarousels(scope = document) {
  return Array.from(scope.querySelectorAll('[data-carousel]'));
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button',
  'input',
  'select',
  'textarea',
  '[tabindex]',
  '[contenteditable="true"]',
].join(', ');

function getParts(root) {
  return {
    track: root.querySelector('[data-carousel-track]'),
    slides: Array.from(root.querySelectorAll('[data-carousel-slide]')),
    prev: root.querySelector('[data-carousel-prev]'),
    next: root.querySelector('[data-carousel-next]'),
    status: root.querySelector('[data-carousel-status]'),
    dots: Array.from(root.querySelectorAll('[data-carousel-dot]')),
  };
}

function setSlideInteractivity(slide, isActive) {
  const interactiveChildren = Array.from(slide.querySelectorAll(FOCUSABLE_SELECTOR));

  slide.setAttribute('aria-hidden', String(!isActive));
  slide.tabIndex = isActive ? 0 : -1;

  interactiveChildren.forEach((element) => {
    if (element === slide) return;

    if (!isActive) {
      if (!element.hasAttribute('data-carousel-tabindex')) {
        const tabindex = element.getAttribute('tabindex');
        element.setAttribute('data-carousel-tabindex', tabindex ?? '');
      }

      element.setAttribute('tabindex', '-1');
    } else if (element.hasAttribute('data-carousel-tabindex')) {
      const previousTabindex = element.getAttribute('data-carousel-tabindex');

      if (previousTabindex) {
        element.setAttribute('tabindex', previousTabindex);
      } else {
        element.removeAttribute('tabindex');
      }

      element.removeAttribute('data-carousel-tabindex');
    }
  });
}

function renderCarousel(root, index) {
  const { track, slides, prev, next, status, dots } = getParts(root);

  if (!track || !slides.length) return;

  const clampedIndex = Math.max(0, Math.min(index, slides.length - 1));
  root.dataset.carouselIndex = String(clampedIndex);
  track.style.transform = `translateX(-${clampedIndex * 100}%)`;

  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === clampedIndex;
    setSlideInteractivity(slide, isActive);
  });

  dots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === clampedIndex;
    dot.setAttribute('aria-current', String(isActive));
    dot.disabled = isActive;
  });

  if (prev) prev.disabled = clampedIndex === 0;
  if (next) next.disabled = clampedIndex === slides.length - 1;
  if (status) status.textContent = `${clampedIndex + 1} / ${slides.length}`;
}

function moveCarousel(root, delta) {
  const currentIndex = Number(root.dataset.carouselIndex || 0);
  renderCarousel(root, currentIndex + delta);
}

function onCarouselKeydown(event) {
  const root = event.currentTarget;

  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault();
      moveCarousel(root, -1);
      break;
    case 'ArrowRight':
      event.preventDefault();
      moveCarousel(root, 1);
      break;
    case 'Home':
      event.preventDefault();
      renderCarousel(root, 0);
      break;
    case 'End': {
      event.preventDefault();
      const { slides } = getParts(root);
      renderCarousel(root, slides.length - 1);
      break;
    }
    default:
      break;
  }
}

export function initCarousels(scope = document) {
  getCarousels(scope).forEach((root) => {
    const { slides, prev, next, dots } = getParts(root);

    if (!slides.length) return;

    root.tabIndex = root.hasAttribute('tabindex') ? root.tabIndex : 0;
    root.addEventListener('keydown', onCarouselKeydown);

    if (prev) {
      prev.addEventListener('click', () => moveCarousel(root, -1));
    }

    if (next) {
      next.addEventListener('click', () => moveCarousel(root, 1));
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => renderCarousel(root, index));
    });

    renderCarousel(root, Number(root.dataset.carouselIndex || 0));
  });
}
