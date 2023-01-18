export interface Issue {
  id: string;
  errorMessage: string;
  uploadType: string;
  createdOn: Date;
}

export interface IssuePage {
  issues: Issue[];
  total: number;
}
