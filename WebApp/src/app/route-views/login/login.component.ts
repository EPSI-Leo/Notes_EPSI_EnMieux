import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      // Gérer le cas où le formulaire est invalide, par exemple, afficher un message à l'utilisateur
      return;
    }

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe(
      response => {
        console.log('Login response:', response);
        // Si la connexion est réussie, vous pouvez naviguer vers la page 'cours'
        this.router.navigate(['cours']);
      },
      error => {
        console.error('Error during login:', error);
        this.errorMessage = 'Identifiant ou mot de passe invalides. Veuillez réessayer.';
      }
    );
  }
}
