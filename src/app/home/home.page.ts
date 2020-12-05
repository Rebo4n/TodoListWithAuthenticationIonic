import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  
  numberOfTasksUnchecked: number;
  constructor(private angFire : AngularFireDatabase,
    private auth:AuthService,
    private toastr: ToastController ) {

    


  }

  ngOnInit() {
    this.getTasks()
  }

  logout(){
    this.auth.logout().then(()=>{
    }).catch((err)=>
      this.toast(err.message, 'danger')
    )
  }

  

  getTasks(){
    this.angFire.list('Tasks/', ref => ref.orderByChild('userId').equalTo(localStorage.getItem('userUID'))).snapshotChanges(['child_added']).subscribe(
      (response)=> {
        // console.log(response)
        
        this.numberOfTasksUnchecked = 0
        response.forEach(element => {
          // console.log(element)
          if(!element.payload.exportVal().checked){
            this.numberOfTasksUnchecked++
          }
        })
      }
    )
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
