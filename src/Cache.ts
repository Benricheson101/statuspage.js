/* eslint-disable no-cond-assign */
/* eslint-disable @typescript-eslint/no-explicit-any */

// TODO: add, get methods

/**
 * LRU Cache
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
          throw new RangeError('Value exceeds maximum cache size');
        }

        return target[prop as any];
      },

      set(target, prop, value): boolean {
        let num;
        if ((num = Number(prop)) && num >= target.size) {
          throw new RangeError('Value exceeds maximum cache size');
        }

        return (target[prop as any] = value);
      },
    });
  }

  /**
   * Add to the cache. If the new length exceeds the max length,
   * old items are removed.
   * @param args Args to add to the cache
   * @return New cache length
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

  /** Turn the cache into an array */
  toArray(): Array<T> {
    return [...this];
  }
}
