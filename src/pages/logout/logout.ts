import { Component }                from '@angular/core';
import { NavController, NavParams,Platform } from 'ionic-angular';
import { LoadingController,ViewController } from 'ionic-angular';
import { AuthServices } from 'angular-social-auth';
import { UserInfo,SocialTypes } from 'angular-social-auth';
import { MiscService } from '../../providers/misc/misc'

//Unknown error, enum SocialTypes.facebook did not compile to 0/*SocialTypes.facebook*/
export const enum SocialTypes_ {facebook, google};

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {
  myDetail: UserInfo;
  constructor(public navCtrl: NavController, public navParams: NavParams, private authServices: AuthServices, private loadingCtrl: LoadingController, public platform: Platform,public viewCtrl: ViewController,private misc: MiscService) {
    console.log('LogoutPage constructor called');
    this.myDetail = misc.user;
  }

  async logout() {
    let spinner = this.loadingCtrl.create({});
    spinner.present();
    try {
      if (this.platform.is("cordova")) {
        switch(<any>this.myDetail.socialType) {
          case SocialTypes_.facebook : await this.authServices.fbLogout();
                                      break;
          case SocialTypes_.google   : await this.authServices.googleLogout();
                                      break;
        }
      }
      else {
        //todo...web logout or just clear user
      }
    }
    catch(e) {
      console.log('error while logging out', e);
    }
    finally {
      this.misc.clearUser();
      spinner.dismiss();
      this.viewCtrl.dismiss();
    }
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
