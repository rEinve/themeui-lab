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
    viewport: root.querySelector('[data-carousel-viewport]') || root.querySelector('.carousel__viewport'),
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

function getCarouselMetrics(root) {
  const { viewport, track, slides } = getParts(root);

  if (!viewport || !track || !slides.length) {
    return null;
  }

  const maxOffset = Math.max(0, track.scrollWidth - viewport.clientWidth);
  const offsets = slides.map((slide) => Math.min(slide.offsetLeft, maxOffset));
  const finalIndex = offsets.findIndex((offset) => offset >= maxOffset);
  const maxIndex = finalIndex === -1 ? Math.max(0, slides.length - 1) : finalIndex;

  return {
    viewport,
    track,
    slides,
    maxOffset,
    offsets,
    maxIndex,
  };
}

function renderCarousel(root, index) {
  const metrics = getCarouselMetrics(root);
  const { prev, next, status, dots } = getParts(root);

  if (!metrics) return;

  const { viewport, track, slides, offsets, maxIndex } = metrics;
  const clampedIndex = Math.max(0, Math.min(index, maxIndex));
  const currentOffset = offsets[clampedIndex] || 0;

  root.dataset.carouselIndex = String(clampedIndex);
  track.style.transform = `translateX(-${currentOffset}px)`;

  slides.forEach((slide, slideIndex) => {
    const slideStart = slide.offsetLeft;
    const slideEnd = slideStart + slide.offsetWidth;
    const isVisible = slideStart < currentOffset + viewport.clientWidth && slideEnd > currentOffset;

    slide.dataset.carouselVisible = String(isVisible);
    slide.dataset.carouselCurrent = String(slideIndex === clampedIndex);
    setSlideInteractivity(slide, isVisible);
  });

  dots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === clampedIndex;
    dot.setAttribute('aria-current', String(isActive));
    dot.disabled = isActive;
  });

  if (prev) prev.disabled = clampedIndex === 0;
  if (next) next.disabled = clampedIndex === maxIndex;
  if (status) status.textContent = `${clampedIndex + 1} / ${maxIndex + 1}`;
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
    if (root.dataset.carouselReady === 'true') return;

    const { slides, prev, next, dots } = getParts(root);

    if (!slides.length) return;

    root.dataset.carouselReady = 'true';
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

    const rerender = () => renderCarousel(root, Number(root.dataset.carouselIndex || 0));

    window.addEventListener('resize', rerender);
    renderCarousel(root, Number(root.dataset.carouselIndex || 0));
  });
}
