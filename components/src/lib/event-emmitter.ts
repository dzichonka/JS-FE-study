// export class EventEmitter {
//   constructor() {
//     this.events = {};
//   }

//   on(event, callback) {
//     if (!this.events[event]) {
//       this.events[event] = [];
//     }
//     this.events[event].push(callback);

//     return () => this.off(event, callback);
//   }

//   once(event, callback) {
//     const wrappedCallback = (...args) => {
//       callback(...args);
//       this.off(event, wrappedCallback);
//     };
//     this.on(event, wrappedCallback);
//   }

//   emit(event, ...args) {
//     if (this.events[event]) {
//       this.events[event].forEach((callback) => callback(...args));
//     }
//   }

//   off(event, callback) {
//     if (this.events[event]) {
//       this.events[event] = this.events[event].filter((cb) => cb !== callback);
//     }
//   }
// }

// export const eventEmitter = new EventEmitter();
export class EventEmitter {
  private events: Map<string, Set<Function>>;
  private wrappers: Map<Function, Function>;

  constructor() {
    this.events = new Map();
    this.wrappers = new Map();
  }

  on(name: string, fn: Function): void {
    const event = this.events.get(name);
    if (event) {
      event.add(fn);
    } else {
      this.events.set(name, new Set([fn]));
    }
  }

  once(name: string, fn: Function): void {
    const wrapper = (...args: any[]) => {
      this.remove(name, wrapper);
      fn(...args);
    };
    this.wrappers.set(fn, wrapper);
    this.on(name, wrapper);
  }

  emit(name: string, ...args: any[]): void {
    const event = this.events.get(name);
    if (!event) return;
    for (const fn of event.values()) {
      fn(...args);
    }
  }

  remove(name: string, fn: Function): void {
    const event = this.events.get(name);
    if (!event) return;
    if (event.has(fn)) {
      event.delete(fn);
      return;
    }
    const wrapper = this.wrappers.get(fn);
    if (wrapper) {
      event.delete(wrapper);
      if (event.size === 0) this.events.delete(name);
    }
  }

  clear(name?: string): void {
    if (name) {
      this.events.delete(name);
    } else {
      this.events.clear();
    }
  }

  count(name: string): number {
    const event = this.events.get(name);
    return event ? event.size : 0;
  }

  listeners(name: string): Set<Function> {
    const event = this.events.get(name);
    return new Set(event);
  }

  names(): string[] {
    return [...this.events.keys()];
  }
}

export const eventEmitter = new EventEmitter();
