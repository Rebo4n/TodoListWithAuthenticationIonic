import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { switchMap } from 'rxjs/operators'

@Injectable()
export class AuthService {

  user$: Observable<User>;
  user: User;

  constructor(
    private afauth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
  ) { 
    this.user$ = this.afauth.authState.pipe(
      switchMap(user => {
        if(user){
          return this.afs.doc(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }


  async login(email, password){
    const loading = await this.loadingCtrl.create({
      message: 'Athenticating..',
      spinner: 'crescent',
      showBackdrop: true
    })

    loading.present()
    this.afauth.signInWithEmailAndPassword(email, password).then((data)=>{
      if(!data.user.emailVerified){
        loading.dismiss()
        this.toast('please verify your email', 'danger')
        this.logout()
      } else{
        localStorage.setItem('userUID', data.user.uid);
        console.log(data.user.uid)
        loading.dismiss()
        this.router.navigate(['/home'])
      }
    }) 
  }


  async logout() {
    const loading = await this.loadingCtrl.create({
      message: 'Athenticating..',
      spinner: 'crescent',
      showBackdrop: true
    })

    loading.present()

    this.afauth.signOut().then(()=>{
      localStorage.removeItem('userUID');
      loading.dismiss()
      this.router.navigate(['/login'])
    })
  }


  async toast(message, status) {
    const toast = await this.toastr.create({
      message: message,
      position: 'top',
      color: status,
      duration: 2000
    })

    toast.present()
  }


  
}
