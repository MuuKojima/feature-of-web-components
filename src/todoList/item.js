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

class Todo extends HTMLElement {
  static get observedAttributes() {
    return ['id', 'label', 'checked'];
  }

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
    !this._checked && this._labelElm.classList.remove('label--selected');
  }

  _dispatchToggle() {
    this.dispatchEvent(new CustomEvent('onToggle',
      {
        detail: { id: this._id },
        bubbles: true,
        composed: true
      }
    ));
  }

  _dispatchRemove() {
    this.dispatchEvent(new CustomEvent('onRemove',
      {
        detail: { id: this._id },
        bubbles: true,
        composed: true
      }
    ));
  }

  get id() {
    return this.getAttribute('id');
  }

  set id(val) {
    if (val) {
      this.setAttribute('id', val);
    } else {
      this.removeAttribute('id');
    }
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
    return this.getAttribute('checked') === '';
  }

  set checked(val) {
    debugger
    if (val) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
  }
}

window.customElements.define('x-todo-item', Todo);
