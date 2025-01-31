import { Component, inject } from '@angular/core';
import { IUser } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { UserCardComponent } from "../../components/user-card/user-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  usuarios:IUser[];

  userService = inject(UserService);

  constructor() {
    this.usuarios = [];
  }

  ngOnInit(){
    this.usuarios = this.userService.getAll();
  }
}
