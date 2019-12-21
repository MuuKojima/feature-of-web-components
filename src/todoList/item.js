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
    .label--selected {
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

class Todo extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'checked', 'index'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name){
      case 'label':
        this._label = newValue;
        break;
      case 'checked':
        this._checked = this.hasAttribute('checked');
        break;
      case 'index':
        this._index = Number(newValue);
        break;
    }
    this._render();
  }

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ 'mode': 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this._label =  '';
    this._index = 0;
    this._checked =  false;
    this._checkBoxElm = this._shadowRoot.querySelector('.checkbox');
    this._toggleListener = this._dispatchToggle.bind(this);
    this._removeElm = this._shadowRoot.querySelector('.remove');
    this._removeListener = this._dispatchRemove.bind(this);
    this._labelElm = this._shadowRoot.querySelector('.label');
  }

  connectedCallback() {
    this._checkBoxElm.addEventListener('click', this._toggleListener);
    this._removeElm.addEventListener('click', this._removeListener);
    this._render();
  }

  disconnectedCallback() {
    this._checkBoxElm.removeEventListener('click', this._toggleListener)
    this._removeElm.removeEventListener('click', this._removeListener);
  }

  _render() {
    this._labelElm.textContent = this._label;
    this._checkBoxElm.checked = this._checked;
    this._checked && this._labelElm.classList.add('label--selected');
  }

  _dispatchToggle() {
    this.dispatchEvent(new CustomEvent('onToggle',
      {
        detail: { index: this._index },
        bubbles: true,
        composed: true
      }
    ));
  }

  _dispatchRemove() {
    this.dispatchEvent(new CustomEvent('onRemove',
      {
        detail: { index: this._index },
        bubbles: true,
        composed: true
      }
    ));
  }

  get label() {
    return this.getAttribute('label');
  }

  set label(val) {
    if (val) {
      this.setAttribute('label', val);
    } else {
      this.removeAttribute('label');
    }
  }

  get checked() {
    return this.getAttribute('checked');
  }

  set checked(val) {
    if (val) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
  }

  get index() {
    return this.getAttribute('index');
  }

  set index(val) {
    if (val) {
      this.setAttribute('index', val);
    } else {
      this.removeAttribute('index');
    }
  }
}

window.customElements.define('x-todo-item', Todo);
