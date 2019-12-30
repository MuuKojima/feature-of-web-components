import './noshadow.js';
import './shadow.js';

/**
 * ShadowRoot testing class
 */
export default class ShadowNoShadow extends HTMLElement {
  /**
   * Attach
   */
  connectedCallback() {
    this.innerHTML = `
      <style>
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 50px 0;
        }
        x-noshadow,
        x-shadow {
          width: 600px;
        }
      </style>
      <h1>Enable or Disable of ShadowRoot</h1>
      <div class="container">
        <x-noshadow></x-noshadow>
        <x-shadow><x-shadow>
      </div>
    `
  }
}

// Register custom element
window.customElements.define('x-shadow-noshadow', ShadowNoShadow);
