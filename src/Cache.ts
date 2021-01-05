/* eslint-disable no-cond-assign */
/* eslint-disable @typescript-eslint/no-explicit-any */

// TODO: add, get methods

/**
 * Class representing a lru cache with a fixed length
 *
 * Once it reaches capacity, elements at the front of the
 * array are dropped to make room for new elements.
 */
export class Cache<T> extends Array<T> {
  constructor(private size: number) {
    super();

    // throw an error if you try to access or set a value
    // with an index greater than the max length.
    return new Proxy(this, {
      get(target, prop) {
        let num;
        if ((num = Number(prop)) && num >= target.size) {
          throw new RangeError('Value exceeds maximum queue length');
        }

        return target[prop as any];
      },

      set(target, prop, value): boolean {
        let num;
        if ((num = Number(prop)) && num >= target.size) {
          throw new RangeError('Value exceeds maximum queue length');
        }

        return (target[prop as any] = value);
      },
    });
  }

  /**
   * Add to the queue. If the new length exceeds the max length,
   * old items are removed.
   * @param args Args to add to the queue
   * @return New queue length
   */
  push(...args: T[]): number {
    for (const arg of args) {
      if (this.length >= this.size) {
        this.shift();
      }

      super.push(arg);
    }

    return this.length;
  }

  /**
   * Add an item to the queue
   * @param item The item to enqueue
   */
  enqueue(item: T) {
    return this.push(item);
  }

  /** Remove the item at the beginning of the queue */
  dequeue(): T | undefined {
    return this.shift();
  }

  /** Get the item at the beginning of the queue without removing it */
  peek(): T | undefined {
    return this[0];
  }

  /** Turn the queue into an array */
  toArray(): Array<T> {
    return [...this];
  }
}
