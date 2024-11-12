export class WorkerPool {
  private workers: Worker[] = [];
  private taskQueue: Array<{ task: () => Promise<any>; resolve: (value: any) => void; reject: (error: any) => void }> = [];
  private activeWorkers = 0;

  constructor(private maxWorkers: number = navigator.hardwareConcurrency || 4) {
    this.initialize();
  }

  private initialize() {
    for (let i = 0; i < this.maxWorkers; i++) {
      const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
      worker.onmessage = this.handleWorkerMessage.bind(this);
      worker.onerror = this.handleWorkerError.bind(this);
      this.workers.push(worker);
    }
  }

  private handleWorkerMessage(event: MessageEvent) {
    this.activeWorkers--;
    const task = this.taskQueue.shift();
    if (task) {
      task.resolve(event.data);
    }
    this.processNextTask();
  }

  private handleWorkerError(error: ErrorEvent) {
    this.activeWorkers--;
    const task = this.taskQueue.shift();
    if (task) {
      task.reject(error);
    }
    this.processNextTask();
  }

  private processNextTask() {
    if (this.taskQueue.length > 0 && this.activeWorkers < this.maxWorkers) {
      const task = this.taskQueue[0];
      if (task) {
        this.executeTask(task.task);
      }
    }
  }

  private async executeTask(task: () => Promise<any>) {
    this.activeWorkers++;
    const worker = this.workers[this.activeWorkers % this.maxWorkers];
    worker.postMessage({ task: task.toString() });
  }

  async execute<T>(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.taskQueue.push({ task, resolve, reject });
      if (this.activeWorkers < this.maxWorkers) {
        this.processNextTask();
      }
    });
  }

  terminate() {
    this.workers.forEach(worker => worker.terminate());
    this.workers = [];
    this.taskQueue = [];
    this.activeWorkers = 0;
  }
}