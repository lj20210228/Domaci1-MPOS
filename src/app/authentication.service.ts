import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { inject } from '@angular/core';
import firebase from 'firebase/compat';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private auth = inject(Auth);
  constructor() { }
  async registerUser(email: string, password: string) {
    return await createUserWithEmailAndPassword(this.auth, email, password);

  }
  async loginUser(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);

  }

  async signOut() {
    return await signOut(this.auth);
  }
  async getProfile() {
    return this.auth.currentUser;
  }
}
