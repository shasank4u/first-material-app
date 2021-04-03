import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { TrainingService } from '../training/training.service';
import { AuthData } from './auth-data.model';
import { User } from './user.model';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated: boolean;

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private trainingService: TrainingService
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
      })
      .catch((error) => {
        console.log(error);
      });
  }

  login(authData: AuthData) {
    this.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logout() {
    this.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }

}
