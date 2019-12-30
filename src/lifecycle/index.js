import LifecycleItem from './item.js';

/**
 * Lifecycle testing class
 */
export default class Lifecycle extends HTMLElement {
  /**
   * Attach
   */
  connectedCallback() {
    this.innerHTML = '<x-lifecycle-item label="LifeCycle"></x-lifecycle-item>';
    !window.customElements.get('x-lifecycle-item') && window.customElements.define('x-lifecycle-item', LifecycleItem);
  }
}

// Register custom element
window.customElements.define('x-lifecycle', Lifecycle);
