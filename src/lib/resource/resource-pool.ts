export class ResourcePool<T> {
  private available: T[] = [];
  private inUse: Set<T> = new Set();

  constructor(private factory: () => T, private initialSize: number = 5) {
    this.initialize();
  }

  private initialize(): void {
    for (let i = 0; i < this.initialSize; i++) {
      this.available.push(this.factory());
    }
  }

  async acquire(): Promise<T> {
    if (this.available.length === 0) {
      this.available.push(this.factory());
    }
    
    const resource = this.available.pop()!;
    this.inUse.add(resource);
    return resource;
  }

  release(resource: T): void {
    if (this.inUse.has(resource)) {
      this.inUse.delete(resource);
      this.available.push(resource);
    }
  }

  getPoolSize(): number {
    return this.available.length + this.inUse.size;
  }

  clear(): void {
    this.available = [];
    this.inUse.clear();
  }
}