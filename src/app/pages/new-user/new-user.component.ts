import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {


  modelForm: FormGroup;

  // Constructor donde se inicializa el formulario reactivo y definimos las validaciones de los campos.
  constructor() {
    this.modelForm = new FormGroup({
      first_name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      last_name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      image: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)([\/\w\-._~:?#[\]@!$&'()*+,;=]*)?$/)
      ]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirm_password: new FormControl(null, [Validators.required])
    }, { validators: this.passwordsMatch });
  }

  // Método para comprobar si un campo tiene un error
  checkControl(formControlName: string, validador: string): boolean | undefined{
    return this.modelForm.get(formControlName)?.hasError(validador) && this.modelForm.get(formControlName)?.touched;
  }

  // Validación simple dentro del mismo componente
  passwordsMatch(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirm_password')?.value;
    return password === confirmPassword ? null : { mustMatch: true };
  }

  eliminar() {
    this.modelForm.reset();}


guardar() {
throw new Error('Method not implemented.');
}





}
