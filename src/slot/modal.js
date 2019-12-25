// テンプレートタグの作成
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
 * Slot実装クラス
 */
export default class XSlot extends HTMLElement {
  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._closeElm =  this.shadowRoot.querySelector(".close");
    this._onCloseLisner = () => this.handleCloseClick();
  }

  /**
   * アタッチ
   */
  connectedCallback() {
    this._closeElm.addEventListener('click', this._onCloseLisner);
  }

  /**
   * デタッチ
   */
  disconnectedCallback() {
    this._closeElm.removeEventListener('click', this._onCloseLisner);
  }

  /**
   * クローズをクリック
   */
  handleCloseClick() {
    const dialogElm = this.shadowRoot.querySelector("dialog");
    dialogElm.close();
  }
}

// カスタムエレメントの登録
window.customElements.define('x-modal', XSlot);
