import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import {
  BehaviorSubject,
  last,
  map,
  merge,
  Observable,
  shareReplay,
  switchMap,
  takeLast,
} from 'rxjs';
import { UserModel } from 'src/app/modules/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  displayedColumns: string[] = [
    'index',
    'avatar',
    'fullName',
    'phoneNumber',
    'email',
    'isAdmin',
    'createdAt',
  ];
  usersSubject: BehaviorSubject<Array<UserModel>>;
  userSubject: BehaviorSubject<UserModel>;
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    this.usersSubject = new BehaviorSubject<Array<UserModel>>([]);
    this.userSubject = new BehaviorSubject<UserModel>(new UserModel());
    this.usersSubject.asObservable().subscribe((users: Array<UserModel>) => {
      if (users.length > 0) this.getUser(users[0]._id);
    });
    const merged = merge(this.usersSubject, this.userSubject);

    merged.subscribe((data) => {
      console.log(data);
    });
  }
  ngOnInit(): void {}
  login() {
    this.authService
      .login({
        email: 'ledatumltk123@gmail.com',
        password: '123',
      })
      .subscribe(
        (res) => {},
        (err) => {
          console.log(err);
        }
      );
  }
  logout() {
    this.authService.logout();
  }
  getUsers() {
    this.userService.getAll({ name: '', status: 0 }).subscribe(
      (res: any) => {
        let data: Array<UserModel> = res.map((x: UserModel, i: number) => {
          x.index = i + 1;
          return new UserModel(x);
        });
        this.usersSubject.next(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getUser(id: string) {
    this.userService.getUserById(id).subscribe(
      (res: any) => {
        this.userSubject.next(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
