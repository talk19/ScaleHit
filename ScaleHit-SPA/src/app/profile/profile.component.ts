import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  Inject,
} from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { ChangePasswordComponent } from './changePassword/changePassword.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  @ViewChild('editForm', { static: true }) editForm: NgForm;
  user: User;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    // get data from route = get data from resolver
    this.route.data.subscribe((data) => {
      this.user = data['user'];
    });
  }

  updateUser() {
    this.userService
      .updateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(
        (next) => {
          this.editForm.reset(this.user);
          console.log('userUpdated');
        },
        (error) => {
          console.log(error);
        }
      );
  }


  openModal() {
    const dialogRef = this.dialog.open(ChangePasswordComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result !== undefined) {
        this.authService
          .updatePassword(this.authService.decodedToken.nameid, result)
          .subscribe(
            (next) => {
              console.log('passwordChanged');
            },
            (error) => {
              console.log(error);
            }
          );
        // const userId = this.authService.decodedToken.nameid;
        // this.scaleService.deleteScale(userId, this.currentScale.id).subscribe(() => {
        //   this.scales.splice(this.scales.findIndex(s => s.id === id), 1);
        //   this.scalesTable.renderRows();
        // }, error => {
        //   console.log(error);
        // } );
      }
    });
  }
}
