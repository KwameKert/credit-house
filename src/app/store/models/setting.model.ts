import { Issue } from '../../core/models/setting/issue.model';
export interface SettingState {
  issues: Issue[];
  issuesTotal: number;
}
