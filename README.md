# Mastering Web Components

```
Shadow DOM
 ┗ カプセル化
Custom Elements
 ┗ 自前のhtmlタグの定義及び使用
HTML Templates
 ┗ tenplateタグを用いた再利用
(ESModule)
 ┗ 廃止になる html importsの変わりで、厳密にはwebcomponentsの仕様ではないが、ここに登場する事が多い。
 ┗ moduleとして、jsファイルを読み込む
```
仕様w3c
https://github.com/w3c/webcomponents

Shadow DOM

# デモ

ホスティング先
https://example-61f5d.firebaseapp.com/

# Hello World

<img src="https://user-images.githubusercontent.com/3895795/71449951-8dc2f600-279b-11ea-9ca5-592a2947afe9.png" width="300"></img>

シンプルな `CustomElements` で `HelloWorld` を表示する <br>

# LifeCycle(Adapted Callback以外)

<img src="https://user-images.githubusercontent.com/3895795/71449549-edb49f00-2791-11ea-8270-c9f52baba74f.gif" width="300"></img>

`CustomElements`におけるライフサイクル(`Adapted Callback`以外)を試す<br>
`Adapted Callback`は通常発火しない<br>
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
一般的なコンスタントラクタとして使おうとする時の注意点としては、外から引数をもらい、attributeにセットするパターンであるが
この時点ではまだattributeに値を設定するとエラーになるので注意したい。
またコンスタントラクタ でthis.innerHTMLなど子要素を加えようとするような操作もエラーになる
解決策はconnectedCallbackでアトリビュートを操作したりレンダリングする事である

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

<img src="https://user-images.githubusercontent.com/3895795/71450003-71738900-279c-11ea-9e8c-ad80be309b44.png" width="300"></img>

カスタムエレメントを生成する方法は主に3つあるので実装

① 宣言的にタグを書くパターン
```
<body>
  <x-foo label="hello"><x-foo>
</body>
```

② DOM APIを使うパターン
```
const elm = document.createElement('x-foo');
elm.label = 'hello';
document.body.appendChild(elm);
```

③ new 演算子を使うパターン

```
const Foo = window.customElements.get('x-foo');
document.body.appendChild(new Foo('hello'));
```

# ShadowRootを有効 or 無効

<img src="https://user-images.githubusercontent.com/3895795/71450058-800e7000-279d-11ea-8ac8-b5036ffd9394.png" width="300"></img>

ここでは通常のカスタムエレメントと`ShadowDOM` が形成されたカスタムエレメントを比較してみる。<br>
ShadowDOMでないカスタムエレメントの場合はスタイルが後勝ちになり、親の`h1`要素が子の`h1`要素のスタイルになってしまっている。サイズが小さくなり、色が青になっている。
`ShadowDOM` の場合、親からのスタイルの影響もなければ、子からも親に影響を与えていないことがわかる。

# ShadowRootのOpen or Close

<img src="https://user-images.githubusercontent.com/3895795/71450087-235f8500-279e-11ea-8391-9768d8f1ba3c.gif" width="300"></img>

`ShadowRoot` には `mode` が `open` か `closed`かを選ぶ事ができる<br>
`open`は `shadowRoot`が取れるが`closed`は`shadwoRoot`にアクセスすると`null`が返る<br>
gooleによれば、`closed`は`非推奨`だが `chrome` が堂々と `closed`を使っているは謎が深い<br>
Googleのclosed非推奨のリンク<br>
https://developers.google.com/web/fundamentals/web-components/shadowdom?hl=ja#advanced<br>
Chromeがclosed使っているリンク
https://github.com/chromium/chromium/blob/6f13c35b976901ac184b2d731a7b5e722b8cb2b0/third_party/blink/renderer/core/script/resources/layered_api/elements/switch/index.mjs#L129

# Template

<img src="https://user-images.githubusercontent.com/3895795/71450152-666e2800-279f-11ea-9683-ad333884e029.png" width="300"></img>

テンプレートタグの実装<br>
`template` タグが画面に描画されても、画面上は存在しない<br>
またアクティベートされるまで、中のコンテンツは描画もされなければ<br>
中の画像リソース等も読み込まない

画面に置いても描画もされないし、リソースも取得されない
```
<template>
  <h1>hello</h1>
  <img src="https://foo.png"></img>
</template>
```

# Slot

<img src="https://user-images.githubusercontent.com/3895795/71450188-1c397680-27a0-11ea-8c07-7e244eb219a0.gif" width="300"></img>

`slot` タグを用いて、外からコンテンツを挿入できる<br>
尚、`slot` は`shadowRoot`がないと機能しない<br>

# Todo List

<img src="https://user-images.githubusercontent.com/3895795/71450211-9538ce00-27a0-11ea-820a-3ef59e583bb7.gif" width="300"></img>

9つのサンプルの内容を組み合わせた簡単なアプリケーションの実装<br>
`Web Components`はただのUI部品を超えていける<br>

# 備考

`connectedCallback`ではリソースの `fetch` や `rendering` を行う<br>
WAHTWGを参照<br>
https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-autonomous-example
https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
