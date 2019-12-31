import './item.js';

/**
 * AdaptedCallback testing class
 */
export default class AdaptedCallback extends HTMLElement {
  /**
   * Attach
   */
  connectedCallback() {
    this.innerHTML = `
      <style>
        .container {
          width: 500px;
          margin: 0 auto;
        }
        iframe {
          width:100%;
          height: 200px;
        }
        .button {
          display: block;
          width: 100%;
        }
      </style>
      <x-adapted-item></x-adapted-item>
      <div class="container">
        <div>Outer html</div>
        <button class="button">move</button>
        <iframe src="./adaptedCallback/inner.html">
      </div>
    `;
    this.clickLisnner = this.handleClick.bind(this);
    const buttonElm = this.querySelector('.button');
    buttonElm.addEventListener('click', this.clickLisnner);
  }

  /**
    * Detach
    */
  disconnectedCallback() {
    const buttonElm = this.querySelector('.button');
    buttonElm.removeEventListener('click', this.clickLisnner);
  }

  /**
   * Click button
   */
  handleClick() {
    const item = this.querySelector('x-adapted-item');
    const iframElm = this.querySelector('iframe');
    iframElm.contentDocument.body.appendChild(item);
  }
}

// Register custom element
window.customElements.define('x-adapted-callback', AdaptedCallback);
