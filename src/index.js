import './adoptedStyleSheets/index.js';
import './adaptedCallback/index.js';
import './extends/index.js';
import './helloworld/index.js';
import './lifecycle/index.js';
import './openClose/index.js';
import './shadowdom/index.js';
import './slot/index.js';
import './todoList/index.js';
import './template/index.js';
import './3ways/index.js';

// Get DOM
const _mainElm = document.querySelector('main');
const _buttonElms = document.querySelectorAll('button');

/**
 * Remove DOM
 * @private
 */
const _clearMain = () => {
  while (_mainElm.firstChild) {
    _mainElm.removeChild(_mainElm.firstChild);
  }
};

/**
 * Click each item
 * @private
 * @param {CustomEvent} e
 */
const handleItemClick = e => {
  // Initialize
  _clearMain();
  // Attach the tag to main
  _mainElm.appendChild(document.createElement(e.currentTarget.dataset.tagName));
};

// Set an event for each item
[..._buttonElms].forEach(item => item.addEventListener('click', handleItemClick));
