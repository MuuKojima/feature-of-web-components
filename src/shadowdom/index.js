import './noshadow.js';
import './shadow.js';

// テンプレートタグの作成
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
    }
    h1 {
      font-weigh: bold;
      font-size: 60px;
      color: black;
    }
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 50px 0;
    }
  </style>
  <h1>ShadowRootの有・無でどのような影響があるか</h1>
  <p>
    ShadowDOMの場合、親からのスタイルの影響もなければ、子からも親に影響を与えていないことがわかる。
    一方、ShadowDOMでないカスタムエレメントの場合は後勝ちになり、親が子のスタイルになってしまっている。(サイズや色)
  </p>
  <div class="container">
    <x-noshadow></x-noshadow>
    <x-shadow><x-shadow>
  </div>
`;

/**
 * ShadowRootを有効or無効にしたタグをアタッチするための、Appクラス
 */
class App extends HTMLElement {
  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

// カスタムエレメントの登録
window.customElements.define('x-shadow-noshadow', App);
