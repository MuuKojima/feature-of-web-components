import './item.js';

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
    this._clickSubmitListener =  this._add.bind(this);
  }

  connectedCallback() {
    this._submitElm.addEventListener('click', this._clickSubmitListener);
    this._render();
  }

  disconnectedCallback() {
    this._submitElm.removeEventListener('click', this._clickSubmitListener)
    for (let item of this._containerElm.children) {
      item.clearListner();
    }
  }

  _render() {
    this._containerElm.innerHTML = '';
    this._todoList.forEach((item, index) => {
      const todoElm = document.createElement('x-todo-item');
      todoElm.label = item.label;
      todoElm.checked = item.checked;
      todoElm.index = index;
      const onToggleListener = this._toggle.bind(this);
      const onRemoveListener = this._remove.bind(this);
      todoElm.addEventListener('onToggle', onToggleListener);
      todoElm.addEventListener('onRemove', onRemoveListener);
      todoElm.clearListner = () => {
        todoElm.removeEventListener('onToggle', onToggleListener);
        todoElm.removeEventListener('onRemove', onRemoveListener);
      };
      this._containerElm.appendChild(todoElm);
    });
  }

  _add(e) {
    e.preventDefault();
    if (!this._inputElm.value) {
      return;
    }
    const todo = { label: this._inputElm.value, checked: false};
    this._todoList.unshift(todo);
    this._inputElm.value = '';
    this._render();
  }

  _toggle(e) {
    const todo = this._todoList.find((item, index) => {
      return index === e.detail.index;
    });
    todo.checked = !todo.checked;
    this._render();
  }

  _remove(e) {
    const index = e.detail.index;
    this._todoList.splice(index, 1);
    this._render();
  }
}

window.customElements.define('x-todo-list', TodoList);
