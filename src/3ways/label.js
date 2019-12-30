/**
 * Labelクラス
 */
export default class Label extends HTMLElement {
  /**
   * Create a whitelist to subscribe to attribute changes
   */
  static get observedAttributes() {
    return ['label'];
  }

  /**
   * Subscribe to attribute changes
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
   * Constructor
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
   * Render
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
