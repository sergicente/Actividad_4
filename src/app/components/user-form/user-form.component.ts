import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from '../../interfaces/user';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

  @Input() parent: string;
  mostrarErrores = false;
  modelForm: FormGroup;
  router = inject(Router);
  usuario: User = { _id: '', first_name: '', last_name: '', email: '', username: '', image: '', password: '' };
  userService = inject(UserService);
  activatedRoute = inject(ActivatedRoute);
  toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  // Constructor donde se inicializa el formulario reactivo y definimos las validaciones de los campos.
  constructor() {
    this.parent = '';
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

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      if (params._id) {
        const userResponse = await this.userService.getByIdWithPromises(params._id);
        this.usuario = userResponse;
        this.modelForm = new FormGroup({
          first_name: new FormControl(userResponse.first_name, [Validators.required, Validators.minLength(3)]),
          last_name: new FormControl(userResponse.last_name, [Validators.required, Validators.minLength(3)]),
          username: new FormControl(userResponse.username, [Validators.required, Validators.minLength(3)]),
          email: new FormControl(userResponse.email, [Validators.required, Validators.email]),
          image: new FormControl(userResponse.image, [
            Validators.required,
            Validators.pattern(/^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)([\/\w\-._~:?#[\]@!$&'()*+,;=]*)?$/)
          ])
        }, { updateOn: 'blur' });
      }
    });
  }

  // Método para comprobar si un campo tiene un error
  checkControl(formControlName: string, validador: string): boolean | undefined {
    return this.modelForm.get(formControlName)?.hasError(validador) && this.modelForm.get(formControlName)?.touched;
  }

  // Verifica si las contraseñas coinciden
  passwordsMatch(formulario: AbstractControl): ValidationErrors | null {
    const password = formulario.get('password')?.value;
    const confirmPassword = formulario.get('confirm_password')?.value;
    // No valida si alguna contraseña está vacía
    if (!password || !confirmPassword) {
      return null;
    }
    // Error si no coinciden
    if (password !== confirmPassword) {
      return { mustMatch: true };
    }
    // Las contraseñas coinciden
    return null;
  }

  mostrarAlertErrores(): boolean {
    return Object.keys(this.modelForm.controls).some(campo => {
      const control = this.modelForm.get(campo);
      return control?.invalid && (control.dirty || control.touched);
    }) || (this.modelForm.errors?.['mustMatch'] && this.modelForm.get('confirm_password')?.touched);
  }


  guardar() {
    this.mostrarErrores = true;
    this.modelForm.markAllAsTouched();

    if (this.modelForm.invalid) {
      return;
    }

    const formData = this.modelForm.value;
    const request = this.parent === 'new'
      ? this.userService.createUser(formData)
      : this.userService.updateUser(this.usuario._id, formData);

    request.subscribe({
      next: (response) => {
        const message = this.parent === 'new'
          ? 'Usuario creado con éxito'
          : 'Usuario actualizado con éxito';
        console.log('Respuesta del servidor:', response);
        this.toast.fire({ icon: 'success', title: message });
        this.router.navigate(['/home']);
      },
      error: (e) => {
        const message = this.parent === 'new'
          ? 'No se pudo crear el usuario'
          : 'No se pudo actualizar el usuario';
        console.error('Error del servidor:', e);
        this.toast.fire({ icon: 'error', title: message });
      }
    });
  }
}
