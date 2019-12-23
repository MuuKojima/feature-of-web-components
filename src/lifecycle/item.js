// テンプレートタグの作成
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
    }
    h1 {
      font-weigh: bold;
      font-size: 50px;
      text-align: center;
    }
  </style>
  <h1 class="label"></h1>
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
  <p>
    ※ 一度でもグローバルにタグが登録されていると、①は呼び出されず、②のコンストラクタからになる。
    ちなみに2度登録するとエラーになる
  </p>
  <a href="https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance">
    ライフサイクルについてはWHATWGを参照
  </a>
`;

/**
 * Lifecycleの実装クラス
 */
class LifecycleItem extends HTMLElement {
  /**
   * アトリビュートの変更を購読するホワイトリストの作成
   */
  static get observedAttributes() {
    alert('①: observedAttributes');
    return ['label'];
  }

  /**
   * アトリビュートの変更を購読
   * @param {string} name 
   * @param {string} oldValue 
   * @param {string} newValue 
   */
  attributeChangedCallback(name, oldValue, newValue) {
    alert('③: attributeChangedCallback');
    this._label = newValue;
  }

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    alert('②: constructor');
    this._label = '';
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /**
   * 描画
   */
  _render() {
    this.shadowRoot.querySelector('.label').textContent = this._label;
  }

  /**
   * タグのアタッチ
   */
  connectedCallback() {
    alert('④: connectedCallback');
    this._render();
  }

  /**
    * タグのデタッチ
    */
  disconnectedCallback() {
    alert('⑤: disconnectedCallback');
  }

  /**
   * オーナードキュメントが移った時
   */
  adoptedCallback() {
    // こちらは呼び出すのが難しいので、ここだけ切り出してデモで説明
  }
}

export {
  LifecycleItem
}
