// WebAssembly implementation of thread-safe queue
export class ThreadSafeQueue<T> {
  private queue: T[] = [];
  private lock = new Int32Array(new SharedArrayBuffer(4));

  constructor() {
    if (!crossOriginIsolated) {
      console.warn('SharedArrayBuffer requires cross-origin isolation');
    }
  }

  async enqueue(item: T): Promise<void> {
    while (Atomics.compareExchange(this.lock, 0, 0, 1) !== 0) {
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    
    try {
      this.queue.push(item);
    } finally {
      Atomics.store(this.lock, 0, 0);
    }
  }

  async dequeue(): Promise<T | undefined> {
    while (Atomics.compareExchange(this.lock, 0, 0, 1) !== 0) {
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    
    try {
      return this.queue.shift();
    } finally {
      Atomics.store(this.lock, 0, 0);
    }
  }

  async peek(): Promise<T | undefined> {
    while (Atomics.compareExchange(this.lock, 0, 0, 1) !== 0) {
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    
    try {
      return this.queue[0];
    } finally {
      Atomics.store(this.lock, 0, 0);
    }
  }

  async size(): Promise<number> {
    while (Atomics.compareExchange(this.lock, 0, 0, 1) !== 0) {
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    
    try {
      return this.queue.length;
    } finally {
      Atomics.store(this.lock, 0, 0);
    }
  }
}