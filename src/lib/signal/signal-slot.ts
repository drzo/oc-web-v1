type Listener<T> = (data: T) => void;

export class Signal<T> {
  private listeners: Set<Listener<T>> = new Set();

  connect(listener: Listener<T>): () => void {
    this.listeners.add(listener);
    return () => this.disconnect(listener);
  }

  disconnect(listener: Listener<T>): void {
    this.listeners.delete(listener);
  }

  emit(data: T): void {
    this.listeners.forEach(listener => listener(data));
  }

  clear(): void {
    this.listeners.clear();
  }
}

export function createSignal<T>(): [Signal<T>, (data: T) => void] {
  const signal = new Signal<T>();
  const emit = (data: T) => signal.emit(data);
  return [signal, emit];
}