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
  <h1>Open</h1>
`;

/**
 * Openの実装クラス
 */
class Open extends HTMLElement {
  /**
   * コンストラクタ
   */
  constructor() {
    super();
    const root = this.attachShadow({mode: 'open'});
    root.appendChild(template.content.cloneNode(true));
  }
}

// カスタムエレメントの登録
window.customElements.define('x-open', Open);
