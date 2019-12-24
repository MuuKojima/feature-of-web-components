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
  <h1>Adapted Callback</h1>
`;

/**
 *  AdaptedCallbackの実装クラス
 */
class AdaptedItem extends HTMLElement {
  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /**
   * オーナードキュメントが移った時
   * つまり、親のhtmlが別のhtmlに変わった時に発火
   */
  adoptedCallback() {
    alert('adoptedCallback!!');
  }
}

// カスタムエレメントの登録
window.customElements.define('x-adapted-item', AdaptedItem);
