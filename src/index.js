import './helloworld/index.js';

// DOMの取得
const mainElm = document.querySelector('main');
const buttonElms = document.querySelectorAll('button');

/**
 * main内にアタッチされているDOMをすべて削除(念ため)
 */
const clearMain = () => {
  while (mainElm.firstChild) {
    mainElm.removeChild(mainElm.firstChild);
  }
};

/**
 * 各アイテム(ボタン)をクリック
 * @param {Event} e
 */
const handleItemClick = e => {
  // 初期化
  clearMain();
  // タグをmainにアタッチ
  mainElm.appendChild(document.createElement(e.currentTarget.dataset.tagName));
};

// 各アイテム(ボタン)にイベントを設定
[...buttonElms].forEach(item => item.addEventListener('click', handleItemClick));
