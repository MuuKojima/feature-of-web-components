import './adapted-callback/index.js';
import './extends/index.js';
import './helloworld/index.js';
import './lifecycle/index.js';
import './open-close/index.js';
import './shadowdom/index.js';
import './todoList/index.js';
import './template/index.js';
import './3ways/index.js';

// DOMの取得
const _mainElm = document.querySelector('main');
const _buttonElms = document.querySelectorAll('button');

/**
 * main内にアタッチされているDOMをすべて削除(念ため)
 * @private
 */
const _clearMain = () => {
  while (_mainElm.firstChild) {
    _mainElm.removeChild(_mainElm.firstChild);
  }
};

/**
 * 各アイテム(ボタン)をクリック
 * @private
 * @param {CustomEvent} e
 */
const _handleItemClick = e => {
  // 初期化
  _clearMain();
  // タグをmainにアタッチ
  _mainElm.appendChild(document.createElement(e.currentTarget.dataset.tagName));
};

// 各アイテム(ボタン)にイベントを設定
[..._buttonElms].forEach(item => item.addEventListener('click', _handleItemClick));
