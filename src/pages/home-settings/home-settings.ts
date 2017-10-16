import { Component } from '@angular/core';
import { Platform,NavParams,ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { MiscService } from '../../providers/misc/misc';


@Component({
  selector: 'home-settings',
  templateUrl: 'home-settings.html'
})
export class HomeSettingsComponent {
  gender: string;

  constructor(public platform: Platform,public params: NavParams,public viewCtrl: ViewController,private translate: TranslateService, public misc:MiscService) {
  }

  set nalang(val: string) {
    this.translate.use(val);
    this.misc.usercfg.nalang = val;
    this.misc.saveUserCfg();    
  }
  get nalang():string {
    return this.translate.currentLang;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
