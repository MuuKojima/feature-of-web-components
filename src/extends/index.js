import './anchor.js';

/**
 * Extends testing class
 */
export default class XExtends extends HTMLElement {
  /**
   * Attach
   */
  connectedCallback() {
    this.innerHTML = `
      <style>
        a {
          display: block;
          text-align: center;
        }
      </style>
      <h1>Extend existing UI parts</h1>
      <!-- 
        Apply custom elements using the 'is' attribute
        Alternatively, it can also be created with the new operator, DOM API
      -->
      <a href="https://www.google.com/" is="x-confirm-anchor">https://www.google.com/</a>
    `;
  }
}

// Register custom element
window.customElements.define('x-extends', XExtends);
