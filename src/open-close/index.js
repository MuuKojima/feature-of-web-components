import './close.js';
import './open.js';

/**
 * OpenCloseのテストクラス
 */
export default class OpenClose extends HTMLElement {
  /**
   * アタッチ
   */
  connectedCallback() {
    this.innerHTML = `
      <h1>ShadowRootのOpenとClose</h1>
      <button>DOMを取得</button>
      <x-open></x-open>
      <x-close></x-close>
    `;
    this.clickLisnner = this.handleClick.bind(this);
    const buttonElm = this.querySelector('button');
    buttonElm.addEventListener('click', this.clickLisnner);
  }

  /**
    * デタッチ
    */
  disconnectedCallback() {
    const buttonElm = this.querySelector('button');
    buttonElm.removeEventListener('click', this.clickLisnner);
  }

  /**
   * ボタンのクリック
   */
  handleClick() {
    const openElm = this.querySelector('x-open');
    const closeElm = this.querySelector('x-close');
    if (openElm.shadowRoot) {
      // ここに来る
      alert('オープンのShadowDOMを取得', openElm.shadowRoot);
    }
    if (closeElm.shadowRoot) {
      // ここには来ない
      alert('クローズのShadowDOMを取得', openElm.shadowRoot);
    }
    console.log(openElm.shadowRoot);
    // shadowRootはnullを返す
    console.log(closeElm.shadowRoot);
  }
}

// カスタムエレメントの登録
window.customElements.define('x-open-close', OpenClose);
