import { LifecycleItem } from './item.js';

// テンプレートタグの作成
const template = document.createElement('template');
template.innerHTML = `
  <x-lifecycle-item label="LifeCycle"></x-lifecycle-item>
`;

/**
 * Lifecycleを解説するクラス
 */
class Lifecycle extends HTMLElement {
  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /**
   * タグのアタッチ
   */
  connectedCallback() {
    const elm = window.customElements.get('x-lifecycle-item');
    // 1度でもボタンを押して、タグがグローバルに登録されていると
    // 2度登録する事は出来なくなるので、ここでチェックする
    // ちなみに2度登録するとエラーになる
    if (elm) {
      return;
    }
    // こちら側のコンポーネントから`LifecycleItem`を登録する
    // 他と同じように`LifecycleItem`内でdefineしてしまうと、importされた時点で
    // `window.customElements.define` がコールされ
    // `observedAttributes` が呼ばれてしまうため、ライフサイクルのテストに向かないので。
    window.customElements.define('x-lifecycle-item', LifecycleItem);
  }
}

// カスタムエレメントの登録
window.customElements.define('x-lifecycle', Lifecycle);
