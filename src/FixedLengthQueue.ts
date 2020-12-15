/* eslint-disable no-cond-assign */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Class representing a fifo queue with a fixed length
 *
 * Once it reaches capacity, elements at the front of the
 * array are dropped to make room for new elements.
 */
export class FixedLengthQueue<T> extends Array<T> {
  constructor(private maxLength: number) {
    super();

    // throw an error if you try to access or set a value
    // with an index greater than the max length.
    return new Proxy(this, {
      get(target, prop) {
        let num;
        if ((num = Number(prop)) && num >= target.maxLength) {
          throw new RangeError('Value exceeds maximum queue length');
        }

        return target[prop as any];
      },

      set(target, prop, value): boolean {
        let num;
        if ((num = Number(prop)) && num >= target.maxLength) {
          throw new RangeError('Value exceeds maximum queue length');
        }

        return (target[prop as any] = value);
      },
    });
  }

  /**
   * Add to the queue. If the new length exceeds the max length,
   * old items are removed.
   * @param {...T} args - Args to add to the queue
   * @return {number} New queue length
   */
  push(...args: T[]): number {
    for (const arg of args) {
      if (this.length >= this.maxLength) {
        this.shift();
      }

      super.push(arg);
    }

    return this.length;
  }

  /**
   * Turn the queue into an array
   * @return {Array<T>} - The queue as an array
   */
  toArray(): Array<T> {
    return [...this];
  }
}
