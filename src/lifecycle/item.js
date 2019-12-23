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
  <p>
    ① window.customElements.defineでカスタムエレメントが登録されると
    observedAttributesがコールされ、アトリビュートの変更をリッスンするための配列を返す。
    ここでわざわざリッスンするアトリビュートを選ぶ理由は、デフォルトですべてリッスンしてしまうと、
    オーバーヘッドが起きブラウザのパフォーマンスが良くないからである
  </p>
  <p>
    ② 次にコンストラクタが呼ばれ初期化処理が行われる。
    注意点としてはこの時点では、まだattributeに値を設定するとエラーになるので注意したい。
    実用シーンはコンスタントラクタに外から引数をもらい、attributeにセットするパターンであるが、
    これはエラーになるので注意。解決策はconnectedCallbackでアトリビュートを操作する事
  </p>
  <p>
    ③ コンストラクタがコールされた後に、やっとattributeの変更を受け取る事ができ、attributeChangedCallbackが呼ばれる。
  </p>
  <p>
    ④ タグがアタッチされると、connectedCallbackが呼ばれる
  </p>
  <p>
    ⑤ タグがデタッチされると、disconnectedCallbackが呼ばれる
  </p>
  <p>
    ※ 一度でもグローバルにタグが登録されていると、①は呼び出されず、②のコンストラクタからになる。
  </p>
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
