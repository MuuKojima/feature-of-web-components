// テンプレートタグの作成
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
    }
    h1 {
      font-size: 30px;
      color: #d51b5a;
    }
    .box {
      border: 1px solid lightgray;
      padding: 20px;
    }
  </style>
  <div class="box">
    <h1>ShadowDOMを有効</h1>
  <div>
`;

/**
 * ShadowRootを有効にしたクラス
 */
class Shadow extends HTMLElement {
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
window.customElements.define('x-shadow', Shadow);
