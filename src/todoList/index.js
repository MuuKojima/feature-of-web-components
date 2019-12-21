import './item.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
    }
    h1 {
      font-weight: bold;
      font-size: 50px;
    }
    form {
      text-align: center;
      margin-bottom: 20px;
    }
    .container {
      text-align: center;
    }
  </style>
  <h1>Todo List</h1>
  <form>
    <input type="text"></input>
    <button class="submit" type="button">submit</button>
  </form>
  <div class="container"></div>
`;

class TodoList extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({mode: 'open'});
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this._todoList = [];
    this._containerElm = this._shadowRoot.querySelector('.container');
    this._submitElm = this._shadowRoot.querySelector('.submit');
    this._clickListener =  this._add.bind(this);
    this._inputElm = this._shadowRoot.querySelector('input');
  }

  connectedCallback() {
    this._submitElm.addEventListener('click', this._clickListener);
    this._render();
  }

  disconnectedCallback() {
    this._submitElm.removeEventListener('click', this._clickListener)
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

  _add() {
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
