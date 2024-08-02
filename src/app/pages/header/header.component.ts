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
  search(event: any) {
    // Add an event parameter to the method
    this.searchText = (event.target as HTMLInputElement).value
    this._userservice.search.next(this.searchText);
  }
}
