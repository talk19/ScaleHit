import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string;
  content: string[];
  confirmText: string;
  cancelText: string;
  scaleId: number;
}

@Component({
  selector: 'app-deleteMessage',
  templateUrl: './deleteMessage.component.html',
  styleUrls: ['./deleteMessage.component.css']
})

export class DeleteMessageComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteMessageComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
