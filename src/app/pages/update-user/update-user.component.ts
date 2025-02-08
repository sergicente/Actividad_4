import { Component, inject } from '@angular/core';
import { UserFormComponent } from "../../components/user-form/user-form.component";
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {
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
}
