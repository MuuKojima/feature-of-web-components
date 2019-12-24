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
  <h1></h1>
`;

/**
 * Labelクラス
 */
class Label extends HTMLElement {
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
        break;
      default:
        break;
    }
    this._render();
  }  

  /**
   * コンストラクタ
   */
  constructor(label) {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._label = Boolean(label) ? label : '';
  }

  /**
   * アタッチ
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
    const titleElm = this.shadowRoot.querySelector('h1');
    titleElm.textContent = this._label;
  }

  set label(val) {
    if (val) {
      this.setAttribute('label', val);
    } else {
      this.removeAttribute('label');
    }
  }
}

// カスタムエレメントの登録
window.customElements.define('x-label', Label);
