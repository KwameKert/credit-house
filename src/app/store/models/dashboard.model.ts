import { Widget } from '../../core/models/dashboard/dashboard.model';

export interface DashboardState {
  gender: Widget[];
  sector: Widget[];
  inactive: number;
  active: number;
  education: Widget[];
}
