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

class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define('x-helloworld', HelloWorld);
