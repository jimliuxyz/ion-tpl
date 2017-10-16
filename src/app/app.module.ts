import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { IonicPatchModule } from '../patch/ionic-patch.module'
import { MyApp } from './app.component';
import { HomeSlidesPage } from '../pages/home-slides/home-slides';
import { NewsComponent } from "../pages/news/news";
import { CreditComponent } from "../pages/credit/credit";

import { ToastController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';

import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HomeSettingsComponent } from '../pages/home-settings/home-settings';
import { MiscService } from '../providers/misc/misc';
import { SharedModule } from './shared.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';


@NgModule({
  declarations: [
    MyApp,
    HomeSettingsComponent,
    NewsComponent,CreditComponent,
    LoginPage,LogoutPage
    // NewpagePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    IonicPatchModule,
    SharedModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomeSettingsComponent,
    NewsComponent,CreditComponent,
    LoginPage,LogoutPage
    // NewpagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GooglePlus,
    ToastController,
    MiscService
  ]
})
export class AppModule {}
