import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import { UserService } from '../_services';

@Component({ templateUrl: 'admin.component.html' })
export class AdminComponent implements OnInit {
  loading = false;
  users: User[] = [];
  usersMode$;
  constructor(private userService: UserService, private http: HttpClient) {}

  ngOnInit() {
    this.loading = true;
    this.userService
      .getAll()
      .pipe(first())
      .subscribe((users) => {
        this.loading = false;
        this.users = users;
      });
  }
  loadUsers() {
    // this.userService
    //   .loadUsers()
    //   .pipe(first())
    //   .subscribe((users) => {
    //     this.loading = false;
    //     this.usersMode$ = users;
    // console.log('testttt', users);
    //   });
    this.http
      .get('/assets/header.json')
      .subscribe((data) => (this.usersMode$ = data));
  }
}
