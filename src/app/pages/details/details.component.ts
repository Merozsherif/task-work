import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import * as Aos from 'aos';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'] // Corrected: styleUrl to styleUrls
})
export class DetailsComponent implements OnInit {
  user: any = {}; // Initialize user as an empty object
  id: string | null;
  isLoading = false;
  constructor(
    private _userservice: UserService,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.id = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.getUsersById();
    Aos.init();
  }

  getUsersById() {
    if (this.id) { // Ensure id is not null
      this.isLoading = true;
      this.spinner.show();
      this._userservice.getUserById(this.id).subscribe({
        next: (res: any) => {
          this.user = res?.data || {}; // Use optional chaining and provide a fallback
          this.spinner.hide();
          this.isLoading = false;
        },
        error: (error) => {
          this.toaster.error(error.error);
          this.spinner.hide();
        }
      });
    } else {
      this.toaster.error('User ID not found');
    }
  }
}





// import { Component, OnInit } from '@angular/core';
// import { UserService } from '../../service/user.service';
// import { ActivatedRoute } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { NgxSpinnerService } from 'ngx-spinner';

// @Component({
//   selector: 'app-details',
//   templateUrl: './details.component.html',
//   styleUrl: './details.component.scss'
// })
// export class DetailsComponent implements OnInit {
//   user: any;
//   id: any;
//   constructor(private _userservice: UserService,
//     private route: ActivatedRoute,
//     private toaster: ToastrService,
//     private spinner: NgxSpinnerService) {
//     this.id = this.route.snapshot.paramMap.get("id")
//   }

//   ngOnInit(): void {
//     this.getUsersById()
//   }

//   getUsersById() {
//     this.spinner.show();
//     this._userservice.getUserById(this.id).subscribe((res: any) => {
//       this.user = res;
//       this.user = this.user.data;

//       this.spinner.hide();
//     }, error => {
//       this.toaster.error(error.error)
//       this.spinner.hide();
//     })
//   }
// }
