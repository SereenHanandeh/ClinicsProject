import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, throwError } from 'rxjs';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../../models/patient.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): Observable<User> {
    return this.http
      .get<User[]>(`${this.baseUrl}/users?email=${email}&password=${password}`)
      .pipe(
        map((users: string | any[]) => {
          if (users.length === 0) {
            throw new Error('Invalid email or password');
          }
          const user = users[0];
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  hasRole(role: 'admin' | 'doctor' | 'patient'): boolean {
    return this.currentUser?.userType === role;
  }

  isAdmin(): boolean {
    return this.hasRole('admin');
  }

  isDoctor(): boolean {
    return this.hasRole('doctor');
  }

  isPatient(): boolean {
    return this.hasRole('patient');
  }

  register(
    user: Partial<User> & {
      phone?: string;
      gender?: 'male' | 'female';
      dateOfBirth?: string;
    }
  ): Observable<string> {
    if (user.userType && user.userType !== 'patient') {
      return throwError(() => new Error('Only patients can register.'));
    }

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!user.password || !strongPasswordRegex.test(user.password)) {
      return throwError(
        () =>
          new Error(
            'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
          )
      );
    }

    return this.http
      .get<User[]>(`${this.baseUrl}/users?email=${user.email}`)
      .pipe(
        switchMap((existingUsers: User[]) => {
          if (existingUsers.length > 0) {
            return throwError(() => new Error('Email is already registered.'));
          }

          const newUser: User = {
            id: 0,
            name: user.name ?? '',
            email: user.email ?? '',
            password: user.password!,
            userType: 'patient',
          };
          
          return this.http.post<User>(`${this.baseUrl}/users`, newUser).pipe(
            switchMap((createdUser: User) => {
              const newPatient: Patient = {
                id: createdUser.id,
                name: createdUser.name,
                email: createdUser.email,
                phone: user.phone ?? '',
                gender: user.gender ?? 'male',
                dateOfBirth: user.dateOfBirth ?? '',
              };

              return this.http
                .post(`${this.baseUrl}/patients`, newPatient)
                .pipe(map(() => 'Registration successful.'));
            })
          );
        })
      );
  }
}
