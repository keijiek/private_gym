"use strict";

// ハンバーガーアイコンの線。アイコンクラスの指示で、クラス名を付けたり消したりするのみ。自分で判断して状態を変化する機能を持たせない。
class HumburgerIconLine {
  constructor(element, openClassName) {
    this.element = element;
    this.openClassName = openClassName;
  }

  alignState = (state) => {
    if(state) {
      this.#open();
    } else {
      this.#close();
    }
  }

  #open = () => {
    this.element.classList.add(this.openClassName);
  }

  #close = () => {
    this.element.classList.remove(this.openClassName);
  }
}

// ハンバーガーメニュのアイテム
class HumburgerMenuItem {
  constructor(element, fadeInClass, fadeOutClass) {
    this.element = element;
    this.fadeInClass = fadeInClass;
    this.fadeOutClass = fadeOutClass;
  }

  visualize = () => {
    this.element.style.display = 'flex';// block ではなく flex にしているので注意。内容物<a>のサイズを親要素いっぱいに広げるため
    this.element.classList.add(this.fadeInClass);
    this.element.classList.remove(this.fadeOutClass);
  }
  makeInvisible = () => {
    this.element.classList.add(this.fadeOutClass);
    this.element.classList.remove(this.fadeInClass);
  }
  initialize = () => {
    this.element.style.display = 'none';
  }
}

// メニューを管理するのクラス。アイコンクラスの指示で、クラス名を付けたり消したりするのみ。自分で判断して状態を変化する機能を持たせない。
class HumburgerMenu {

  constructor(id, itemClass, animateCssClasses, openClassName) {
    this.element = document.getElementById(id);
    this.openClassName = openClassName;
    this.items = [];
    Array.from(this.element.getElementsByClassName(itemClass)).map(item => {
      this.items.push(new HumburgerMenuItem(item, animateCssClasses.FADE_IN, animateCssClasses.FADE_OUT));
    });
    this.initialize();
    console.log(this.items);
  }

  initialize = () => {
    this.items.forEach(item => {
      item.initialize();
    })
  }

  alignState = (state) => {
    if(state) {
      this.items.forEach(item => {
        item.visualize();
      })
    } else {
      this.items.forEach(item => {
        item.makeInvisible();
      })
    }
  }

  checkVisible = (breakPoint) => {
    const viewPortWidth = document.documentElement.clientWidth;
    if(viewPortWidth>breakPoint) {
      this.#makeInvisible();
    } else {
      this.#makeVisible();
    }
  }

  #makeVisible = () => {
    this.element.style.display = 'block';
  }
  #makeInvisible = () => {
    this.element.style.display = 'none';
  }
}

// アイコンを管理するクラス
class HumburgerIcon {

  constructor(ARGMENTS) {
    this.element = document.getElementById(ARGMENTS.ID__HUMBURGER_ICON__CLICKABLE_AREA);
    this.breakPoint = ARGMENTS.BREAK_POINT;
    this.isOpen = false;
    this.menu = new HumburgerMenu(ARGMENTS.ID__HUMBURGER_MENU, ARGMENTS.CLASS__HUMBURGER_ITEM, ARGMENTS.CLASSES__ANIMATE, ARGMENTS.CLASS__OPEN_OR_VISIBLE);
    this.lines = [];
    Array.from(this.element.getElementsByClassName(ARGMENTS.CLASS__HUMBURGER_LINE)).map(elm => {
      this.lines.push(new HumburgerIconLine(elm, ARGMENTS.CLASS__OPEN_OR_VISIBLE));
    });
  }

  // 自己の状態(isOpen)に、傘下の要素の状態を合わせる
  #alignState = () => {
    // メニューの状態を合わせる
    this.menu.alignState(this.isOpen);
    this.menu.checkVisible(this.breakPoint);

    // 線の状態を合わせる
    this.lines.forEach((line) => {
      line.alignState(this.isOpen);
    });
  }

  // isOpen(開閉状態)を、単純に反転させる。
  #switchState = () => {
    this.isOpen = !(this.isOpen);
  }

  // isOpen(開閉状態) を、とにかく false にする。
  #close = () => {
    this.isOpen = false;
  }

  clicked = () => {
    this.#switchState();
    this.#alignState();
  }

  resized = () => {
    this.#close();
    this.#alignState();
    this.menu.initialize();
  }

  eventAdder = () => {
    // アイコン要素をクリックしたときのイベントを追加
    this.element.addEventListener('click', this.clicked);
    // リサイズ時の状態変更(isOpen = false)
    window.addEventListener('resize', this.resized);
  }
}


window.addEventListener('DOMContentLoaded',()=>{
  
  /**
   * 次の値は、html 上の id や class の値と合わせること。
   * ID__HUMBURGER_ICON__CLICKABLE_AREA = ハンバーガーアイコンとしてクリック可能なブロックのid。
   * ID__HUMBURGER_MENU = ハンバーガーメニューとして使うメニューブロックのid。
   * CLASS__OPEN_OR_VISIBLE = 開く・可視化する、という状態を適用するためのセレクターに使うクラス名。
   * CLASS__HUMBURGER_ITEM = ハンバーガーメニュのアイテムのクラス名。
   * CLASSES__ANIMATE.FADE_IN = animate.css の、フェイドインするアニメのクラス名。
   * CLASSES__ANIMATE.FADE_OUT = animate.css の、フェイドアウトするアニメのクラス名。
   * BREAK_POINT = css ファイルの、@media screen and (max-width: 〇px){} の、〇に書かれている値。
   */
  const ARGMENTS = {
    ID__HUMBURGER_ICON__CLICKABLE_AREA : 'js_humburger_icon__clickable_area',
    ID__HUMBURGER_MENU : 'js_humburger_menu',
    CLASS__HUMBURGER_LINE : 'js_humburger_icon__line',
    CLASS__HUMBURGER_ITEM : 'js_humburger_menu__item',
    CLASS__OPEN_OR_VISIBLE : 'js_open',
    CLASSES__ANIMATE : {
      FADE_IN : 'animate__fadeInTopRight',
      FADE_OUT : 'animate__fadeOutTopRight',
    },
    BREAK_POINT : 760,
  }

  // ハンバーガーアイコンのインスタンスを作り、イベント付加を実行させる。
  const humburgerIcon = new HumburgerIcon(ARGMENTS);
  humburgerIcon.eventAdder();


})
