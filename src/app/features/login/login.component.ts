import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Si ja està autenticat, redirigir a home
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit(): void {
    this.error = '';

    if (!this.username || !this.password) {
      this.error = 'Usuari i contrasenya són obligatoris';
      return;
    }

    if (this.password.length < 4) {
      this.error = 'La contrasenya ha de tenir almenys 4 caràcters';
      return;
    }

    this.loading = true;

    this.authService.login(this.username, this.password).subscribe({
      next: (success) => {
        this.loading = false;
        if (success) {
          this.router.navigate(['/favorites']);
        } else {
          this.error = 'Credencials incorrectes';
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Error durant el login';
        console.error(err);
      }
    });
  }
}