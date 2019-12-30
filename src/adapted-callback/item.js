/**
 * AdaptedCallback implementation class
 */
export default class AdaptedItem extends HTMLElement {
  /**
   * Attach
   */
  connectedCallback() {
    this.innerHTML = '<h1>Adapted Callback</h1>';
  }

  /**
   * When the owner document moves
   * In other words, fire when the parent html is changed to another html
   */
  adoptedCallback() {
    alert('adoptedCallback');
  }
}

// Register custom element
window.customElements.define('x-adapted-item', AdaptedItem);
