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
    this.innerHTML = '<h1>Hello World</h1>';
  }
}

// カスタムエレメントの登録
window.customElements.define('x-helloworld', HelloWorld);
