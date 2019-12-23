// テンプレートタグの作成
const template = document.createElement('template');
template.innerHTML = `
  <style>
    h1 {
      font-size: 30px;
      color: #3F51B5;
    }
    .box {
      border: 1px solid lightgray;
      padding: 20px;
    }
  </style>
  <div class="box">
    <h1>ShadowDOMでないカスタムエレメント</h1>
  <div> 
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
