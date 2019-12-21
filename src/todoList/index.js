import './item.js';

const TAG_NAME = 'x-todo-list';
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

class TodoList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._todoList = [];
    this._containerElm = this.shadowRoot.querySelector('.container');
    this._submitElm = this.shadowRoot.querySelector('form');
    this._inputElm = this.shadowRoot.querySelector('input');
    this._clickSubmitListener =  this._tryAdd.bind(this);
  }

  connectedCallback() {
    this._submitElm.addEventListener('submit', this._clickSubmitListener);
    this._render();
  }

  disconnectedCallback() {
    this._submitElm.removeEventListener('submit', this._clickSubmitListener)
    for (let item of this._containerElm.children) {
      item.clearListner();
    }
  }

  _render() {
    this._containerElm.innerHTML = '';
    this._todoList.forEach(item => this._add(item));
  }

  _createRandomId() {
    return Math.random().toString(32).substring(2);
  }

  _tryAdd(e) {
    e.preventDefault();
    if (!this._inputElm.value) {
      return;
    }
    const todo = { id: this._createRandomId(), label: this._inputElm.value, checked: false};
    this._add(todo);
  }

  _add(item) {
    const todoElm = document.createElement(TAG_NAME);
    todoElm.id = item.id;
    todoElm.label = item.label;
    todoElm.checked = item.checked;
    const onToggleListener = this._toggle.bind(this);
    const onRemoveListener = this._remove.bind(this);
    todoElm.addEventListener('onToggle', onToggleListener);
    todoElm.addEventListener('onRemove', onRemoveListener);
    todoElm.clearListner = () => {
      todoElm.removeEventListener('onToggle', onToggleListener);
      todoElm.removeEventListener('onRemove', onRemoveListener);
    };
    this._containerElm.appendChild(todoElm);
    this._inputElm.value = '';
  }

  _toggle(e) {
    const todoElms = this.shadowRoot.querySelectorAll(TAG_NAME);
    [...todoElms].forEach(item => {
      if (item.id !== e.detail.id) {
        return;
      }
      item.checked = !item.checked;
    });
  }

  _remove(e) {
    const id = e.detail.id;
    this._todoList.splice(id, 1);
    this._render();
  }
}

window.customElements.define(TAG_NAME, TodoList);
