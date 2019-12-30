import './close.js';
import './open.js';

/**
 * Open and Close testing class
 */
export default class OpenClose extends HTMLElement {
  /**
   * Attach
   */
  connectedCallback() {
    this.innerHTML = `
      <style>
        .button {
          width: 100px;
          height: 20px;
          display: block;
          margin: 0 auto;
        }
      </style>
      <h1>Open or Close of ShadowRoot</h1>
      <button class="button">click</button>
      <x-open></x-open>
      <x-close></x-close>
    `;
    this.clickLisnner = this.handleClick.bind(this);
    const buttonElm = this.querySelector('button');
    buttonElm.addEventListener('click', this.clickLisnner);
  }

  /**
    * Detach
    */
  disconnectedCallback() {
    const buttonElm = this.querySelector('button');
    buttonElm.removeEventListener('click', this.clickLisnner);
  }

  /**
   * Ckick button
   */
  handleClick() {
    const openElm = this.querySelector('x-open');
    const closeElm = this.querySelector('x-close');
    if (openElm.shadowRoot) {
      // Come here
      alert('Get Open ShadowDOM', openElm.shadowRoot);
    }
    if (closeElm.shadowRoot) {
      // Don't come here
      alert('Get Closed ShadowDOM', openElm.shadowRoot);
    }
    console.log(openElm.shadowRoot);
    // shadowRoot returns null
    console.log(closeElm.shadowRoot);
  }
}

// Register custom element
window.customElements.define('x-open-close', OpenClose);
