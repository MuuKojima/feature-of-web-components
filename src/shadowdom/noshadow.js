/**
 * ShadowRoot disabled class
 */
class NOShadow extends HTMLElement {
  /**
   * Attach
   */
  connectedCallback() {
    this.innerHTML = `
      <style>
        h1 {
          font-size: 30px;
          color: #3F51B5;
        }
        .box-noshadow {
          border: 1px solid lightgray;
          padding: 20px;
        }
      </style>
      <div class="box-noshadow">
        <h1>Disable shadowRoot</h1>
      <div> 
    `;
  }
}

// Register custom element
window.customElements.define('x-noshadow', NOShadow);
