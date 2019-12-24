import { LifecycleItem } from './item.js';

// テンプレートタグの作成
const template = document.createElement('template');
template.innerHTML = `
  <x-lifecycle-item label="LifeCycle"></x-lifecycle-item>
  <h2>
  ① observedAttributes
  </h2>
  <p>
    window.customElements.defineでカスタムエレメントが登録されると
    observedAttributesがコールされ、アトリビュートの変更をリッスンするための配列を返す。
    ここでわざわざリッスンするアトリビュートを選ぶ理由は、デフォルトですべてリッスンしてしまうと、
    オーバーヘッドが起きブラウザのパフォーマンスが良くないからである
  </p>
  <h2>
    ② constructor
  </h2>
  <p>
    次にコンストラクタが呼ばれ初期化処理が行われる。
    コンスタントラクタでの責務はイベントリスナーのセットアップや、shadowRootの形成である。
    一般的なコンスタントラクタとして使おうとする時の注意点としては、この時点ではまだattributeに値を設定するとエラーになるので注意したい。
    実用シーンはコンスタントラクタに外から引数をもらい、attributeにセットするパターンであるが、
    これはエラーになるので注意。解決策はconnectedCallbackでアトリビュートを操作する事
  </p>
  <h2>
    ③ attributeChangedCallback
  </h2>
  <p>
    コンストラクタがコールされた後に、やっとattributeの変更を受け取る事ができ、attributeChangedCallbackが呼ばれる。
  </p>
  <h2>
    ④ connectedCallback
  </h2>
  <p>
    タグがアタッチされると、connectedCallbackが呼ばれる
    connectedCallbackでの責務はリソースのfetchや、レンダリングなどである
  </p>
  <h2>
    ⑤ disconnectedCallback
  </h2>
  <p>
    タグがデタッチされると、disconnectedCallbackが呼ばれる
    disconnectedCallbackでの責務はイベントリスナーのremoveといった、メモリのクリーンアップを行う
  </p>
  <h2>
  注意点
  </h2>
  <p>
    一度でもグローバル(window)にタグが登録されていると、①は呼び出されず、②のコンストラクタからになる。(2度登録するとエラーになる)
    コンスタントラクタはタグの初期化時に一度だけ呼ばれるが、理論上connectedCallbackはアタッチされる度に呼ばれる
  </p>
  <a href="https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance">
    ライフサイクルについてはWHATWGを参照
  </a>
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
   * アタッチ
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
