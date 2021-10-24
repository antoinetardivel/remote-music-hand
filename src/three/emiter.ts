export default class MyEventEmitter {
  private _events: any;
  constructor() {
    this._events = {};
  }

  on(name: any, listener: any) {
    if (!this._events[name]) {
      this._events[name] = [];
    }

    this._events[name].push(listener);
  }

  removeListener(name: any, listenerToRemove: any) {
    if (!this._events[name]) {
      throw new Error(
        `Can't remove a listener. Event "${name}" doesn't exits.`
      );
    }

    const filterListeners = (listener: any) => listener !== listenerToRemove;

    this._events[name] = this._events[name].filter(filterListeners);
  }

  emit(name: any, data: any) {
    if (!this._events[name]) {
      //throw new Error(`Can't emit an event. Event "${name}" doesn't exits.`);
    }

    const fireCallbacks = (callback: any) => {
      callback(data);
    };

    if (this._events[name]) {
      this._events[name].forEach(fireCallbacks);
    }
  }
}
