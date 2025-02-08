import { Component, Input } from '@angular/core';
import { User } from '../../interfaces/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
eliminarUsuario(arg0: number) {
throw new Error('Method not implemented.');
}
  
   // Recibe un usuario como propiedad
  @Input() usuario!: User;

}
