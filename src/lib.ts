import axios, {AxiosInstance} from 'axios';
import {
  ActiveScheduledMaintenances,
  AllIncidents,
  AllScheduledMaintenances,
  PageComponents,
  PageStatus,
  Summary,
  UnresolvedIncidents,
  UpcomingScheduledMaintenances,
} from './types';

/**
 * The main statuspage.io API library
 *
 * This class contains methods for fetching data from
 * all documented statuspage.io endpoints.
 *
 * ```ts
 * const s = new Statuspage('abc123');
 *
 * const summary = await s.summary();
 * const status = await s.status();
 * ```
 */
export class Statuspage {
  /**
   * configured axios instance
   * @internal
   */
  private axios: AxiosInstance;

  constructor(public id: string) {
    this.axios = axios.create({
      baseURL: `https://${this.id}.statuspage.io/api/v2`,
      transformResponse(res) {
        return JSON.parse(res, (_k: string, v: string | number) => {
          const dateFormat = /^(\d{4})(-(\d{2}))??(-(\d{2}))??(T(\d{2}):(\d{2})(:(\d{2}))??(\.(\d+))??(([+-]{1}\d{2}:\d{2})|Z)??)??$/;

          if (typeof v === 'string' && dateFormat.test(v)) {
            return new Date(v);
          }

          return v;
        });
      },
    });
  }

  /**
   * Get a summary of the status page, including a status indicator
   * component statuses, unresolved incidents and any upcoming or
   * in-progress scheduled maintenances.
   * @return API response
   */
  async summary(): Promise<Summary> {
    return this._makeRequest<Summary>('/summary.json');
  }

  /**
   * Get the status rollup for the whole page. This endpoint includes
   * an indicator - on of *none*, *minor*, *major* or *critical* as well as
   * a human description of the blended component status.
   * @return API response
   */
  async status(): Promise<PageStatus> {
    return this._makeRequest<PageStatus>('/status.json');
  }

  /**
   * Get the components for the page. Each component is listed along with its
   * status - one of *operational, degraded_performance, partial_outage* or *major_outage*
   * @return API response
   */
  async components(): Promise<PageComponents> {
    return this._makeRequest<PageComponents>('/components.json');
  }

  /**
   * Get a list of the 50 most recent incidents. This includes all unresolved
   * incidents, as well as those in the *Resolved* and *Postmortem* state.
   * @return API response
   */
  async allIncidents(): Promise<AllIncidents> {
    return this._makeRequest<AllIncidents>('/incidents.json');
  }

  /**
   * Get a list of any unresolved incidents. This endpoint will only return
   * incidents in the *investigating*, *identified* or *monitoring* state.
   * @return API response
   */
  async unresolvedIncidents(): Promise<UnresolvedIncidents> {
    return this._makeRequest<UnresolvedIncidents>('/incidents/unresolved.json');
  }

  /**
   * Get a list of the 50 most recent scheduled maintenances. This includes
   * active and upcoming maintenances, as well as those in the *completed* state.
   * @return API response
   */
  async allScheduledMaintenances(): Promise<AllScheduledMaintenances> {
    return this._makeRequest<AllScheduledMaintenances>(
      '/scheduled-maintenances.json'
    );
  }

  /**
   * Get a list of any active maintenances. This endpoint will only return
   * scheduled maintenances in the *in progress* or *verifying* state.
   * @return API response
   */
  async activeScheduledMaintenances(): Promise<ActiveScheduledMaintenances> {
    return this._makeRequest<ActiveScheduledMaintenances>(
      '/scheduled-maintenances/active.json'
    );
  }

  /**
   * Get a list of any upcoming maintenances. This endpoint will only return
   * scheduled maintenances in the *scheduled* state.
   * @return API response
   */
  async upcomingScheduledMaintenances(): Promise<UpcomingScheduledMaintenances> {
    return this._makeRequest<UpcomingScheduledMaintenances>(
      '/scheduled-maintenances/upcoming.json'
    );
  }

  /**
   * Make a request to a statuspage.io endpoint.
   * @internal
   * @return Parsed JSON response
   */
  private async _makeRequest<T>(endpoint: string): Promise<T> {
    return this.axios.get(endpoint).then(res => res.data);
  }
}
