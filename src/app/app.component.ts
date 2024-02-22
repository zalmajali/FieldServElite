import { Component } from '@angular/core';
import {AlertController, Platform,NavController,MenuController,ToastController} from '@ionic/angular';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import {Storage} from '@ionic/storage-angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public menuDirection:any;
  public checkLanguage: any=0;
  public language: any;
  public fullName:any;
  public userId:any;
  public username:any;
  public password:any;
  public all:any;
  public appPagesfirst:any= [];
  public appPagesLast:any= [];
  public dir:any;
  public pageMenueOne:any;
  public pageMenueTow:any;
  public pageMenueThree:any;
  public pageMenueFore:any;
  public pageMenueFive:any;
  public arrowDirection:any
  public pageMenueSix:any;
  public pageMenueSeven:any;
  public pageMenueEight:any;
  public pageMenueNine:any;
  public pageMenueTen:any;
  public pageMenueEleven:any;
  public pageMenueTwelveth:any;
  public are_you_sure:any;
  public yes:any;
  public no:any;
  constructor(private globalization: Globalization,private statusBar:StatusBar,private translate: TranslateService,private toastCtrl: ToastController,private navCtrl: NavController,private menu:MenuController,private alertController:AlertController,private platform : Platform,private storage: Storage) {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#494949');
    });
    this.goPageValue();
  }
  async goPageValue(){
    await this.storage.create();
    await this.getDeviceLanguage();
    this.username = await this.storage.get('username');
    this.fullName = await this.storage.get('full_name');
    this.userId = await this.storage.get('userId');
    this.password = await this.storage.get('password');
    if(this.userId == null || this.fullName == null || this.password == null || this.username == null)
      this.navCtrl.navigateRoot('login');
    else
      this.navCtrl.navigateRoot('home');
  }
  async initialiseTranslation() {
    //labels
    await this.translate.get('menuDirection').subscribe((res: string) => {
      this.menuDirection = res;
    });
    await this.translate.get('dir').subscribe((res: string) => {
      this.dir = res;
    });
    await this.translate.get('arrowDirection').subscribe((res: string) => {
      this.arrowDirection = res;
    });
    //menue one
    await this.translate.get('pageMenueOne').subscribe((res: string) => {
      this.pageMenueOne = res;
      this.appPagesfirst.push({ title: this.pageMenueOne, url: '/homeout',icon:"alert-circle",type:0});
    });
    await this.translate.get('pageMenueThree').subscribe((res: string) => {
      this.pageMenueThree = res;
      this.appPagesfirst.push({ title: this.pageMenueThree, url: '/homeout',icon:"alert-circle",type:0});
    });
    await this.translate.get('pageMenueFore').subscribe((res: string) => {
      this.pageMenueFore = res;
      this.appPagesfirst.push({ title: this.pageMenueFore, url: '/homeout',icon:"alert-circle",type:0});
    });
    await this.translate.get('pageMenueFive').subscribe((res: string) => {
      this.pageMenueFive = res;
      this.appPagesfirst.push({ title: this.pageMenueFive, url: '/homeout',icon:"alert-circle",type:0});
    });
    await this.translate.get('pageMenueSix').subscribe((res: string) => {
      this.pageMenueSix = res;
      this.appPagesLast.push({ title: this.pageMenueSix, url: '/inprogress',icon:"navigate",type:0});
    });
    await this.translate.get('pageMenueSeven').subscribe((res: string) => {
      this.pageMenueSeven = res;
      this.appPagesLast.push({ title: this.pageMenueSeven, url: '/home',icon:"layers",type:0});
    });
    await this.translate.get('pageMenueEight').subscribe((res: string) => {
      this.pageMenueEight = res;
      this.appPagesLast.push({ title: this.pageMenueEight, url: '/employees',icon:"people",type:0});
    });
    await this.translate.get('pageMenueNine').subscribe((res: string) => {
      this.pageMenueNine = res;
      this.appPagesLast.push({ title: this.pageMenueNine, url: '/routemap',icon:"map",type:0});
    });
    await this.translate.get('pageMenueTen').subscribe((res: string) => {
      this.pageMenueTen = res;
      this.appPagesLast.push({ title: this.pageMenueTen, url: '/customers',icon:"man",type:0});
    });
    await this.translate.get('pageMenueEleven').subscribe((res: string) => {
      this.pageMenueEleven = res;
      this.appPagesLast.push({ title: this.pageMenueEleven, url: '/settings',icon:"settings",type:0});
    });
    await this.translate.get('pageMenueTwelveth').subscribe((res: string) => {
      this.pageMenueTwelveth = res;
      this.appPagesLast.push({ title: this.pageMenueTwelveth, url: '/out',icon:"log-out",type:1});
    });
    await this.translate.get('are_you_sure').subscribe((res: string) => {
      this.are_you_sure = res;
    });
    await this.translate.get('yes').subscribe((res: string) => {
      this.yes = res;
    });
    await this.translate.get('no').subscribe((res: string) => {
      this.no = res;
    });
  }
  functionOpenPage(pageData:any){
    this.menu.close();
    this.navCtrl.navigateRoot(pageData);
  }

  async signOut(){
    this.menu.close();
    const alert = await this.alertController.create({
      cssClass: 'alertBac',
      mode: 'ios',
      message:this.are_you_sure,
      buttons: [
        {
          text: this.no,
          cssClass: 'alertButton',
          handler: () => {
          }
        }, {
          text: this.yes,
          cssClass: 'alertButton',
          handler: () => {
            this.storage.remove('userId');
            this.storage.remove('company_id');
            this.storage.remove('branch_id');
            this.storage.remove('role_id');
            this.storage.remove('username');
            this.storage.remove('password');
            this.storage.remove('full_name');
            this.storage.remove('mobile');
            this.storage.remove('login_days');
            this.storage.remove('login_start_time');
            this.storage.remove('login_end_time');
            this.storage.remove('mobile_user_udid');
            this.storage.remove('team_id');
            this.storage.remove('team_name');
            this.storage.remove('team_target_pests_cat_id');
            this.storage.remove('team_target_pests_name');
            this.navCtrl.navigateRoot('login');
          }
        }
      ]
    });
    await alert.present();
  }

  async getDeviceLanguage() {
    await this.storage.get('checkLanguage').then(async (checkLanguage:any)=>{
      this.checkLanguage = checkLanguage
    });
    if(this.checkLanguage){
      this.translate.setDefaultLang(this.checkLanguage);
      this.language = this.checkLanguage;
      this.translate.use(this.language);
      await this.initialiseTranslation();
    }else{
      if (window.Intl && typeof window.Intl === 'object') {
        let Val  = navigator.language.split("-");
        this.translate.setDefaultLang(Val[0]);
        if (Val[0] == "ar" || Val[0] == "en")
          this.language = Val[0];
        else
          this.language = 'en';
        this.translate.use(this.language);
        await this.initialiseTranslation();
      }
      else{
        this.globalization.getPreferredLanguage().then(async res => {
          let Val  = res.value.split("-");
          this.translate.setDefaultLang(Val[0]);
          if (Val[0] == "ar" || Val[0] == "en")
            this.language = Val[0];
          else
            this.language = 'en';
          this.translate.use(this.language);
          await this.initialiseTranslation();
        }).catch(e => {console.log(e);});
      }
    }
  }
}
