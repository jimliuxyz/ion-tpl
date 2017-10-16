import { Component, Injector } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { LoadingController,ViewController }   from 'ionic-angular';
import { AuthServices }                       from 'angular-social-auth';
import { LogoutPage }                             from '../logout/logout';
import { MiscService } from '../../providers/misc/misc'

import { AuthService,SocialUser } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  authService: AuthService;
  webloginsub: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authServices: AuthServices, private loadctrl: LoadingController, public platform: Platform,public viewCtrl: ViewController,private misc: MiscService, private ijt:Injector) {
    console.log("LoginPage constructor called");

    if (!this.platform.is("cordova") && !this.authService)
      this.authService = this.ijt.get(AuthService);
  }
  
  ionViewWillUnload() {
    if (this.webloginsub)
      this.webloginsub.unsubscribe();
  }

  private webLoginInit() {
    if (!this.platform.is("cordova") && !this.authService) {
      this.authService = this.ijt.get(AuthService);

      // this.webloginsub = this.authService.authState.subscribe(this.userInfoFromWeb);
    }
  }

  async fbLogin() {
    //console.log('fb login button clicked');
    let spinner = this.loadctrl.create({});
    spinner.present();
    try {
      let result = await this.authServices.fbLogin();
      console.log(result);
      this.navCtrl.push(LogoutPage, {data: result});
    }
    catch (error) {
        console.log('Error in logging with facebook');
        console.log(error);
    }
    finally {
      spinner.dismiss()
    }
  }
  async googleLogin() {
    //console.log('google login button clicked');
    this.authServices.googleRegister('686840052494-pclnksh67f04srjmnta2tqa2m7mmroct.apps.googleusercontent.com');
    let spinner = this.loadctrl.create({});
    spinner.present();
    try {
      if (this.platform.is("cordova")) {
        let result = await this.authServices.googleLogin();
        console.log('google login successful');
        this.misc.setUserFromMobile(result);    
      }
      else {
        // this.misc.setUserFake();
        let user = await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
        console.dir(user)
        this.misc.setUserFromWeb(user);
      }

      this.viewCtrl.dismiss();
      // this.navCtrl.push(LogoutPage, {data: result});
    }
    catch (error) {
      console.log('google login failed');
      console.log(error);
    }
    finally {
      spinner.dismiss();
    }
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
