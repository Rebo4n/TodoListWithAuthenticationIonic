import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(
    private router: Router,
    private auth: AuthService,
    private toastr: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    // this.email = ''
    // this.password = ''
  }

  register(){
    this.router.navigate(['/register'])
  }

  forgot(){
    this.router.navigate(['/forget-password'])
  }


  async login(){
    if(this.email && this.password){
      const loading = await this.loadingCtrl.create(
        {
          message: 'logging..',
          spinner: "crescent",
          showBackdrop: true
        }
      )
      loading.present()

      this.auth.login(this.email, this.password).then(()=>{
        loading.dismiss()
      })
      .catch((error) => {
        loading.dismiss()
        this.toast(error.message, 'danger')
        this.email=''
        this.password=''
      })
    } else {
      this.toast('please Enter your information', 'danger')
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
}
