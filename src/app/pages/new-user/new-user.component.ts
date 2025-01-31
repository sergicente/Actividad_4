import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {

  submitted = false; // Se activa cuando el usuario presiona el botón "Guardar"
  modelForm: FormGroup;
  router = inject(Router);

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
      confirm_password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    }, { validators: this.passwordsMatch, updateOn: 'blur' });
  }

  // Método para comprobar si un campo tiene un error
  checkControl(formControlName: string, validador: string): boolean | undefined {
    return this.modelForm.get(formControlName)?.hasError(validador) && this.modelForm.get(formControlName)?.touched;
  }

// Validación para comprobar si las contraseñas coinciden
passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value || '';
  const confirmPassword = group.get('confirm_password')?.value || '';
  return password && confirmPassword && password !== confirmPassword ? { mustMatch: true } : null;
}

mostrarAlertErrores(): boolean {
  return Object.keys(this.modelForm.controls).some(campo => {
    const control = this.modelForm.get(campo);
    return control?.invalid && (control.dirty || control.touched);
  }) || (this.modelForm.errors?.['mustMatch'] && this.modelForm.get('confirm_password')?.touched);
}


  guardar() {
    this.submitted = true; // Activa el estado de "intentado enviar"
    this.modelForm.markAllAsTouched();

    if (this.modelForm.invalid) {
      return;
    }
    this.router.navigate(['/home']);
  }

}
