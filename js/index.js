"use strict";

/**
 * 各要素の基底クラス
 */
class ControlledElementBase {
  constructor(element) {
    this.element = element;
    this.openClassName = 'js_open';
    console.log(this.element);
  }

  _alignState = (state) => {
    if(state) {
      this.element.classList.add(this.openClassName);
    } else {
      this.element.classList.remove(this.openClassName);
    }
  }
}

/**
 * ヘッダー
 */
class HeaderPanel extends ControlledElementBase {
  constructor(id) {
    super(document.getElementById(id));
  }

  alignState = (state) => {
    this._alignState(state);
  }
}

/**
 * ハンバーガーメニュー。自身の高さを、header_upper_wrap の高さを参照して決定する機能付き。
 */
class HambrugerMenuPanel extends ControlledElementBase {
  constructor(id, upperWrapId='js_header_upper_wrap') {
    super(document.getElementById(id));
    this.referencedHeader = document.getElementById(upperWrapId);
    this.#calculateTop();
    this.#eventAdder();
  }

  alignState = (state) => {
    this._alignState(state);
  }

  #calculateTop = (e) => {
    this.element.style.top = this.referencedHeader.offsetHeight+'px';
  }

  #eventAdder = () => {
    window.addEventListener('resize', this.#calculateTop);
  }
}

/**
 * グローバルメニュー
 */
class GlobalNavigator extends ControlledElementBase {
  constructor(id) {
    super(document.getElementById(id));
  }

  alignState = (state) => {
    this._alignState(state);
  }
}


/**
 * ハンバーガーアイコンのクラス。
 * クリックされたかイベントを捉え、その他の要素をもまとめて管理する。
 */
class HamburgerIcon {

  constructor() {
    this.element = document.getElementById('js_hambruger_icon');
    this.isOpen = false;
    this.openClassName = 'js_open';
    // ヘッダー
    this.headerPanel = new HeaderPanel('js_header');
    // グローバルナヴィ
    this.globalNav = new GlobalNavigator('js_global_nav');
    // 対応した開閉式メニュー
    this.menuPanel = new HambrugerMenuPanel('js_hambruger_menu', 'js_header_upper_wrap');
  }

  // 傘下の要素を自分の状態に合わせる
  #alignState = () => {
    // 自身を合わせる
    this.#alignSelf();
    // メニューパネルの状態を合わせる。
    this.#alignMenuPanel();
    // グローバルナヴィの状態合わせ。
    this.#alignGlobalNav();
    // ヘッダーを合わせる
    this.#alignHeaderPanel();
  }

  #alignSelf = () => {
    if(this.isOpen) {
      this.element.classList.add(this.openClassName);
    } else {
      this.element.classList.remove(this.openClassName);
    }
  }

  #alignGlobalNav = () => {
    this.globalNav.alignState(this.isOpen);
  }
  // 傘下のメニューパネルの状態を合わせる。
  #alignMenuPanel = () => {
    this.menuPanel.alignState(this.isOpen);
  }

  // ヘッダーの状態合わせ
  #alignHeaderPanel = () => {
    this.headerPanel.alignState(this.isOpen);
  }

  /**
   * クリックされるイベントが生じた時の処理。自身の状態を切り替え、傘下要素の状態も切り替える。
   * 状態を切り替える、とは、class name を変更するのみで、実際の変化はcssに任せる。
   */
  clicked = () => {
    console.log('clicked');
    if(this.isOpen) {
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }
    this.#alignState();
  }

  eventAdder = () => {
    // アイコンクリックのイベントが生じた時に呼ぶ関数を指定。
    this.element.addEventListener('click', this.clicked);
  }
}


/**
 * エントリーポイント。
 * DOMContentLoaded イベント発生時(=DOMツリー構造の読み込みを終了した瞬間)に、記述された処理を実行。
 */
window.addEventListener('DOMContentLoaded',()=>{
  // ハンバーガーアイコンの全機能を付加。
  ( new HamburgerIcon() ).eventAdder();


  /**
   * スライダー01 (縦長の画像スライダー)
   */
  const swiper_01 = new Swiper('.features_section .swiper', {
    // 最後に達したら先頭に戻る設定。
    // これを true にする場合、slidesPerView の値を、実際のスライド枚数の半分以下にしなければならない。
    loop: true,
    // rewind: true,
    // 初期状態で焦点を当あてるスライド番号。0 = 一枚目
    initialSlide: 2,

    // アニメーションのスピード（1000 = 1秒)
    speed: 500,

    setWrapperSize: true,
    centeredSlides: true,
    centerInsufficientSlides: true,
        
    // 一画面に何枚のスライドを表示するか。後述の breakpoints の設定で枚数を調整するとよい。
    // loop の値が true の場合、この値は、実際のスライド枚数の半分以下にしなければならない。
    slidesPerView: '3',
    spaceBetween: 20,

    // ブレイクポイントごとの設定。
    // slidesPerView と spaceBetween を、各ブレイクポイントごとに記述。
    // 例えば 700: {}, と設定を記述する場合、ビューポートが 700px 以上の時の設定となる。
    breakpoints: {
      980: {
        slidesPerView: '5',
        spaceBetween: 20,
      },
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

  /**
   * Facilities のカルーセル、Slider_02
   */
  const swiper_02 = new Swiper('.facilities_section .swiper', {
    // loop: true, //最後に達したら先頭に戻る
    rewind:true,
    initialSlide: 1,
    
    speed: 500, // スライドアニメーションのスピード（ミリ秒）
    setWrapperSize:true,
    centeredSlides: true,
    centerInsufficientSlides: true,

    //何枚表示するか。 breakpoints 設定で枚数を調整するとよい。
    slidesPerView: '2', 
    spaceBetween: 20,
    breakpoints: {
      500: {
        slidesPerView: '2',
        spaceBetween: 20,
      },
      700: {
        slidesPerView: '2',
        spaceBetween: 20,
      },
      960: {
        slidesPerView: '3',
        spaceBetween: 20,
      },
      1500: {
        slidesPerView: '5',
        spaceBetween: 40,
      }
    },
    // ナヴィボタン。
    navigation: {
      nextEl: '.facilities_section .swiper-button-next',
      prevEl: '.facilities_section .swiper-button-prev',
    },
    // ページネーション。
    pagination: {
      el: '.facilities_section .swiper-pagination', 
      type: 'bullets',// fraction, progressbar
      clickable: true,
    },
    // スクロールバー。
    scrollbar: {
      el: '.facilities_section .swiper-scrollbar',
      draggable: true,
    },
  });

  /*
   * footer の、フェードで切り替わる画像(=スライダー)つきセクションの、スライダーの設定
   */
  const swiper_footer_slider = new Swiper('.card_section_containing_slider__swiper_outer_wrap .swiper', {
    loop: true,
    speed: 1000, // スライドアニメーションの変化スピード（ミリ秒）
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    autoplay: {
      delay: 5000,// 待ち時間
      disableOnInteraction: false,
      waitForTransition: false,
    },
  });
});


