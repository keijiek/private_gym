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


window.addEventListener('DomContentLoaded', ()=> {
  
})
