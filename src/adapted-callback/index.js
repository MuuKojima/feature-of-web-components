import './adaptedCallback.js';

// テンプレートタグの作成
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
    }
    .container {
      width: 500px;
      margin: 0 auto;
    }
    iframe {
      width:100%;
      height: 200px;
    }
    button {
      display: block;
      width: 100%;
    }
  </style>
  <x-adapted-item></x-adapted-item>
  <div class="container">
    <div>外側のhtml</div>
    <button class="button">移動</button>
    <iframe src="./adapted-callback/inner.html">
  </div>
`;

/**
 * AdaptedCallbackを試すクラス
 */
class AdaptedCallback extends HTMLElement {
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
    const buttonElm = this.shadowRoot.querySelector('.button');
    buttonElm.addEventListener('click', this.clickLisnner);
  }

  /**
    * デタッチ
    */
  disconnectedCallback() {
    const buttonElm = this.shadowRoot.querySelector('.button');
    buttonElm.removeEventListener('click', this.clickLisnner);
  }

  /**
   * ボタンのクリック
   */
  handleClick() {
    const item = this.shadowRoot.querySelector('x-adapted-item');
    const iframElm = this.shadowRoot.querySelector('iframe');
    iframElm.contentDocument.body.appendChild(item);
  }
}

// カスタムエレメントの登録
window.customElements.define('x-adapted-callback', AdaptedCallback);
