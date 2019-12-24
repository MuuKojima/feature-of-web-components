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
  <h1>Close</h1>
`;

/**
 * Closeの実装クラス
 */
class Close extends HTMLElement {
  /**
   * コンストラクタ
   */
  constructor() {
    super();
    const root = this.attachShadow({mode: 'closed'});
    root.appendChild(template.content.cloneNode(true));
  }
}

// カスタムエレメントの登録
window.customElements.define('x-close', Close);
