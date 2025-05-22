// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, switchMap } from 'rxjs';
// import { User } from '../../models/user.model';
// import { Patient } from '../../models/patient.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class PatientService {
//  private baseUrl = 'http://localhost:3000';

//   constructor(private http: HttpClient) {}

//   register(user: Patient): Observable<User> {
//     // Validate strong password
//     const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     if (!strongPasswordRegex.test(user.password)) {
//       return throwError(() => new Error('Password must contain uppercase, lowercase, number, special character, and be at least 8 characters long.'));
//     }

//     // Check if email already exists
//     return this.http.get<User[]>(`${this.baseUrl}/users?email=${user.email}`).pipe(
//       switchMap(existingUsers => {
//         if (existingUsers.length > 0) {
//           return throwError(() => new Error('Email is already in use.'));
//         }

//         // Create user
//         const newUser: User = {
//           id: 0, // json-server will auto-generate this
//           name: user.name,
//           email: user.email,
//           password: user.password,
//           userType: 'patient'
//         };

//         return this.http.post<User>(`${this.baseUrl}/users`, newUser).pipe(
//           switchMap((createdUser) => {
//             // Then create the patient record
//             const newPatient: Patient = {
//               id: createdUser.id,
//               name: createdUser.name,
//               email: createdUser.email,
//               phone: user.phone,
//               gender: user.gender,
//               dateOfBirth: user.dateOfBirth
//             };

//             return this.http.post<Patient>(`${this.baseUrl}/patients`, newPatient).pipe(
//               map(() => createdUser)
//             );
//           })
//         );
//       }),
//       catchError(error => throwError(() => new Error(error.message)))
//     );
//   }
// }