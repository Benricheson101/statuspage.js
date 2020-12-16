export type ValueOf<T> = T[keyof T];

//
// Base lib
//
export type Indicator = 'none' | 'minor' | 'major' | 'critical';

export type IncidentStatus =
  | 'investigating'
  | 'identified'
  | 'monitoring'
  | 'resolved'
  | 'postmortem';

export type ComponentStatus =
  | 'operational'
  | 'degraded_performance'
  | 'partial_outage'
  | 'major_outage';

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

export interface Summary {
  page: Page;
  status: PageStatusInfo;
  components?: Component[];
  incidents?: Incident[];
  scheduled_maintenances?: ScheduledMaintenance[];
}

export interface PageStatus {
  page: Page;
  status: PageStatusInfo;
}

export interface PageComponents {
  page: Page;
  components: Component[];
}

export interface AllIncidents {
  page: Page;
  incidents: Incident[];
}

export interface UnresolvedIncidents {
  page: Page;
  incidents: Incident[];
}

export interface AllScheduledMaintenances {
  page: Page;
  scheduled_maintenances: ScheduledMaintenance[];
}

export interface ActiveScheduledMaintenances {
  page: Page;
  scheduled_maintenances: ScheduledMaintenance[];
}

export interface UpcomingScheduledMaintenances {
  page: Page;
  scheduled_maintenances: ScheduledMaintenance[];
}

//
// Auto check thingy
//
