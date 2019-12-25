/**
 *  AdaptedCallbackの実装クラス
 */
export default class AdaptedItem extends HTMLElement {
  /**
   * コンストラクタ
   */
  constructor() {
    super();
  }

  /**
   * アタッチ
   */
  connectedCallback() {
    this.innerHTML = '<h1>Adapted Callback</h1>';
  }

  /**
   * オーナードキュメントが移った時
   * つまり、親のhtmlが別のhtmlに変わった時に発火
   */
  adoptedCallback() {
    alert('adoptedCallback');
  }
}

// カスタムエレメントの登録
window.customElements.define('x-adapted-item', AdaptedItem);
