import { Component, inject } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';


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

  confirmarBorrar(): void {
    Swal.fire({
      text: `¿Eliminarar a ${this.usuario.first_name} ${this.usuario.last_name}?`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: '<i class="fa-regular fa-trash-can me-1"></i> Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarUsuario();
      }
    });
  }

  eliminarUsuario(): void {
    this.userService.eliminarUsuario(this.usuario._id).subscribe((response: any) => {
      console.log('Respuesta de la API:', response);
      this.toast.fire({
        icon: 'success',
        title: `El usuario ha sido eliminado`
      });
      this.router.navigate(['/home']);
    });
  }

  toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

}