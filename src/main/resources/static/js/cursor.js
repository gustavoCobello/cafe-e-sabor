/* ============================================
   CUSTOM CURSOR - MINIMALIST SQUARE
   ============================================ */

class MinimalistCursor {
  constructor() {
    this.dot = null;
    this.outline = null;
    this.mouseX = -100;
    this.mouseY = -100;
    this.outlineX = -100;
    this.outlineY = -100;
    this.isHovering = false;
    this.isClicking = false;
    this.isOnText = false;
    this.isHidden = false;
    this.delay = 0.08;
    this.rafId = null;

    this.init();
  }

  createElements() {
    this.dot = document.createElement('div');
    this.dot.classList.add('cursor-dot');

    this.outline = document.createElement('div');
    this.outline.classList.add('cursor-outline');

    document.body.appendChild(this.dot);
    document.body.appendChild(this.outline);
  }

  bindEvents() {
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    document.addEventListener('mousedown', () => {
      this.isClicking = true;
      this.updateStates();
    });

    document.addEventListener('mouseup', () => {
      this.isClicking = false;
      this.updateStates();
    });

    document.addEventListener('mouseenter', () => {
      this.isHidden = false;
      this.updateStates();
    });

    document.addEventListener('mouseleave', () => {
      this.isHidden = true;
      this.updateStates();
    });

    const clickables = [
      'a',
      'button',
      '[role="button"]',
      'label',
      'select',
      'summary',
      '[onclick]',
      '.cursor-pointer'
    ].join(', ');

    const textInputs = [
      'input[type="text"]',
      'input[type="email"]',
      'input[type="password"]',
      'input[type="search"]',
      'input[type="url"]',
      'input[type="number"]',
      'textarea',
      '[contenteditable="true"]'
    ].join(', ');

    document.querySelectorAll(clickables).forEach((el) => {
      el.addEventListener('mouseenter', () => {
        this.isHovering = true;
        this.updateStates();
      });
      el.addEventListener('mouseleave', () => {
        this.isHovering = false;
        this.updateStates();
      });
    });

    document.querySelectorAll(textInputs).forEach((el) => {
      el.addEventListener('mouseenter', () => {
        this.isOnText = true;
        this.updateStates();
      });
      el.addEventListener('mouseleave', () => {
        this.isOnText = false;
        this.updateStates();
      });
    });

    const observer = new MutationObserver(() => {
      document.querySelectorAll(clickables).forEach((el) => {
        if (!el.dataset.cursorBound) {
          el.dataset.cursorBound = true;
          el.addEventListener('mouseenter', () => { this.isHovering = true; this.updateStates(); });
          el.addEventListener('mouseleave', () => { this.isHovering = false; this.updateStates(); });
        }
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  updateStates() {
    const states = ['cursor--hover', 'cursor--click', 'cursor--text', 'cursor--hidden'];

    [this.dot, this.outline].forEach((el) => {
      states.forEach((s) => el.classList.remove(s));
    });

    if (this.isHidden) {
      [this.dot, this.outline].forEach((el) => el.classList.add('cursor--hidden'));
      return;
    }

    if (this.isClicking) {
      [this.dot, this.outline].forEach((el) => el.classList.add('cursor--click'));
      return;
    }

    if (this.isOnText) {
      [this.dot, this.outline].forEach((el) => el.classList.add('cursor--text'));
      return;
    }

    if (this.isHovering) {
      [this.dot, this.outline].forEach((el) => el.classList.add('cursor--hover'));
    }
  }

  animate() {
    this.dot.style.transform = `translate(${this.mouseX - 0}px, ${this.mouseY - 0}px) translate(-50%, -50%)`;

    this.outlineX += (this.mouseX - this.outlineX) * (1 - this.delay * 0.92 + 0.05);
    this.outlineY += (this.mouseY - this.outlineY) * (1 - this.delay * 0.92 + 0.05);

    this.outline.style.transform = `translate(${this.outlineX}px, ${this.outlineY}px) translate(-50%, -50%)`;

    this.rafId = requestAnimationFrame(() => this.animate());
  }

  init() {
    if (window.matchMedia('(pointer: fine)').matches) {
      this.createElements();
      this.bindEvents();
      this.animate();
    }
  }

  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.dot?.remove();
    this.outline?.remove();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.customCursor = new MinimalistCursor();
});