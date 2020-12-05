import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-checked',
  templateUrl: './checked.page.html',
  styleUrls: ['./checked.page.scss'],
})
export class CheckedPage implements OnInit {
  bool = false
  currentDate : string;
  newTask : string;
  allTasks = []

  constructor(private angFire : AngularFireDatabase,
    private toastr: ToastController,
    private auth: AuthService
    ) {

    let myDate = new Date()
    let options = {weekday : 'long', month : 'long', day : 'numeric'}
    this.currentDate  = myDate.toLocaleDateString('en-EN', options)


  }


  ngOnInit() {
    this.getTasks()
  }

  addNewTask() {
    if(this.newTask){
      this.angFire.list('Tasks/').push({
        text : this.newTask,
        date : new Date().toISOString(),
        checked : false,
        userId: localStorage.getItem('userUID')
      })
    } else {
      this.toast('fill in the task input', 'danger')
    }

    this.newTask = ''
  }

  getTasks(){
    this.angFire.list('Tasks/', ref => ref.orderByChild('userId').equalTo(localStorage.getItem('userUID'))).snapshotChanges(['child_added']).subscribe(
      (response)=> {
        // console.log(response)
        this.allTasks = [];
        response.forEach(element => {
          // console.log(element)
          if (element.payload.exportVal().checked) {
            this.allTasks.push({
              text: element.payload.exportVal().text,
              date : element.payload.exportVal().date.substring(11, 16),
              checked : element.payload.exportVal().checked,
              key : element.key
            })
          } 
        })
      }
    )
  }

  changeCheckedState1(tsk) {
    this.angFire.object(`Tasks/${tsk.key}/checked`).set(tsk.checked)
    //this.getTasks()
  }

  deleteTask(id){
    this.angFire.list(`Tasks/`).remove(id)
    this.getTasks()
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
  hide_show(){
    this.bool = !this.bool;
  }
}
