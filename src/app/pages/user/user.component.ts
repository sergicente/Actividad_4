import { Component, inject } from '@angular/core';
import { User } from '../../interfaces/user';
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


  usuario!: User;
  userService = inject(UserService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      const _id: string = params._id;
  
      this.userService.getById(_id).subscribe({
        next: (usuario: User) => {
          this.usuario = usuario;
        },
        error: (e) => {
          console.error('Error al obtener el usuario:', e);
          this.router.navigate(['/']);
        }
      });
    });
  }

  eliminarUsuario() {
    throw new Error('Method not implemented.');
    }
    volverAlListado() {
    throw new Error('Method not implemented.');
    }

}