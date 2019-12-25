/**
 * Hello Woldクラス
 */
export default class HelloWorld extends HTMLElement {
  /**
   * コンストラクタ
   */
  constructor() {
    super();
  }

  /**
   * アタッチ
   */
  connectedCallback () {
    this.innerHTML = `
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
      <h1>Hello World</h1>
  `;
  }
}

// カスタムエレメントの登録
window.customElements.define('x-helloworld', HelloWorld);
