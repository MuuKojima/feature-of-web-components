/**
 * Labelクラス
 */
export default class Label extends HTMLElement {
  /**
   * アトリビュートの変更を購読するホワイトリストの作成
   */
  static get observedAttributes() {
    return ['label'];
  }

  /**
   * アトリビュートの変更を購読
   * @param {string} name 
   * @param {string} oldValue 
   * @param {string} newValue 
   */
  attributeChangedCallback(name, oldValue, newValue) {
    switch(name){
      case 'label':
        this._label = newValue;
        this._render();
        break;
      default:
        break;
    }
  }

  /**
   * コンストラクタ
   */
  constructor(label) {
    super();
    this._label = label || '';
  }

  /**
   * Attach
   */
  connectedCallback() {
    // new オペレーターで初期化された場合はコンスタントラクタ以降でアトリビュートを操作しないとエラーになる
    this.label = this._label;
  }

  /**
   * 描画
   * @private
   */
  _render() {
    this.innerHTML = `<h1>${this._label}</h1>`;
  }

  set label(val) {
    if (val) {
      this.setAttribute('label', val);
    } else {
      this.removeAttribute('label');
    }
  }
}

// Register custom element
window.customElements.define('x-label', Label);
