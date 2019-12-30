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
    
    // Register `LifecycleItem` from the component on this side
    // If you define it in `LifecycleItem`, `window.customElements.define` is called
    // Then `observedAttributes` is also called
    // So it is not suitable for life cycle testing
    !window.customElements.get('x-lifecycle-item') && window.customElements.define('x-lifecycle-item', LifecycleItem);
  }
}

// Register custom element
window.customElements.define('x-lifecycle', Lifecycle);
