import { Component, ViewChild } from '@angular/core';
import { Platform, NavController,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {MiscService} from '../providers/misc/misc'

import { HomeSlidesPage } from '../pages/home-slides/home-slides';

@Component({
  templateUrl: 'app.html'
})
export class MyApp{
  rootPage: any;
  @ViewChild('mynav') nav: NavController;

  constructor(private misc: MiscService, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {

      this.misc.ready().then(() => {
        console.log("everything ready~")
        console.log(platform.url())
        if (platform.url().indexOf("#") <= 0)
          this.nav.push('home')

        // if (!this.nav.getActive(true))
        //   this.nav.push('home')
        // this.rootPage = HomeSlidesPage;
        statusBar.styleDefault();
        splashScreen.hide();
      })
      .catch(reason => {
        console.error(reason);
      })

    });
  }

}

