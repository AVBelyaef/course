class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }
  text(text) {
    if (typeof text !== 'undefined') {
      this.$el.textContent = text;
      return this;
    }
    if (this.$el.tagName.toLocaleLowerCase() === 'input') {
      return this.$el.value.trim();
    }
    return this.$el.textContent.trim();
  }
  clear() {
    this.html('');
    return this;
  }
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }
  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }
    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }
  get data() {
    return this.$el.dataset;
  }
  id(parse) {
    if (parse) {
      const parsed = this.id().split(':');
      return {
        col: +parsed[0],
        row: +parsed[1],
      };
    }
    return this.data.id;
  }
  focus() {
    this.$el.focus();
    return this;
  }
  closest(selector) {
    return $(this.$el.closest(selector));
  }
  getCoords() {
    return this.$el.getBoundingClientRect();
  }
  find(selector) {
    return $(this.$el.querySelector(selector));
  }
  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }
  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value);
      return this;
    }
    this.$el.getAttribute(name);
  }
  css(styles = {}) {
    Object.keys(styles).forEach((key) => this.$el.style[key] = styles[key]);
  }
  getStyle(styles = []) {
    return styles.reduce((res, style) => {
      res[style] = this.$el.style[style];
      return res;
    }, {});
  }
  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }
  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};

