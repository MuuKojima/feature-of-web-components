/**
 * ShadowRootを無効にしたクラス(通常のカスタムエレメント)
 */
class NOShadow extends HTMLElement {
  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.innerHTML = `
      <style>
        h1 {
          font-size: 30px;
          color: #3F51B5;
        }
        .box-noshadow {
          border: 1px solid lightgray;
          padding: 20px;
        }
      </style>
      <div class="box-noshadow">
        <h1>ShadowDOMでないカスタムエレメント</h1>
      <div> 
    `;
  }
}

// カスタムエレメントの登録
window.customElements.define('x-noshadow', NOShadow);
