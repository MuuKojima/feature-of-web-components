/**
 * Openの実装クラス
 */
class Open extends HTMLElement {
  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
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
  }
}

// Register custom element
window.customElements.define('x-open', Open);
