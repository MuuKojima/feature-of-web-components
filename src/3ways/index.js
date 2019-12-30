import './label.js'

/**
 * カスタムエレメントの生成パターンのテスト
 */
export default class X3ways extends HTMLElement {
  /**
   * Attach
   */
  connectedCallback() {
    this._render();
  }

  /**
   * Render
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

// Register custom element
window.customElements.define('x-3ways', X3ways);
