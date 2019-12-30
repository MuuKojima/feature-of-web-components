// Create template tag
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
 * TodoItem class
 */
export default class Todo extends HTMLElement {
  /**
   * Create a whitelist to subscribe to attribute changes
   */
  static get observedAttributes() {
    return ['label', 'checked'];
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
        break;
      case 'checked':
        this._checked = this.hasAttribute('checked');
        break;
      default:
        break;
    }
    this._render();
  }

  /**
   * Constructor
   */
  constructor() {
    super();
    this.attachShadow({ 'mode': 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._id = this._createRandomId();
    this._label =  '';
    this._checked =  false;
    this._checkBoxElm = this.shadowRoot.querySelector('.checkbox');
    this._removeElm = this.shadowRoot.querySelector('.remove');
    this._labelElm = this.shadowRoot.querySelector('.label');
    this._toggleListener = this._dispatchToggle.bind(this);
    this._removeListener = this._dispatchRemove.bind(this);
  }

  /**
   * Attach
   */
  connectedCallback() {
    this._checkBoxElm.addEventListener('click', this._toggleListener);
    this._removeElm.addEventListener('click', this._removeListener);
    this._render();
  }

  /**
   * Detach
   */
  disconnectedCallback() {
    this._checkBoxElm.removeEventListener('click', this._toggleListener)
    this._removeElm.removeEventListener('click', this._removeListener);
  }

  /**
   * Render
   * @private
   */
  _render() {
    this._labelElm.textContent = this._label;
    this._checkBoxElm.checked = this._checked;
    this._checked ? this._labelElm.classList.add('label--selected') : this._labelElm.classList.remove('label--selected');
  }

  /**
   * Create Random ID
   * If you try to create a UUID, the code will be long, so I will omit it here
   * @private
   * @returns {string}
   */
  _createRandomId() {
    return Math.random().toString(32).substring(2);
  }

  /**
   * Dispatch that item check has been toggled
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
   * Dispatch that item has been removed
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
   * Get id
   * @returns {string} id
   */
  get id() {
    return this._id;
  }

  /**
   * Set label
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
   * チェックされているかどうか
   * @returns {boolean}
   */
  get checked() {
    return this.getAttribute('checked') === '';
  }

  /**
   * Checked or not
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

// Register custom element
window.customElements.define('x-todo-item', Todo);
