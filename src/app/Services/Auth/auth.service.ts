import { Injectable } from '@angular/core';
import { environment } from '../../../environment/Environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { AuthResponse, PoliticalPosition, TypeUser, User } from '../../interfaces/User';
import { ServiceUserService } from '../User/service-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl + '/user'
  constructor(private http: HttpClient, private service: ServiceUserService) { }
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  login(email: string, password: string): Observable<User[]> {
    return this.http.post<AuthResponse[]>(`${this.baseUrl}/login`, { email, password }).pipe(
      switchMap((response) => {
        const auth = response[0];
        const token = auth.token;
        return this.service.getUserById(auth.id!).pipe(
          tap((userResponse) => {
            const user = userResponse[0];
            this.saveUserToStorage(user, token);
            this.currentUserSubject.next(user);
          })
        );
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getUser(): User | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private saveUserToStorage(user: User, token: string) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  }

  private getUserFromStorage(): User | null {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }

  getUserValidation(user1: User) {
    const storedUser = this.getUser();
    if (storedUser) {
      user1 = storedUser;
    } else {
      console.warn('No hay usuario logueado en AuthService');
    }
  }
  isLoggedIn(): boolean {
    return !!this.getToken() && !!this.getUser();
  }

  /** Retorna el tipo de usuario actual (ADMIN | PERIODISTA | COMUN) o null si no hay sesión */
  getType(): TypeUser | null {
    const user = this.getUser();
    return user?.type ?? null;
  }

  /** ¿El usuario tiene alguno de los tipos requeridos? */
  hasType(required: TypeUser | TypeUser[]): boolean {
    const current = this.getType();  
    if (!current) return false;
    const req = Array.isArray(required) ? required : [required];
    return req.includes(current);
  }

}

