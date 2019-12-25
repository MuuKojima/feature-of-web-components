import LifecycleItem from './item.js';

/**
 * Lifecycleをテストするクラス
 */
export default class Lifecycle extends HTMLElement {
  /**
   * アタッチ
   */
  connectedCallback() {
    this.innerHTML = '<x-lifecycle-item label="LifeCycle"></x-lifecycle-item>';
    // こちら側のコンポーネントから`LifecycleItem`を登録する
    // 他と同じように`LifecycleItem`内でdefineしてしまうと、importされた時点で
    // `window.customElements.define` がコールされ
    // `observedAttributes` が呼ばれてしまうため、ライフサイクルのテストに向かないので。
    !window.customElements.get('x-lifecycle-item') && window.customElements.define('x-lifecycle-item', LifecycleItem);
  }
}

// カスタムエレメントの登録
window.customElements.define('x-lifecycle', Lifecycle);
