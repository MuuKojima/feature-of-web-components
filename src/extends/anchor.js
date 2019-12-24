/**
 * AnchorをExtendsしたクラス
 */
class ConfirmAnchor extends HTMLAnchorElement {
  /**
   * アタッチ
   */
  connectedCallback() {
    this.addEventListener('click', e => {
      const result = confirm(`リンクへ跳びますか？ : '${this.href}'`);
      if (!result) {
        // Anchorのアクションを無効にする
        e.preventDefault();
      }
    });
  }
}

// カスタムエレメントの登録
customElements.define('x-confirm-anchor', ConfirmAnchor, { extends: 'a' });
