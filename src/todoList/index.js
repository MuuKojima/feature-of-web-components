import './item.js';

// テンプレートタグの作成
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
    }
    h1 {
      text-align: center;
      font-weight: bold;
      font-size: 50px;
    }
    .container {
      padding: 20px 0;
    }
    form {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid lightgray;
      padding: 10px; 0;
      background-color: whitesmoke;
    }
    input {
      flex-grow: 1;
      margin: 0 10px;
      height: 20px;
    }
    x-todo-item + x-todo-item {
      margin-top: 20px;
    }
  </style>
  <h1>Todo List</h1>
  <form>
    <input type="text"></input>
    <button type="submit">追加</button>
  </form>
  <div class="container"></div>
`;

/**
 * TodoListのルートクラス
 */
class TodoList extends HTMLElement {
  /**
   * コンスタントラクタ
   */
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._containerElm = this.shadowRoot.querySelector('.container');
    this._submitElm = this.shadowRoot.querySelector('form');
    this._inputElm = this.shadowRoot.querySelector('input');
    this._clickSubmitListener =  this._tryAdd.bind(this);
  }

  /**
   * アタッチ
   */
  connectedCallback() {
    this._submitElm.addEventListener('submit', this._clickSubmitListener);
    this._render();
  }

  /**
   * デタッチ
   */
  disconnectedCallback() {
    this._submitElm.removeEventListener('submit', this._clickSubmitListener)
    const todoElms = this.shadowRoot.querySelectorAll('x-todo-item');
    [...todoElms].forEach(item => item.clearListeners())
  }

  /**
   * 描画
   * @private
   */
  _render() {
    // テストデータの挿入
    this._add('TaskC', false);
    this._add('TaskB', true);
    this._add('TaskA', false);
  }

  /**
   * アイテムをIDから取得する
   * @private
   * @param {string} id
   * @return {Object | undefined}
   */
  _findTodoItemById(id) {
    const todoElms = this.shadowRoot.querySelectorAll('x-todo-item');
    let target;
    [...todoElms].forEach(item => {
      if (item.id !== id) {
        return;
      }
      target = item;
    });
    return target;
  }

  /**
   * ランダムなIDを生成
   * (UUIDを作ろうとすると、コードが長くなるので、ここでは割愛)
   * @private
   * @return {string}
   */
  _createRandomId() {
    return Math.random().toString(32).substring(2);
  }

  /**
   * アイテムの追加を試みる
   * @private
   * @param {Event} e 
   */
  _tryAdd(e) {
    e.preventDefault();
    const val = this._inputElm.value;
    if (!val) {
      return;
    }
    this._add(val, false);
  }

  /**
   * アイテムを追加する
   * @private
   * @param {label} label
   * @param {boolean} checked
   */
  _add(label, checked) {
    const todoElm = document.createElement('x-todo-item');
    todoElm.id = this._createRandomId();
    todoElm.label = label;
    todoElm.checked = checked;
    const onToggleListener = this._toggle.bind(this);
    const onRemoveListener = this._remove.bind(this);
    todoElm.addEventListener('onToggle', onToggleListener);
    todoElm.addEventListener('onRemove', onRemoveListener);
    todoElm.clearListeners = () => {
      todoElm.removeEventListener('onToggle', onToggleListener);
      todoElm.removeEventListener('onRemove', onRemoveListener);
    };
    // 先頭に追加
    this._containerElm.insertBefore(todoElm, this._containerElm.firstChild);
    this._inputElm.value = '';
  }

  /**
   * アイテムのチェックをトグルする
   * @private
   * @param {Event} e 
   */
  _toggle(e) {
    const target = this._findTodoItemById(e.detail.id);
    if (!target) {
      return;
    }
    target.checked = !target.checked;
  }

  /**
   * アイテムを削除する
   * @private
   * @param {Event} e 
   */
  _remove(e) {
    const target = this._findTodoItemById(e.detail.id);
    if (!target) {
      return;
    }
    this._containerElm.removeChild(target);
  }
}

// カスタムエレメントの登録
window.customElements.define('x-todo-list', TodoList);
