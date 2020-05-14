import {$} from '@core/dom';
import {Emitter} from '@core/Emitter';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.emitter = new Emitter();
  }
  getRoot() {
    const $root = $.create('div', 'excel');
    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className);
      const componentOptions = {
        emitter: this.emitter,
      };
      const component = new Component($el, componentOptions);
      // DEBUG
      // if (component.name) {
      //   window['c' + component.name] = component;
      // }
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });
    return $root;
  }
  render() {
    // this.$el.insertAdjacentHTML('afterbegin', `<h1>Test</h1>`);
    // const node = document.createElement('h1');
    // node.textContent = 'Test';
    // this.$el.append(node);
    // console.log('before', this.components);
    this.$el.append(this.getRoot());
    // console.log('after', this.components);
    this.components.forEach((component) => component.init());
  }
  destroy() {
    this.components.forEach((component) => component.destroy());
  }
}
