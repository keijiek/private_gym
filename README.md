# private_gym

## tree
.
├── README.md
├── css
│   ├── common.css
│   └── modules
│       ├── animate.min.css
│       ├── animate_custom_delay.css
│       ├── ress.min.css
│       └── swiper-bundle.min.css
├── index.html
├── js
│   ├── index.js
│   └── modules
│       └── swiper-bundle.min.js
└── private_gym.code-workspace

### 不要と思われるファイル

- private_gym.code-workspace (VSCode 用設定ファイル)
- .gitignore (git の設定ファイル)
- README.md (この文書)

### css ディレクトリ
- common.css (手書きのcssファイル)
- modules/ (ただ参照されるだけの、編集される必要のないcssファイル群)

#### css/modules/ ディレクトリ
- ress.min.css (リセットcss)
- animate.min.css (簡単にアニメを追加するcssライブラリ)
- animate_custom_delay.css (上記 animate.css の 0.05秒単位の遅延設定集)
- swiper-bundle.min.css (カルーセルを簡単に導入するためのライブラリが用いる css ファイル)

### js ディレクトリ
- index.js (手書きの JavaScript ファイル)
- modules/ (参照されるだけで、編集されなることのないファイル)

#### js/modules/ ディレクトリ
- swiper-bundle.min.js (カルーセルを簡単に導入するためのライブラリ、swiper.js の本体。導入するための設定は index.js に記述)

---

## swiper.js 

より詳しく正確には、次の公式サイトや参考サイトをご覧ください。
- <https://swiperjs.com/get-started>
- <https://pengi-n.co.jp/blog/library-swiper/>


### 導入方法 (index.html では導入済み)

- `swiper-bundle.min.css` と `swiper-bundle.min.css` を、それぞれ適切な場所に配置。
- html の head タグ内で上記2ファイルを読み込む。(次は例)。

```html
<head>
  (略)
  <link rel="stylesheet" href="css/modules/swiper-bundle.min.css"/>
  <script src="js/modules/swiper-bundle.min.js"></script>
  (略)
</head>
```

### スライダーの基本的な構造

スライダーを構成するhtml文は次の通り。

```html
<!-- スライダーのメインコンテナ -->
<div class="swiper">

  <!-- 必須の追加ラッパー -->
  <div class="swiper-wrapper">
    <!-- スライド群 -->
    <div class="swiper-slide">Slide 1</div>
    <div class="swiper-slide">Slide 2</div>
    <div class="swiper-slide">Slide 3</div>
    ...
  </div>

  <!-- ページネーション, 必要なら -->
  <div class="swiper-pagination"></div>

  <!-- ナヴィゲーションボタン, 必要なら -->
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>

  <!-- スクロールバー, 必要なら -->
  <div class="swiper-scrollbar"></div>

</div>
```


### 設定 (index.js に、index.html で使うぶんの設定は記述済み)

`DOMContentLoaded` イベントに付加する関数の一部として、下の様に、Swiper インスタンスを生成する時の引数として設定を渡す。  
第一の引数である'クエリセレクター01'にあたる部分では、css と同様のクエリセレクターで、この設定を適用する要素を指定する。  
第二の引数である{設定オブジェクト}にあたる部分では、オブジェクト形式で設定全体を記述。

```js
window.addEventListener('DOMContentLoaded',()=>{
  const swiper_01 = new Swiper('クエリセレクター01', {設定オブジェクト01});
  const swiper_02 = new Swiper('クエリセレクター02', {設定オブジェクト02});

});
```

#### 具体的な設定の内容

各設定項目の、個々の正確な詳細は、公式サイトの API 解説やデモをご覧ください。

- <https://swiperjs.com/swiper-api>
- <https://swiperjs.com/demos>


具体的には次の様に記述します。  
外見を整えるために重要になるのは、次の三つの設定だと思われます。

- loop
- slidesPerView
- breakpoints


```js
window.addEventListener('DOMContentLoaded', () => {
  const swiper_01 = new Swiper('.features_section .swiper', {
    // 最後に達したら先頭に戻る設定。
    // これを true にする場合、slidesPerView の値を、実際のスライド枚数の半分以下にしなければならない。
    loop: true,

    // 初期状態で焦点を当あてるスライド番号。0 = 一枚目
    initialSlide: 0,

    // アニメーションのスピード（1000 = 1秒)
    speed: 500,

    setWrapperSize: true,
    centeredSlides: true,
    centerInsufficientSlides: true,
        
    // 一画面に何枚のスライドを表示するか。後述の breakpoints の設定で枚数を調整するとよい。
    // loop の値が true の場合、この値は、実際のスライド枚数の半分以下にしなければならない。
    slidesPerView: '2',
    spaceBetween: 20,

    // ブレイクポイントごとの設定。
    // slidesPerView と spaceBetween を、各ブレイクポイントごとに記述。
    // 例えば 700: {}, と設定を記述する場合、ビューポートが 700px 以上の時の設定となる。
    breakpoints: {
      980: {
        slidesPerView: '3',
        spaceBetween: 20,
      },
      1500: {
        slidesPerView: '3.5',
        spaceBetween: 20,
      }
    },

    // エフェクト選択。スライダーの機能ががらりと変わる。'slide' | 'fade' | 'cube' | 'coverflow' | 'flip' | 'creative' | 'cards'
    // エフェクトを変えるなら、そのエフェクト用の設定オブジェクトが必要。 'slide' を除く。
    effect: "slide", // 規定値は slide なので、本来は書く必要がない。

    // 自動ページめくり設定。設定オブジェクトではなく、単に autopay:true だけでも、規定値を利用した autoplay 機能を実装できる。
    autoplay: {
      delay: 3000, //次のスライドに切り替わるまでの時間
      disableOnInteraction: true, //ユーザーが操作したら止めるか
      pauseOnMouseEnter: true,
    },

    // ナヴィボタン。値は、対応した要素のクエリ。不要なら、html上の要素と、この設定オブジェクトを消す。
    navigation: {
      nextEl: '.features_section .swiper-button-next',
      prevEl: '.features_section .swiper-button-prev',
    },
    // ページネーション。不要なら、html上の要素と、この設定オブジェクトを消す。
    pagination: {
      el: '.features_section .swiper-pagination', 
      type: 'bullets',// fraction, progressbar
      clickable: true,
    },
    // スクロールバー。不要なら、html上の要素と、この設定オブジェクトを消す。
    scrollbar: {
      el: '.features_section .swiper-scrollbar',
      draggable: true,
    },
  });
});

```
