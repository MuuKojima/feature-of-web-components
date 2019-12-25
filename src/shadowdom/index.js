import './noshadow.js';
import './shadow.js';

/**
 * ShadowRootを有効or無効にしたタグをアタッチするための、Appクラス
 */
export default class ShadowNoShadow extends HTMLElement {
  /**
   * アタッチ
   */
  connectedCallback() {
    this.innerHTML = `
      <style>
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 50px 0;
        }
        x-noshadow,
        x-shadow {
          width: 600px;
        }
      </style>
      <h1>ShadowRootの有・無でどのような違いがあるか</h1>
      <p>
        ここでは通常のカスタムエレメントとShadowDOMが形成されたカスタムエレメントを比較してみる。
        ShadowDOMの場合、親からのスタイルの影響もなければ、子からも親に影響を与えていないことがわかる。
        一方で、ShadowDOMでないカスタムエレメントの場合は後勝ちになり、親のh1要素が子のh1要素のスタイルになってしまっている。サイズが小さくなり、色が青になっている。
      </p>
      <div class="container">
        <x-noshadow></x-noshadow>
        <x-shadow><x-shadow>
      </div>
    `
  }
}

// カスタムエレメントの登録
window.customElements.define('x-shadow-noshadow', ShadowNoShadow);
