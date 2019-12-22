// テンプレートタグの作成
const template = document.createElement('template');
template.innerHTML = `
  <style>
    h1 {
      font-size: 30px;
      color: blue;
    }
  </style>
  <h1>ShadowDOMが無効になる</h1>
`;

/**
 * ShadowRootを無効にしたクラス
 */
class NOShadow extends HTMLElement {
  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.appendChild(template.content.cloneNode(true));
  }
}

// カスタムエレメントの登録
window.customElements.define('x-noshadow', NOShadow);
