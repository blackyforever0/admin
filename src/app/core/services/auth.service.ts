import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../models/admin.models';

const TOKEN_KEY = 'malimall_admin_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  /** Lu une seule fois au démarrage : évite un flash "non connecté" au rechargement. */
  readonly connecte = signal<boolean>(!!localStorage.getItem(TOKEN_KEY));

  constructor(private http: HttpClient, private router: Router) {}

  connexion(telephone: string, motDePasse: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/api/auth/connexion`, { telephone, motDePasse }).pipe(
      tap((res) => {
        if (!res.roles.includes('ROLE_ADMIN')) {
          throw new Error('Ce compte ne dispose pas des droits administrateur');
        }
        localStorage.setItem(TOKEN_KEY, res.token);
        this.connecte.set(true);
      }),
    );
  }

  token(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  deconnexion(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.connecte.set(false);
    this.router.navigateByUrl('/connexion');
  }
}
