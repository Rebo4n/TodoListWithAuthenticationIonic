import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from  '@angular/fire'
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFireAuthModule } from '@angular/fire/auth'

import { FormsModule } from '@angular/forms'

import { AngularFirestoreModule } from '@angular/fire/firestore'
//services
import { AuthService } from './services/auth.service'

//guard
import { AuthGuard } from './guards/auth.guard'


export const firebaseConfig = {
  apiKey: "AIzaSyDYrSUFCkdMjBy9AkT4oYOPZ8ZcmwzubbU",
  authDomain: "glsi-a-tp4.firebaseapp.com",
  projectId: "glsi-a-tp4",
  storageBucket: "glsi-a-tp4.appspot.com",
  messagingSenderId: "737678857411",
  appId: "1:737678857411:web:e52e37a1f255a29696be76",
  measurementId: "G-E1PQZVD7G6"
};


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    FormsModule,
    AngularFirestoreModule,
    AppRoutingModule, 
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicModule],
  providers: [
    AuthService,
    AuthGuard,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
