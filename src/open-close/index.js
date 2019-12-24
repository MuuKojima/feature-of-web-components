import './close.js';
import './open.js';

// テンプレートタグの作成
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
    }
    h1 {
      font-weigh: bold;
      font-size: 50px;
      text-align: center;
    }
  </style>
  <h1>ShadowRootのOpenとClose</h1>
  <button>DOMを取得</button>
  <x-open></x-open>
  <x-close></x-close>
`;

/**
 * OpenCloseのテストクラス
 */
class OpenClose extends HTMLElement {
  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /**
   * アタッチ
   */
  connectedCallback() {
    this.clickLisnner = this.handleClick.bind(this);
    const buttonElm = this.shadowRoot.querySelector('button');
    buttonElm.addEventListener('click', this.clickLisnner);
  }

  /**
    * デタッチ
    */
  disconnectedCallback() {
    const buttonElm = this.shadowRoot.querySelector('button');
    buttonElm.removeEventListener('click', this.clickLisnner);
  }

  /**
   * ボタンのクリック
   */
  handleClick() {
    const openElm = this.shadowRoot.querySelector('x-open');
    const closeElm = this.shadowRoot.querySelector('x-close');
    if (openElm.shadowRoot) {
      // ここに来る
      alert('オープンのShadowDOMを取得', openElm.shadowRoot);
    }
    if (closeElm.shadowRoot) {
      // ここには来ない
      alert('クローズのShadowDOMを取得', openElm.shadowRoot);
    }
    console.log(openElm.shadowRoot);
    // shadowRootはnullを返す
    console.log(closeElm.shadowRoot);
  }
}

// カスタムエレメントの登録
window.customElements.define('x-open-close', OpenClose);
