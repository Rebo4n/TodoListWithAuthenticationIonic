import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name:string
  email:string
  password:string
  confirmString:string

  passwordMatch: boolean

  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async register(){
    if(this.name && this.email && this.password){
      const loading = await this.loadingCtrl.create({
        message: 'loading...',
        spinner: 'crescent',
        showBackdrop: true
      })

      loading.present()
      
      this.afauth.createUserWithEmailAndPassword(this.email, this.password).then((data)=>{
        this.afs.collection('users').doc(data.user.uid).set({
          'userId': data.user.uid,
          'name': this.name,
          'email': this.email,
          'createAt': Date.now()
        })

        data.user.sendEmailVerification()
      }).then(()=>{
        loading.dismiss()
        this.toast('Registration success!', 'success')
        this.router.navigate(['/login'])
      }).catch((error)=>{
        loading.dismiss()
        this.toast(error.message, 'danger')
      })
    } else {
      this.toast('please fill the form', 'danger')
    }
  }

  async toast(message, status){
    const toast = await this.toastr.create({
      message: message,
      position: 'top',
      color: status,
      duration: 2000
    })

    toast.present()
  }

  checkPassword(){
    if(this.password == this.confirmString){
      this.passwordMatch = true
    } else{
      this.passwordMatch = false
    }
  }

}
