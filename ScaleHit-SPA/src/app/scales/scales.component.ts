import { Component, OnInit, ViewChild } from '@angular/core';
import { Scale } from '../_models/scale';
import { ActivatedRoute } from '@angular/router';
import { ScaleService } from '../_services/scale.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteMessageComponent } from '../deleteMessage/deleteMessage.component';
import { AuthService } from '../_services/auth.service';
import { MatTableModule, MatTable } from '@angular/material/table';

@Component({
  selector: 'app-scales',
  templateUrl: './scales.component.html',
  styleUrls: ['./scales.component.css'],
})
export class ScalesComponent implements OnInit {
  // @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  // @ViewChild('scalesTable') scalesTable: MatTableModule;
  @ViewChild(MatTable, {static: true}) scalesTable: MatTable<any>;

  scales: Scale[];
  displayedColumns: string[] = [
    'scaleTitle',
    'scaleCode',
    'scaleStatus',
    'scalefinished',
    'scaleDates',
    'editBtns',
  ];
  currectClass = '';
  menuOpen = false;
  currentScale: Scale;

  // animal: string;
  // name: string;

  constructor(
    private route: ActivatedRoute,
    private scaleService: ScaleService,
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.scales = data['scales'];
    });
  }

  menuOpened() {
    // this.isHover = true;
    console.log('open');
    this.menuOpen = true;
  }

  menuClosed() {
    // this.isHover = false;

    console.log('close');
    this.menuOpen = false;
    this.currectClass = '';
  }
  showBtn(e) {
    this.currectClass = e.id;
  }

  hideBtns() {
    if (!this.menuOpen) {
      this.currectClass = '';
    }
  }

  // deleteScale(id: number) {}

  openDialog(id: number): void {
    this.currentScale = this.scales.filter((s) => s.id === id)[0];

    const dialogRef = this.dialog.open(DeleteMessageComponent, {
      data: {
        title: 'מחיקת פעילות',
        content: [
          'בחרת למחוק את הפעילות "' +
            this.currentScale.scaleTitle +
            '" ביחד עם כל התוכן שלה.',
          'לאחר המחיקה לא תהיה אפשרות לשחזר את הפעילות או התוכן.',
        ],
        confirmText: 'מחיקת פעילות',
        cancelText: 'ביטול',
        scaleId: this.currentScale.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const userId = this.authService.decodedToken.nameid;
        this.scaleService.deleteScale(userId, this.currentScale.id).subscribe(() => {
          this.scales.splice(this.scales.findIndex(s => s.id === id), 1);
          this.scalesTable.renderRows();
        }, error => {
          console.log(error);
        } );
      }
    });
  }
}
