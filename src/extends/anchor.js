/**
 * ConfirmAnchor class that extends Anchor
 */
export default class ConfirmAnchor extends HTMLAnchorElement {
  /**
   * Attach
   */
  connectedCallback() {
    this.clickLisnner = e => {
      const result = confirm(`Jump to link? : '${this.href}'`);
      if (!result) {
        // Disable Anchor action
        e.preventDefault();
      }
    }
    this.addEventListener('click', this.clickLisnner);
  }

  /**
   * Detach
   */
  disconnectedCallback() {
    this.removeEventListener('click', this.clickLisnner);
  }
}

// Register custom element
// Add third argument when extends existing browser element
customElements.define('x-confirm-anchor', ConfirmAnchor, { extends: 'a' });
