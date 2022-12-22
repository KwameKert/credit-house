import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-customer-upload',
  templateUrl: './customer-upload.component.html',
  styleUrls: ['./customer-upload.component.scss'],
})
export class CustomerUploadComponent implements OnInit {
  fileName = '';
  file!: File;
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CustomerUploadComponent>
  ) {}

  ngOnInit(): void {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      this.file = file;
    }
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.file);

    this.dialogRef.close(formData);
  }
}
