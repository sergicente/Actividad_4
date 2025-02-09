import { Component, inject, Input } from '@angular/core';
import { User } from '../../interfaces/user';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {




  // Recibe un usuario como propiedad
  @Input() usuario!: User;
  @Input() parent: string;
  router = inject(Router);
  userService = inject(UserService);


  constructor() {
    this.parent = "";
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
