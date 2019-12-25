import './adaptedCallback.js';

/**
 * AdaptedCallbackを試すクラス
 */
export default class AdaptedCallback extends HTMLElement {
  /**
   * コンストラクタ
   */
  constructor() {
    super();
  }

  /**
   * アタッチ
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
        <div>外側のhtml</div>
        <button class="button">移動</button>
        <iframe src="./adapted-callback/inner.html">
      </div>
    `;
    this.clickLisnner = this.handleClick.bind(this);
    const buttonElm = this.querySelector('.button');
    buttonElm.addEventListener('click', this.clickLisnner);
  }

  /**
    * デタッチ
    */
  disconnectedCallback() {
    const buttonElm = this.querySelector('.button');
    buttonElm.removeEventListener('click', this.clickLisnner);
  }

  /**
   * ボタンのクリック
   */
  handleClick() {
    const item = this.querySelector('x-adapted-item');
    const iframElm = this.querySelector('iframe');
    iframElm.contentDocument.body.appendChild(item);
  }
}

// カスタムエレメントの登録
window.customElements.define('x-adapted-callback', AdaptedCallback);
