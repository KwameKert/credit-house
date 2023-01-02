import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FileUploadModel } from './file-upload.model';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  fileName = '';
  title = '';
  description = '';
  file!: File;
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FileUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FileUploadModel
  ) {}

  ngOnInit(): void {
    this.title = this.data.title;
    this.description = this.data.description
  }

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
