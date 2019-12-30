/**
 * ShadowRoot enabled class
 */
export default class Shadow extends HTMLElement {
  /**
   * Constructor
   */
  constructor() {
    super();
    // Constructor is recommended for forming shadowRoot
    this.attachShadow({mode: 'open'});
  }

  /**
   * Attach
   */
  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        h1 {
          font-size: 30px;
          color: #d51b5a;
          text-align: center;
        }
        .box-shadow {
          border: 1px solid lightgray;
          padding: 20px;
        }
      </style>
      <div class="box-shadow">
        <h1>Enable shadowRoot</h1>
      <div>
    `;
  }
}

// Register custom element
window.customElements.define('x-shadow', Shadow);
