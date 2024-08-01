import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() public avatar!: string;
  @Input() public first_name!: string;
  @Input() public last_name!: string;
  @Input() public email!: string;
  @Input() public id!: string | number;

  constructor(private router: Router, private _userservice: UserService) { }

  ngOnInit(): void { }

  onNavigateToSong() {
    // this._userservice.songData.next();
    this.router.navigateByUrl(`/id/${this.id}`, {
      state: {
        avatar: this.avatar,
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        _id: this.id,
      },
    });
  }
}
