import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public searchText: string = '';

  constructor(private _userservice: UserService) { }
  ngOnInit(): void {

  }
  search(event: any) {  // Add an event parameter to the method
    // event.preventDefault();
    // this._userservice.dataemit(this.searchText);
    // this._userservice.setSearchText(this.searchText);
    this.searchText = (event.target as HTMLInputElement).value
    console.log(this.searchText);
    this._userservice.search.next(this.searchText);
  }
}
