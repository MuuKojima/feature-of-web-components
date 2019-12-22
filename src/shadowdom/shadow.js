// テンプレートタグの作成
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
    }
    h1 {
      font-size: 30px;
      color: red;
    }
  </style>
  <h1>ShadowDOMが有効になる</h1>
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
