import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  users: any;
  searchKey: string = '';
  constructor(private _userservice: UserService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getUsers()

    this._userservice.search.subscribe((res: any) => {
      this.searchKey = res;
    });
  }
  getUsers() {
    this.spinner.show();
    this._userservice.getAllUsers().subscribe((res: any) => {
      this.users = res;
      this.users = this.users.data;
      this.spinner.hide();

    }, error => {
      this.toaster.error(error.error)
      this.spinner.hide();
    })

  }
}
