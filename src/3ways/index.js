import './label.js'

/**
 * カスタムエレメントの生成パターンのテスト
 */
export default class X3ways extends HTMLElement {
  /**
   * アタッチ
   */
  connectedCallback() {
    this._render();
  }

  /**
   * 描画
   * @private
   */
  _render() {
    this.innerHTML = `
      <h1>3つの生成の仕方</h1>
      <!-- ① 宣言的にタグを書くパターン -->
      <x-label label="① hello"></x-label>
    `;

    // ② new オペレーターで生成するパターン
    const Label = window.customElements.get('x-label');
    const labelElmA = new Label('② hello');
    this.appendChild(labelElmA);
    // ③ DOM APIで生成するパターン
    const labelElmB = document.createElement('x-label');
    labelElmB.label = '③ hello';
    this.appendChild(labelElmB);
  }
}

// カスタムエレメントの登録
window.customElements.define('x-3ways', X3ways);
