import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-systemAdmin',
  templateUrl: './systemAdmin.component.html',
  styleUrls: ['./systemAdmin.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class SystemAdminComponent implements OnInit {
  users: User[];

  displayedColumns: string[] = ['fullName', 'editorType', 'status', 'lastEnter', 'scalesCount'];
  expandedElement: User | null;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'];
    })
  }

  /*
  loadUsers() {
    this.userService.getUsers(). subscribe((users: User[]) => {
      this.users = users;
      console.log(users);
      //this.dataSource = users;
    }, error => {
      console.log(error);
    });
  }
  */
}
