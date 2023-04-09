"use strict";

// import Swiper JS
// import Swiper from './modules/swiper-bundle';
// import Swiper styles
// import './modules/swiper-bundle.';

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

// ヘッダー
class HeaderPanel extends ControlledElementBase {
  constructor(id) {
    super(document.getElementById(id));
  }

  alignState = (state) => {
    this._alignState(state);
  }
}

// メニュー
class HambrugerMenuPanel extends ControlledElementBase {
  constructor(id) {
    super(document.getElementById(id));
  }

  alignState = (state) => {
    this._alignState(state);
  }
}

// グローバルメニュ
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

  constructor(ARGS) {
    this.element = document.getElementById('js_hambruger_icon');
    this.isOpen = false;
    this.openClassName = ARGS.CLASS__OPEN_OR_VISIBLE;
    // ヘッダー
    this.headerPanel = new HeaderPanel('js_header');
    // グローバルナヴィ
    this.globalNav = new GlobalNavigator('js_global_nav');
    // 対応した開閉式メニュー
    this.menuPanel = new HambrugerMenuPanel('js_hambruger_menu');
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
 * 
 */
const commonSwiperOptions = {

}
// エントリーポイント
window.addEventListener('DOMContentLoaded',()=>{
  const ARGS = {
    ID__HAMBRUGER_ICON: 'js_hambruger_icon',
    ID__HEADER: 'js_header',
    CLASS__HAMBRUGER_LINE: 'js_hambruger_icon__span',
    CLASS__OPEN_OR_VISIBLE: 'js_open',
  }
  const hambrugerIcon = new HamburgerIcon(ARGS);
  hambrugerIcon.eventAdder();


  /**
   * スライダー01 (縦長の画像スライダー)
   */
  const swiper_01 = new Swiper('.features_section .swiper', {
    // 以下にオプションを設定
    loop: true, //最後に達したら先頭に戻る
    initialSlide: 0,  //初期状態で焦点を当あてるスライド番号。0=一枚目
    direction: 'horizontal', // 規定値は horizontal なので不要だが、いちおう。 'vertical' もある。
    slidesPerView: '1.1', //何枚表示するか。 breakpoints 設定で枚数を調整するとよい。
    spaceBetween: 10,
    speed: 400, // スライドアニメーションのスピード（ミリ秒）
    // setWrapperSize:true,
    centeredSlides: true,
    centerInsufficientSlides: true,
    
    // ブレイクポイント。直下オブジェクトのキーとなる数値は min-width と同じ。「ViewPort の width が Xpx 以上なら～」という設定の仕方。
    breakpoints: {
      400: {
        slidesPerView: '1.4',
        spaceBetween: 10,
      },
      660: {
        slidesPerView: '2',
        spaceBetween: 10,
      },
      980: {
        slidesPerView: '3',
        spaceBetween: 10,
      },
      1300: {
        slidesPerView: '4',
        spaceBetween: 20,
      },
      1700: {
        slidesPerView: '5',
        spaceBetween: 20,
      }
    },

    // エフェクト選択。スライダーの機能ががらりと変わる。'slide' | 'fade' | 'cube' | 'coverflow' | 'flip' | 'creative' | 'cards'
    // エフェクトを変えるなら、そのエフェクト用の設定オブジェクトが必要。 'slider' を除く。
    effect: "slide",

    // 自動再生設定。設定オブジェクトではなく、単に autopay:true だけでも、規定値を利用したじ autoplay 機能を実装できる。
    autoplay: {
      delay: 3000, //次のスライドに切り替わるまでの時間
      disableOnInteraction: true, //ユーザーが操作したら止めるか
      pauseOnMouseEnter: true,
    },
    // ナヴィボタン。
    navigation: {
      nextEl: '.features_section .swiper-button-next',
      prevEl: '.features_section .swiper-button-prev',
    },
    // ページネーション。
    pagination: {
      el: '.features_section .swiper-pagination', 
      type: 'bullets',// fraction, progressbar
      clickable: true,
    },
    // スクロールバー。
    scrollbar: {
      el: '.features_section .swiper-scrollbar',
      draggable: true,
    },
  });

  /**
   * Facilities のカルーセル、Slider_02
   */
  const swiper_02 = new Swiper('.facilities_section .swiper', {
    loop: true, //最後に達したら先頭に戻る
    initialSlide: 0,
    //何枚表示するか。 breakpoints 設定で枚数を調整するとよい。
    slidesPerView: '1.1', 
    // slidesPerView: 'auto',
    spaceBetween: 0,
    speed: 400, // スライドアニメーションのスピード（ミリ秒）
    setWrapperSize:true,
    centeredSlides: true,
    centerInsufficientSlides: true,

    innerWidth: 320,
    innnerHeight: 480,
    breakpoints: {
      500: {
        slidesPerView: '1.3',
        spaceBetween: 10,
      },
      700: {
        slidesPerView: '1.5',
        spaceBetween: 10,
      },
      960: {
        slidesPerView: '2',
        spaceBetween: 10,
      },
      1500: {
        slidesPerView: '3',
        spaceBetween: 20,
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

  const swiper_footer_slider = new Swiper('.card_section_containing_slider__swiper_outer_wrap .swiper', {
    loop: true,
    speed: 1000, // スライドアニメーションのスピード（ミリ秒）
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      waitForTransition: false,
    },
  });
});


