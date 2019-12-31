// Create template tag
const template = document.createElement('template');
template.innerHTML = `
  <h1>Adopted Stylesheets</h1>
`;

/**
 * AdoptedStyleSheets implementation class
 */
export default class AdoptedStyleSheets extends HTMLElement {
  constructor() {
    super();
    this._initializeDOM();
  }

  /**
   * Initialize
   */
  _initializeDOM = async () => {
    const commonStylePath = '../index.css';
    const componentStylePath = './index.css';
    const tasks = [
      this._createStyleSheet(commonStylePath), 
      this._createStyleSheet(componentStylePath)
    ];
    try {
      this.attachShadow({mode: 'open'});
      this.shadowRoot.adoptedStyleSheets = await Promise.all(tasks);
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    } catch(err) {
      console.error(err);
    }
  }

  /**
   * Create stylesheet
   * @param {string}
   * @returns {Promise}
   */
  _createStyleSheet = async path => {
    const url = new URL(path, import.meta.url);
    const style = await new CSSStyleSheet().replace(`@import url(${url})`);
    return style;
  }
}

// Register custom element
window.customElements.define('x-adopted-stylesheets', AdoptedStyleSheets);
