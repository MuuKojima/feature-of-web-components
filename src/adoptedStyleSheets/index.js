const template = document.createElement('template');
template.innerHTML = `
  <h1>Adopted Stylesheets</h1>
`;


class AdoptedStyleSheets extends HTMLElement {
  constructor() {
    super();
    this._initializeDOM();
  }

  _initializeDOM = async () => {
    this.attachShadow({mode: 'open'});
    const commonStyle = await this._createStyleSheet('../index.css');
    const carouselStyle = await this._createStyleSheet('./index.css');
    this.shadowRoot.adoptedStyleSheets = [commonStyle, carouselStyle];
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  _createStyleSheet = async path => {
    const url = new URL(path, import.meta.url);
    const style = await new CSSStyleSheet().replace(`@import url(${url})`);
    return style;
  }
}

window.customElements.define('x-adopted-stylesheets', AdoptedStyleSheets);
