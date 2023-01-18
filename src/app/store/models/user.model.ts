import { User } from 'src/app/core/models/user/user.model';
import { Pagination } from 'src/app/shared/components/generic-table/generc-table.model';

export interface UserState {
  users: User[];
  userTotal: number;
  pagination: Pagination;
}
