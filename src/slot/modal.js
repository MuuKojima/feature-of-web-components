// Creating template tag
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
    }
  </style>
  <dialog open>
    <button class="close">✗</button>
    <slot name="content"></slot>
  </dialog>
`;

/**
 * Slot implementation class
 */
export default class XSlot extends HTMLElement {
  /**
   * Constructor
   */
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._closeElm =  this.shadowRoot.querySelector(".close");
    this._onCloseLisner = () => this.handleCloseClick();
  }

  /**
   * Attach
   */
  connectedCallback() {
    this._closeElm.addEventListener('click', this._onCloseLisner);
  }

  /**
   * Detach
   */
  disconnectedCallback() {
    this._closeElm.removeEventListener('click', this._onCloseLisner);
  }

  /**
   * Click close
   */
  handleCloseClick() {
    const dialogElm = this.shadowRoot.querySelector("dialog");
    dialogElm.close();
  }
}

// Register custom element
window.customElements.define('x-modal', XSlot);
