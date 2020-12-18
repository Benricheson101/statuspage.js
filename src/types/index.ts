export type ValueOf<T> = T[keyof T];

//
// Base lib
//

/** Component status indicators */
export type Indicator = 'none' | 'minor' | 'major' | 'critical';

/** Incident statuses */
export type IncidentStatus =
  | 'investigating'
  | 'identified'
  | 'monitoring'
  | 'resolved'
  | 'postmortem';

/** Component statuses */
export type ComponentStatus =
  | 'operational'
  | 'degraded_performance'
  | 'partial_outage'
  | 'major_outage';

/**
 * Basic info about the statuspage.
 *
 * All responses include this.
 */
export interface Page {
  id: string;
  name: string;
  url: String;
  updated_at: Date;
}

export interface PageStatusInfo {
  description: string;
  indicator: Indicator;
}

export interface Component {
  created_at: Date;
  description: string | null;
  id: string;
  page_id: string;
  position: number;
  status: string;
  updated_at: Date;
}

export interface Incident {
  created_at: Date;
  id: string;
  impact: Indicator;
  monitoring_at: Date | null;
  name: string;
  page_id: string;
  resolved_at: Date | null;
  shortlink: string;
  status: IncidentStatus;
  updated_at: Date;
  incident_updates: IncidentUpdates[];
}

export interface IncidentUpdates {
  body: string;
  created_at: Date;
  display_at: Date;
  updated_at: Date;
  id: string;
  incident_id: string;
  status: IncidentStatus;
}

export interface ScheduledMaintenance extends Incident {
  scheduled_for: Date;
  scheduled_until: Date;
}

//
// -- api endpoint responses --
//

/** Base response type that all other responses are derived from */
export interface Response {
  page: Page;
}

export interface Summary extends Response {
  status: PageStatusInfo;
  components?: Component[];
  incidents?: Incident[];
  scheduled_maintenances?: ScheduledMaintenance[];
}

export interface PageStatus extends Response {
  status: PageStatusInfo;
}

export interface PageComponents extends Response {
  components: Component[];
}

export interface AllIncidents extends Response {
  incidents: Incident[];
}

export interface UnresolvedIncidents extends Response {
  incidents: Incident[];
}

export interface AllScheduledMaintenances extends Response {
  scheduled_maintenances: ScheduledMaintenance[];
}

export interface ActiveScheduledMaintenances extends Response {
  scheduled_maintenances: ScheduledMaintenance[];
}

export interface UpcomingScheduledMaintenances extends Response {
  scheduled_maintenances: ScheduledMaintenance[];
}

//
// StatuspageUpdates
//

export interface PollingState {
  state: 'started' | 'running' | 'stopped';
  time: Date;
}
