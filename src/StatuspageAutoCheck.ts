import {EventEmitter} from 'events';
import {Statuspage} from './lib';
import {FixedLengthQueue} from './FixedLengthQueue';
import {AllIncidents, IncidentUpdates} from './types';

// TODO: give emitted values a type
// TODO: make `INCIDENT_UPDATE` and `INCIDENT_CREATE` events

/** Emit an event when the status page is updated */
export class StatuspageAutoCheck extends EventEmitter {
  /** Handles all of the API requests that will be made */
  private s: Statuspage;

  /**
   * Updates are saved here after being emitted. It is used to
   * prevent updates from being emitted multiple times because
   * sometimes that happens for some reason :thonk:
   *
   * The only reason it is a FixedLengthQueue instead of an array
   * is because i dont care about entries after a certain point.
   * Most incidents only have 5 or 6 updates before being resolved,
   * so 50 should be way more than enough.
   */
  public emitted = new FixedLengthQueue<IncidentUpdates>(50);

  /** The current status page status */
  public curr?: AllIncidents;
  /** The previous status page status */
  public prev?: AllIncidents;

  /** Timer for automatic update checks */
  private timer?: NodeJS.Timeout;

  constructor(public id: string, public interval = 30_000) {
    super();

    this.s = new Statuspage(id);

    this.fetch();
  }

  /**
   * Check for updates. Emits am `INCIDENT_UPDATE` event if
   * the status page has been updated.
   * @return returns true if the status page has been updated.
   */
  checkUpdate(): boolean {
    if (!(this.curr?.incidents.length && this.prev?.incidents.length)) {
      return false;
    }

    const {
      id: rID,
      updated_at: rUpdatedAt,
    } = this.curr?.incidents[0].incident_updates[0];

    const {
      id: pID,
      updated_at: pUpdatedAt,
    } = this.prev?.incidents[0].incident_updates[0];

    if (!(rID && rUpdatedAt && pID && pUpdatedAt)) {
      return false;
    }

    if (
      rID !== pID &&
      this.emitted.every(i => i.id !== rID) &&
      rUpdatedAt > pUpdatedAt
    ) {
      super.emit('INCIDENT_UPDATE', this.curr);
      this.emitted.push(this.curr.incidents[0].incident_updates[0]);

      return true;
    }

    return false;
  }

  /** Start checking for updates */
  async run() {
    super.emit('START', {time: new Date()});

    const r = async () => {
      await this.fetch();
      this.checkUpdate();

      super.emit('RUN', {time: new Date()});
    };

    r();
    this.timer = setInterval(r, this.interval);
  }

  /**
   * Stop automatically checking for updates.
   * Calling `StatuspageAutoCheck#run` again will restart the timer.
   * @return Stop success
   */
  stop(): boolean {
    if (this.timer) {
      clearInterval(this.timer);
      super.emit('STOPPED', {time: new Date()});

      return true;
    }

    return false;
  }

  /**
   * Fetch remote data and assign it to a local variable.
   * @return API response
   */
  async fetch() {
    this.prev = this.curr;
    this.curr = await this.s.allIncidents();

    return this.prev;
  }
}
