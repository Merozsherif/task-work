import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import * as Aos from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchKey: string = '';
  isLoading = false;

  constructor(
    private _userservice: UserService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.setupSearchSubscription();
    Aos.init();
  }

  setupSearchSubscription() {
    this.isLoading = true;
    this.spinner.show();
    this._userservice.search.subscribe({
      next: (res: any) => {
        this.searchKey = res;
        this.filterUsers();
        this.spinner.hide();
        this.isLoading = false;
      },
      error: (error) => {
        this.toaster.error(error.error);
        this.spinner.hide();
        this.isLoading = false;
      }
    });
  }

  getUsers() {
    this.spinner.show();
    this._userservice.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res?.data || [];
        this.filterUsers();
        this.spinner.hide();
      },
      error: (error) => {
        this.toaster.error(error.error);
        this.spinner.hide();
      }
    });
  }

  filterUsers() {
    if (this.searchKey) {
      this.filteredUsers = this.users.filter(user =>
        user.first_name.toLowerCase().includes(this.searchKey.toLowerCase()) ||
        user.last_name.toLowerCase().includes(this.searchKey.toLowerCase())
      );
    } else {
      this.filteredUsers = this.users;
    }
  }
}
