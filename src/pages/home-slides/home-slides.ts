import { Component, ViewChild,NgZone } from '@angular/core';
import { OnInit,AfterViewInit,AfterViewChecked } from '@angular/core';
import { ComponentFactoryResolver,ViewContainerRef } from '@angular/core';

import { NavController,Slides,Content,Slide,ModalController,IonicPage } from 'ionic-angular';
import { NewsComponent } from '../news/news';
import { CreditComponent } from "../credit/credit";

import { GooglePlus } from '@ionic-native/google-plus';
import { Platform,ToastController } from "ionic-angular"
import { HomeSettingsComponent } from '../home-settings/home-settings';

import { LoginPage } from '../login/login';
import { LogoutPage } from '../logout/logout';
import { MiscService } from '../../providers/misc/misc'

export interface HomeSlidePage{
  title: string,
  tabtitle: string,
  selected(),
}

const SLIDECLS:any[] = [
  [NewsComponent, null],
  [NewsComponent, null],
  [CreditComponent, null],
]

@IonicPage({
  name: 'home',
  segment: 'home'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home-slides.html',  
})
export class HomeSlidesPage implements AfterViewInit,AfterViewChecked{
  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides ;
  @ViewChild('SlideTpl', { read: ViewContainerRef }) SlideTpl: ViewContainerRef;

  SwipedTabsIndicator: any = null;
  slides: HomeSlidePage[] = [];
  sidx: number = 0;

  constructor(public navCtrl: NavController,public modalCtrl: ModalController,public cfr:ComponentFactoryResolver,private platform:Platform,public toastCtrl: ToastController,private googlePlus: GooglePlus,private misc: MiscService, private _zone: NgZone) {
  }

  ionViewCanEnter(): Promise<any>{
    return new Promise((res, rej) => {
      this.misc.ready().then(_ => {
        res(true)
      });
    })
  }

  toastMag(msg:string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 10000
    });
    toast.present();
  }

  ngAfterViewInit() {
    
    this.SwipedTabsIndicator = document.getElementById("indicator");

    SLIDECLS.forEach((comp) => {
      let factory = this.cfr.resolveComponentFactory(comp[0]);
      let compRef = this.SlideTpl.createComponent(factory, this.SlideTpl.length, this.SlideTpl.injector);

      this.slides.push(<HomeSlidePage>compRef.instance);
    })
    this.slides[this.sidx].selected();
  }
  ngAfterViewChecked() {
    
  }


  changeSlide($event) {
    // console.dir('changeSlide')

    if (this.SwipedTabsSlider.length() > this.SwipedTabsSlider.getActiveIndex()) {
      this.sidx = this.SwipedTabsSlider.getActiveIndex();
      this.slides[this.sidx].selected();      
    }
  }

  selectTab(index) {
    // console.dir('selectTab')
    
    this.SwipedTabsIndicator.style.transitionDuration = "0.2s";
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(100*index)+'%,0,0)';
    this.SwipedTabsSlider.slideTo(index, 500);
  }

  updateIndicatorPosition() {
    if( this.SwipedTabsSlider.length()>this.SwipedTabsSlider.getActiveIndex())
    {
      this.SwipedTabsIndicator.style.transitionDuration = "0.1s";
      this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(this.SwipedTabsSlider.getActiveIndex() * 100)+'%,0,0)';
    }
  }

  animateIndicator($event) {
    // if (!this.SwipedTabsIndicator) return;

    this.SwipedTabsIndicator.style.transitionDuration = "";
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (($event.progress* (this.SwipedTabsSlider.length()-1))*100) + '%,0,0)';
  }

  openModal(cmd: string) {
    let com: any;

    if (cmd === 'settings')
      com = HomeSettingsComponent;
    else if (cmd === 'login')
      com = this.misc.hasLogin()?LogoutPage:LoginPage;

    if (com) {
      let modal = this.modalCtrl.create(com);
      modal.present();
    }
  }

}
