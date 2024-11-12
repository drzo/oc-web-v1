type EventCallback = (...args: any[]) => void;

export class EventBus {
  private static instance: EventBus;
  private subscribers: Map<string, Set<EventCallback>>;

  private constructor() {
    this.subscribers = new Map();
  }

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  subscribe(event: string, callback: EventCallback): () => void {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, new Set());
    }
    
    this.subscribers.get(event)!.add(callback);
    
    return () => this.unsubscribe(event, callback);
  }

  unsubscribe(event: string, callback: EventCallback): void {
    this.subscribers.get(event)?.delete(callback);
  }

  publish(event: string, ...args: any[]): void {
    this.subscribers.get(event)?.forEach(callback => {
      try {
        callback(...args);
      } catch (error) {
        console.error(`Error in event handler for ${event}:`, error);
      }
    });
  }

  clear(): void {
    this.subscribers.clear();
  }
}

export const eventBus = EventBus.getInstance();