// Create template tag
const template = document.createElement('template');
template.innerHTML = `
  <h1>Template</h1>
`;

/**
 * Template implementation class
 */
export default class Template extends HTMLElement {
  /**
   * Attach
   */
  connectedCallback() {
    // Activate template with cloneNode
    this.appendChild(template.content.cloneNode(true));
  }
}

// Register custom element
window.customElements.define('x-template', Template);
