/**
 * Lifecycleが実装されたクラス
 */
export default class LifecycleItem extends HTMLElement {
  /**
   * アトリビュートの変更を購読するホワイトリストの作成
   */
  static get observedAttributes() {
    alert('①: observedAttributes');
    return ['label'];
  }

  /**
   * アトリビュートの変更を購読
   * @param {string} name 
   * @param {string} oldValue 
   * @param {string} newValue 
   */
  attributeChangedCallback(name, oldValue, newValue) {
    alert('③: attributeChangedCallback');
    this._label = newValue;
  }

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    alert('②: constructor');
  }

  /**
   * 描画
   */
  _render() {
    this.innerHTML = `
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
      <h1 class="label"></h1>
    `;
    this.querySelector('.label').textContent = this._label;
  }

  /**
   * アタッチ
   */
  connectedCallback() {
    alert('④: connectedCallback');
    this._render();
  }

  /**
    * デタッチ
    */
  disconnectedCallback() {
    alert('⑤: disconnectedCallback');
  }

  /**
   * オーナードキュメントが移った時
   */
  adoptedCallback() {
    // こちらは呼び出すのが難しいので、ここだけ切り出して解説
  }
}
