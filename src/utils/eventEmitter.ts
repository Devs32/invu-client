type EventCallback = (...args: any[]) => void;

class EventEmitter {
  private events: { [key: string]: EventCallback[] } = {};
  private debounceTimers: { [key: string]: NodeJS.Timeout } = {};

  on(event: string, callback: EventCallback) {
    console.log('on', event, callback);
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  off(event: string, callback: EventCallback) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }

  emit(event: string, ...args: any[]) {
    if (!this.events[event]) return;
    this.events[event].forEach(callback => callback(...args));
  }

  emitDebounced(event: string, delay: number = 100, ...args: any[]) {
    if (this.debounceTimers[event]) {
      clearTimeout(this.debounceTimers[event]);
    }

    this.debounceTimers[event] = setTimeout(() => {
      this.emit(event, ...args);
      delete this.debounceTimers[event];
    }, delay);
  }
}

export const guestBookEmitter = new EventEmitter();
