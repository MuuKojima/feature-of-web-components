class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(this._template().content.cloneNode(true));
  }

  _template() {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        :host {
          display: block;
        }
        h1 {
          text-align: center;
          font-weigh: bold;
          font-size: 50px;
        }
      </style>
      <h1>Hello World</h1>
  `;
   return template;
  }
}

window.customElements.define('x-helloworld', HelloWorld);
