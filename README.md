# 概要

# Hello World

<img src="https://user-images.githubusercontent.com/3895795/71449411-30c14300-278f-11ea-93c5-0afd35503e0f.png" width="300"></img>

シンプルな `CustomElements` で `HelloWorld` を表示する <br>
`connectedCallback`ではリソースの `fetch` や `rendering` を行う<br>
WAHTWGを参照<br>
https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-autonomous-example
https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance

# LifeCycle(Adapted Callback以外)

<img src="https://user-images.githubusercontent.com/3895795/71449549-edb49f00-2791-11ea-8270-c9f52baba74f.gif" width="300"></img>

`CustomElements`におけるライフサイクル(`Adapted Callback`以外)を試す<br>
発火順は以下に記載

```
① observedAttributes
window.customElements.defineでカスタムエレメントが登録されると
observedAttributesがコールされ、アトリビュートの変更をリッスンするための配列を返す。
ここでわざわざリッスンするアトリビュートを選ぶ理由は、デフォルトですべてリッスンしてしまうと、
オーバーヘッドが起きブラウザのパフォーマンスが良くないからである

② constructor
次にコンストラクタが呼ばれ初期化処理が行われる。
コンスタントラクタでの責務はイベントリスナーのセットアップや、shadowRootの形成である。
一般的なコンスタントラクタとして使おうとする時の注意点としては、この時点ではまだattributeに値を設定するとエラーになるので注意したい。またコンスタントラクタ でthis.innerHTMLなど子要素を加えようとするような操作もエラーになる
実用シーンはコンスタントラクタに外から引数をもらい、attributeにセットするパターンであるが、
これはエラーになるので注意。解決策はconnectedCallbackでアトリビュートを操作する事

③ attributeChangedCallback
コンストラクタがコールされた後に、やっとattributeの変更を受け取る事ができ、attributeChangedCallbackが呼ばれる。

④ connectedCallback
タグがアタッチされると、connectedCallbackが呼ばれる
connectedCallbackでの責務はリソースのfetchや、レンダリングなどである

⑤ disconnectedCallback
タグがデタッチされると、disconnectedCallbackが呼ばれる
disconnectedCallbackでの責務はイベントリスナーのremoveといった、メモリのクリーンアップを行う

※注意点
一度でもグローバル(window)にタグが登録されていると、①は呼び出されず、②のコンストラクタからになる。(2度登録するとエラーになる)
コンスタントラクタはタグの初期化時に一度だけ呼ばれるが、理論上connectedCallbackはアタッチされる度に呼ばれる
```

ライフサイクルについてはWHATWGを参照<br>
https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance

# Adapted Callback

<img src="https://user-images.githubusercontent.com/3895795/71449613-9dd6d780-2793-11ea-9eb8-016b897aaff6.gif" width="300"></img>

通常呼ばれる事はないが、ライフサイクルの一つなので確認<br>
具体的には親ドキュメントが移動した時に発火するコールバック<br>
サンプルではカスタムエレメントを`iframe` で表示している別の`html`の中に移動させ発火させている

# Extends

<img src="https://user-images.githubusercontent.com/3895795/71449650-8a783c00-2794-11ea-8e9a-b6aef68e2fc1.gif" width="300"></img>

既存の `HTMLAnchorElement` を継承し、遷移に許諾が必要なリンクタグを作成

# Initialize 3 ways

# ShadowRootを有効 or 無効

# ShadowRootのOpen or Close

# Template

# Slot

# Todo List
