import { Component, inject } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { UserCardComponent } from "../../components/user-card/user-card.component";
import { ApiResponse } from '../../interfaces/api-response';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  usuarios:User[];

  userService = inject(UserService);

  constructor() {
    this.usuarios = [];
  }

  ngOnInit(): void {
    this.userService.getAllWithObservable().subscribe((data: ApiResponse) => {
      this.usuarios = data.results;
    });
  }
}
