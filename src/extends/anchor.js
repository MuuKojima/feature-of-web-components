/**
 * AnchorをExtendsしたConfirmAnchorクラス
 */
export default class ConfirmAnchor extends HTMLAnchorElement {
  /**
   * Attach
   */
  connectedCallback() {
    this.clickLisnner = e => {
      const result = confirm(`リンクへ跳びますか？ : '${this.href}'`);
      if (!result) {
        // Anchorのアクションを無効にする
        e.preventDefault();
      }
    }
    this.addEventListener('click', this.clickLisnner);
  }

  /**
   * Detach
   */
  disconnectedCallback() {
    this.removeEventListener('click', this.clickLisnner);
  }
}

// Register custom element
// 既存タグを継承した場合は第3引数を追加
customElements.define('x-confirm-anchor', ConfirmAnchor, { extends: 'a' });
