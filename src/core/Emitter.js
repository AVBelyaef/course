export class Emitter {
  constructor() {
    this.listeners = {};
  }
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
    return true;
  }
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
    return () => {
      this.listeners[event] =
        this.listeners[event].filter((listener) => listener !== fn);
    };
  }
}

const emitter = new Emitter();

const unSub = emitter.subscribe('Test', (data) => console.log('Sub: ', data));
emitter.emit('Test', 'ok');
unSub();
emitter.emit('Test', 'ok');

