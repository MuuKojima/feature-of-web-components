import './anchor.js';

/**
 * 継承をテストするクラス
 */
export default class XExtends extends HTMLElement {
  /**
   * アタッチ
   */
  connectedCallback() {
    this.innerHTML = `
      <style>
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
  }
}

// カスタムエレメントの登録
window.customElements.define('x-extends', XExtends);
