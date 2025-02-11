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

}
