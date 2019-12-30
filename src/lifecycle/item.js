/**
 * Lifecycle implementation class
 */
export default class LifecycleItem extends HTMLElement {
  /**
   * Create a whitelist to subscribe to attribute changes
   */
  static get observedAttributes() {
    alert('①: observedAttributes');
    return ['label'];
  }

  /**
   * Subscribe to attribute changes
   * @param {string} name 
   * @param {string} oldValue 
   * @param {string} newValue 
   */
  attributeChangedCallback(name, oldValue, newValue) {
    alert('③: attributeChangedCallback');
    switch(name){
      case 'label':
        this._label = newValue;
        break;
      default:
        break;
    }
  }

  /**
   * Constructor
   */
  constructor() {
    super();
    alert('②: constructor');
  }

  /**
   * Render
   */
  _render() {
    this.innerHTML = '<h1 class="label"></h1>';
    this.querySelector('.label').textContent = this._label;
  }

  /**
   * Attach
   */
  connectedCallback() {
    alert('④: connectedCallback');
    this._render();
  }

  /**
    * Detach
    */
  disconnectedCallback() {
    alert('⑤: disconnectedCallback');
  }

  /**
   * When the owner document moves
   */
  adoptedCallback() {
    // This is difficult to call, so just cut out and explain
  }
}
