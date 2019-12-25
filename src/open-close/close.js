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
    root.innerHTML = `
      <style>
        h1 {
          font-weigh: bold;
          font-size: 50px;
          text-align: center;
        }
      </style>
      <h1>Close</h1>
    `;
  }
}

// カスタムエレメントの登録
window.customElements.define('x-close', Close);
