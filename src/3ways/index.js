import './label.js'

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
  <h1>3つの生成の仕方</h1>
  <!-- ① 宣言的にタグを書くパターン -->
  <x-label label="① hello"></x-label>
`;

/**
 * カスタムエレメントの生成パターンのテスト
 */
class X3ways extends HTMLElement {
  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

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
    // ② new オペレーターで生成するパターン
    const Label = window.customElements.get('x-label');
    const labelElmA = new Label('② hello');
    this.shadowRoot.appendChild(labelElmA);
    // ③ DOM APIで生成するパターン
    const labelElmB = document.createElement('x-label');
    labelElmB.label = '③ hello';
    this.shadowRoot.appendChild(labelElmB);
  }
}

// カスタムエレメントの登録
window.customElements.define('x-3ways', X3ways);
