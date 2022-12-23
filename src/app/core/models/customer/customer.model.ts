export interface Customer {
  id?: string;
  customerId?: string;
  customerName?: string;
  phoneNumber?: string;
  idType?: string;
  idNumber?: string;
  dateOfBirth?: string;
  educationalLevel?: string;
  gender?: string;
  maritalStatus?: string;
  createdTime?: string;
  companyCode?: string;
}

export interface CustomersPage {
  customers: Customer[];
  total: number;
}
