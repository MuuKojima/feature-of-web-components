// テンプレートタグの作成
const template = document.createElement('template');
template.innerHTML = `
  <h1>Template</h1>
`;

/**
 * テンプレートクラス
 */
export default class Template extends HTMLElement {
  /**
   * アタッチ
   */
  connectedCallback() {
    // cloneNodeでテンプレートをアクティベート
    this.appendChild(template.content.cloneNode(true));
  }
}

// カスタムエレメントの登録
window.customElements.define('x-template', Template);
