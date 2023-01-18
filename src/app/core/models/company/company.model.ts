export interface Company {
  id?: string;
  name?: string;
  code?: string;
  institutionType?: string;
  status?: string;
  createdOn?: any;
  updatedOn?: any;
}

export interface CompanyCreate {
  name: string;
  code: string;
  institutionType: string;
  status: string;
}

export interface CompanyPage {
  companies: Company[];
  total: number;
}
