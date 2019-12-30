/**
 * Hello Wold class
 */
export default class HelloWorld extends HTMLElement {
  /**
   * Attach
   */
  connectedCallback () {
    this.innerHTML = '<h1>Hello World</h1>';
  }
}

// Register custom element
window.customElements.define('x-helloworld', HelloWorld);
