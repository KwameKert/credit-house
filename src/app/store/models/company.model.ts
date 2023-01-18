import { Company } from '../../core/models/company/company.model';
import { Pagination } from 'src/app/shared/components/generic-table/generc-table.model';

export interface CompanyState {
  pagination: Pagination;
  companies: Company[];
  company?: Company;
  companyTotal: number;
}
