import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

  submitted = false;
  modelForm: FormGroup;
  router = inject(Router);

  @Input() usuario: User = { _id: '', first_name: '', last_name: '', email: '', username: '', image: '', password: '' };
  @Output() formSubmitted = new EventEmitter<User>();

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usuario'] && changes['usuario'].currentValue) {
      this.modelForm.patchValue(this.usuario);  // Prellenar el formulario con el usuario
    }
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
