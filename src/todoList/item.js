// テンプレートタグの作成
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
    }
    .container {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid lightgray;
      padding: 10px; 0;
    }
    .label {
      flex-grow: 1;
      margin: 0 10px;
    }
    :host .label {
      text-decoration: none;
    }
    :host([checked]) .label {
      text-decoration: line-through;
      opacity: 0.5;
    }
  </style>
  <div class="container">
    <input class="checkbox" type="checkbox">
    <label class="label"></label>
    <button class="remove" type="button">削除</button>
  </div>
`;

/**
 * TodoListのアイテムクラス
 */
class Todo extends HTMLElement {
  /**
   * アトリビュートの変更を購読するホワイトリストの作成
   */
  static get observedAttributes() {
    return ['id', 'label', 'checked'];
  }

  /**
   * アトリビュートの変更を購読
   * @param {string} name 
   * @param {string} oldValue 
   * @param {string} newValue 
   */
  attributeChangedCallback(name, oldValue, newValue) {
    switch(name){
      case 'id':
          this._id = newValue;
          break;
      case 'label':
        this._label = newValue;
        break;
      case 'checked':
        this._checked = this.hasAttribute('checked');
        break;
    }
    this._render();
  }

  /**
   * コンスタントラクタ
   */
  constructor() {
    super();
    this.attachShadow({ 'mode': 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._id = '';
    this._label =  '';
    this._checked =  false;
    this._checkBoxElm = this.shadowRoot.querySelector('.checkbox');
    this._removeElm = this.shadowRoot.querySelector('.remove');
    this._labelElm = this.shadowRoot.querySelector('.label');
    this._toggleListener = this._dispatchToggle.bind(this);
    this._removeListener = this._dispatchRemove.bind(this);
  }

  /**
   * アタッチ
   */
  connectedCallback() {
    this._checkBoxElm.addEventListener('click', this._toggleListener);
    this._removeElm.addEventListener('click', this._removeListener);
    this._render();
  }

  /**
   * デタッチ
   */
  disconnectedCallback() {
    this._checkBoxElm.removeEventListener('click', this._toggleListener)
    this._removeElm.removeEventListener('click', this._removeListener);
  }

  /**
   * 描画
   * @private
   */
  _render() {
    this._labelElm.textContent = this._label;
    this._checkBoxElm.checked = this._checked;
    this._checked ? this._labelElm.classList.add('label--selected') : this._labelElm.classList.remove('label--selected');
  }

  /**
   * アイテムのチェックがトグルされた事を通知
   * @private
   */
  _dispatchToggle() {
    this.dispatchEvent(new CustomEvent('onToggle',
      {
        detail: { id: this._id },
        bubbles: true,
        composed: true
      }
    ));
  }

  /**
   * アイテムが削除された事を通知
   * @private
   */
  _dispatchRemove() {
    this.dispatchEvent(new CustomEvent('onRemove',
      {
        detail: { id: this._id },
        bubbles: true,
        composed: true
      }
    ));
  }

  /**
   * @return {string} id
   */
  get id() {
    return this.getAttribute('id');
  }

  /**
   * @param {string} val
   */
  set id(val) {
    if (val) {
      this.setAttribute('id', val);
    } else {
      this.removeAttribute('id');
    }
  }

  /**
   * @param {string} val
   */
  set label(val) {
    if (val) {
      this.setAttribute('label', val);
    } else {
      this.removeAttribute('label');
    }
  }

  /**
   * @return {boolean}
   */
  get checked() {
    return this.getAttribute('checked') === '';
  }

  /**
   * @param {boolean} val
   */
  set checked(val) {
    if (val) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
  }
}

// カスタムエレメントの登録
window.customElements.define('x-todo-item', Todo);
