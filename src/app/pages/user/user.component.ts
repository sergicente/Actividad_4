import { Component, inject } from '@angular/core';
import { IUser } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
eliminarUsuario() {
throw new Error('Method not implemented.');
}
volverAlListado() {
throw new Error('Method not implemented.');
}

  usuario!: IUser;

  userService = inject(UserService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      let id = parseInt(params['id'], 10); // Convertir a número
      let response = this.userService.getById(id);
      if (response != undefined) {
        this.usuario = response;
      } else {
        this.router.navigate(['/']);
      }
    })


  }

}