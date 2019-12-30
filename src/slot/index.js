import './modal.js';

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
    .container {
      margin-top: 20px;
    }
  </style>
  <h1>Slot</h1>
  <button class="signin-button">サインイン</button>
  <button class="signup-button">サインアップ</button>
  <div class="container"></div>
`;

/**
 * Slotのテストクラス
 */
export default class XSlot extends HTMLElement {
  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._signinBtnElm =  this.shadowRoot.querySelector(".signin-button");
    this._signupBtnElm =  this.shadowRoot.querySelector(".signup-button");
    this._onSigninClickLisnner = this.handleSigninClick.bind(this);
    this._onSignupClickLisnner = this.handleSginupClick.bind(this);
  }

  /**
   * Attach
   */
  connectedCallback() {
    this._signinBtnElm.addEventListener('click', this._onSigninClickLisnner);
    this._signupBtnElm.addEventListener('click', this._onSignupClickLisnner);
  }

  /**
   * Detach
   */
  disconnectedCallback() {
    this._signinBtnElm.removeEventListener('click', this._onSigninClickLisnner);
    this._signupBtnElm.removeEventListener('click', this._onSignupClickLisnner);
  }

  /**
   * サインインをクリック
   */
  handleSigninClick() {
    const containerElm = this.shadowRoot.querySelector('.container');
    containerElm.innerHTML = `
      <x-modal>
        <div slot="content">
          <h1>Signin</h1>
        </div>
      </x-modal>
    `;
  }

  /**
   * サインアップをクリック
   */
  handleSginupClick() {
    const containerElm = this.shadowRoot.querySelector('.container');
    containerElm.innerHTML = `
      <x-modal>
        <div slot="content">
          <h1>Signup</h1>
        </div>
      </x-modal>
    `;
  }
}

// Register custom element
window.customElements.define('x-slot', XSlot);
