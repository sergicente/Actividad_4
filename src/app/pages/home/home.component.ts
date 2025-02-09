import { Component, inject } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { UserCardComponent } from "../../components/user-card/user-card.component";
import { ApiResponse } from '../../interfaces/api-response';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserCardComponent, NgxPaginationModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  usuarios: User[];
  paginaActual: number = 1;
  totalPaginas: number = 2;


  userService = inject(UserService);

  constructor() {
    this.usuarios = [];
  }

  ngOnInit(): void {
    this.userService.getAllWithObservable().subscribe((data: ApiResponse) => {
      this.usuarios = data.results;

      const totalUsuarios = data.total;
      const usuariosPorPagina = 9;
      this.totalPaginas = Math.ceil(totalUsuarios / usuariosPorPagina);

    });
  }

}
