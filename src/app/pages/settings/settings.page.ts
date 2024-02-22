import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import {Storage} from '@ionic/storage-angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public pageTitle: any;
  public isdisabled:boolean=true;
  public select_date_one: any;
  public select_date_tow: any;
  public select_date_three: any;
  public select_date_fore: any;
  public settings_date_label: any;
  public date_synck_one: any;
  public date_synck_tow: any;
  public date_synck_three: any;
  public date_synck_fore: any;
  public date_synck_five: any;
  public settings_synck_label: any;
  public settings_synck_button: any;
  public settings_done_button: any;
  public settings_done_msg: any;
  //values
  public synckValue: any = 5;
  public dateValue: any = 1;
  //check login
  public fullName:any;
  public userId:any;
  public username:any;
  public password:any;
  //add for all pages
  public menuDirection: any;
  public menuDirectionTow: any;
  public checkLanguage: any=0;
  public language: any;
  public showMenueValue: any=2;
  public showNotificationIcon: any=1;
  constructor(private globalization: Globalization, private translate: TranslateService,private modalController: ModalController,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','forgotpassword');//edit in heare
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot("/forgotpassword");//edit in heare
    });
  }
  initialiseTranslation(){
    this.translate.get('menuDirection').subscribe((res: string) => {
      this.menuDirection = res;
    });
    this.translate.get('menuDirectionTow').subscribe((res: string) => {
      this.menuDirectionTow = res;
    });
    this.translate.get('settings_title').subscribe((res: string) => {
      this.pageTitle = res;
    });
    this.translate.get('select_date_one').subscribe((res: string) => {
      this.select_date_one = res;
    });
    this.translate.get('select_date_tow').subscribe((res: string) => {
      this.select_date_tow = res;
    });
    this.translate.get('select_date_three').subscribe((res: string) => {
      this.select_date_three = res;
    });
    this.translate.get('select_date_fore').subscribe((res: string) => {
      this.select_date_fore = res;
    });
    this.translate.get('settings_date_label').subscribe((res: string) => {
      this.settings_date_label = res;
    });
    this.translate.get('settings_date_label').subscribe((res: string) => {
      this.settings_date_label = res;
    });
    this.translate.get('date_synck_one').subscribe((res: string) => {
      this.date_synck_one = res;
    });
    this.translate.get('date_synck_tow').subscribe((res: string) => {
      this.date_synck_tow = res;
    });
    this.translate.get('date_synck_three').subscribe((res: string) => {
      this.date_synck_three = res;
    });
    this.translate.get('date_synck_fore').subscribe((res: string) => {
      this.date_synck_fore = res;
    });
    this.translate.get('date_synck_five').subscribe((res: string) => {
      this.date_synck_five = res;
    });
    this.translate.get('settings_synck_label').subscribe((res: string) => {
      this.settings_synck_label = res;
    });
    this.translate.get('settings_synck_button').subscribe((res: string) => {
      this.settings_synck_button = res;
    });
    this.translate.get('settings_done_button').subscribe((res: string) => {
      this.settings_done_button = res;
    });
    this.translate.get('settings_done_msg').subscribe((res: string) => {
      this.settings_done_msg = res;
    });
  }
  async selectsynckValue(event:any){
    this.synckValue = event.target.value;
  }
  async selectDateValue(event:any){
    this.dateValue = event.target.value;
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    //await this.checkLoginUser();
    this.synckValue = await this.storage.get('synckValue');
    this.dateValue = await this.storage.get('dateValue');
    if(this.synckValue == null || this.synckValue == 0  || this.synckValue == undefined){
      this.synckValue = 5;
    }
    if(this.dateValue == null || this.dateValue == 0  || this.dateValue == undefined){
      this.dateValue = 1;
    }
  }
  async functionSaveSetting(){
    await this.storage.set('synckValue',this.synckValue);
    await this.storage.set('dateValue',this.dateValue);
    await this.displayResult(this.settings_done_msg)
  }
  async functionSynckSetting(){

  }
  async checkLoginUser(){
    this.username = await this.storage.get('username');
    this.fullName = await this.storage.get('full_name');
    this.userId = await this.storage.get('userId');
    this.password = await this.storage.get('password');
    if(this.userId == null || this.fullName == null || this.password == null || this.username == null){
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
  async getDeviceLanguage() {
    await this.storage.get('checkLanguage').then(async checkLanguage=>{
      this.checkLanguage = checkLanguage
    });
    if(this.checkLanguage){
      this.translate.setDefaultLang(this.checkLanguage);
      this.language = this.checkLanguage;
      this.translate.use(this.language);
      this.initialiseTranslation();
    }else{
      if (window.Intl && typeof window.Intl === 'object') {
        let Val  = navigator.language.split("-");
        this.translate.setDefaultLang(Val[0]);
        if (Val[0] == "ar" || Val[0] == "en" || Val[0] == "ur")
          this.language = Val[0];
        else
          this.language = 'en';
        this.translate.use(this.language);
        this.initialiseTranslation();
      }
      else{
        this.globalization.getPreferredLanguage().then(res => {
          let Val  = res.value.split("-");
          this.translate.setDefaultLang(Val[0]);
          if (Val[0] == "ar" || Val[0] == "en" || Val[0] == "ur")
            this.language = Val[0];
          else
            this.language = 'en';
          this.translate.use(this.language);
          this.initialiseTranslation();
        }).catch(e => {console.log(e);});
      }
    }
  }
  async functionOpenMenue(){
    if(this.showMenueValue == 1){
      this.menu.enable(true,"first");
      this.menu.open("first");
    }else{
      this.menu.enable(true,"last");
      this.menu.open("last");
    }
  }
  functionOpenNotif(){
    this.navCtrl.navigateRoot('notification');
  }
  async displayResult(message:any){
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: 'bottom',
      cssClass:"toastStyle",
      color:""
    });
    await toast.present();
  }
}
