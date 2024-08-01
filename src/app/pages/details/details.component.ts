import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  user: any;
  id: any;
  constructor(private _userservice: UserService,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService) {
    this.id = this.route.snapshot.paramMap.get("id")
  }

  ngOnInit(): void {
    this.getUsersById()
  }

  getUsersById() {
    this.spinner.show();
    this._userservice.getUserById(this.id).subscribe((res: any) => {
      this.user = res;
      this.user = this.user.data;

      this.spinner.hide();
    }, error => {
      this.toaster.error(error.error)
      this.spinner.hide();
    })
  }
}
