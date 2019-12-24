import './anchor.js';

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
    a {
      display: block;
      text-align: center;
    }
  </style>
  <h1>既存のUIパーツを継承する</h1>
  <!-- 
    is 属性を使いカスタムエレメントを適用する
    もしくは、new オペレーター, DOM APIでも生成する事が出来る
  -->
  <a href="https://www.google.com/" is="x-confirm-anchor">https://www.google.com/</a>
`;

/**
 * 継承をテストするクラス
 */
class XExtends extends HTMLElement {
  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

// カスタムエレメントの登録
window.customElements.define('x-extends', XExtends);
