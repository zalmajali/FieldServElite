import { Component, OnInit,Input,ViewChild,ElementRef } from '@angular/core';
import {LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import {Storage} from '@ionic/storage-angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import {WorkorderService} from "../../service/workorder.service";
import {ActivatedRoute, Router} from '@angular/router';
import {StartlunchComponent} from "../startlunch/startlunch.component";
@Component({
  selector: 'app-lunchinformation',
  templateUrl: './lunchinformation.page.html',
  styleUrls: ['./lunchinformation.page.scss'],
})
export class LunchinformationPage implements OnInit {
  public isdisabled:boolean=true;
  public pageTitle: any;
  public start_lunch_add: any;
  public routeLogId: any;
  public routeId: any;
  public startLunchTime: any;
  public endLunchTime: any;
  public lunchTimeDuration: any;
  public start_lunch_title: any;
  public end_lunch_title: any;
  public duration_lunch_title: any;
  public duration_note: any;
  public returnAddLunchInTimeResultData: any;
  public lunch_add_succ: any;
  public lunch_add_failed: any;
  public lunch_add_failed_data: any;

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
  public dirTow:any;
  public save_location_failed: any;
  constructor(private activaterouter : ActivatedRoute,private workorderService: WorkorderService,private translate: TranslateService,private globalization: Globalization,private modalController: ModalController,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','forgotpassword');//edit in heare
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss({})
    });
  }
  initialiseTranslation(){
    this.translate.get('dirTow').subscribe((res: string) => {
      this.dirTow = res;
    });
    this.translate.get('menuDirection').subscribe((res: string) => {
      this.menuDirection = res;
    });
    this.translate.get('menuDirectionTow').subscribe((res: string) => {
      this.menuDirectionTow = res;
    });
    this.translate.get('start_lunch').subscribe((res: string) => {
      this.pageTitle = res;
    });
    this.translate.get('start_lunch_add').subscribe((res: string) => {
      this.start_lunch_add = res;
    });
    this.translate.get('start_lunch_title').subscribe((res: string) => {
      this.start_lunch_title = res;
    });
    this.translate.get('end_lunch_title').subscribe((res: string) => {
      this.end_lunch_title = res;
    });
    this.translate.get('duration_lunch_title').subscribe((res: string) => {
      this.duration_lunch_title = res;
    });
    this.translate.get('duration_note').subscribe((res: string) => {
      this.duration_note = res;
    });
    this.translate.get('lunch_add_succ').subscribe((res: string) => {
      this.lunch_add_succ = res;
    });
    this.translate.get('lunch_add_failed').subscribe((res: string) => {
      this.lunch_add_failed = res;
    });
    this.translate.get('lunch_add_failed_data').subscribe((res: string) => {
      this.lunch_add_failed_data = res;
    });
  }
 async ngOnInit() {
    await this.getDeviceLanguage();
    await this.checkLoginUser();
   this.activaterouter.params.subscribe(async (params:any) => {
     if(params['routeId']!="" && params['routeId']!=null && params['routeId']!=undefined && params['routeId']!=0){
       this.routeId = params['routeId'];
     }
     if(params['routeLogId']!="" && params['routeLogId']!=null && params['routeLogId']!=undefined && params['routeLogId']!=0){
       this.routeLogId = params['routeLogId'];
     }
   });
  }
  async functiondatePuckerStart(){
    let model = await this.modalController.create({
      component:StartlunchComponent,
      animated:true,
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
      if(data.data.time!=undefined && data.data.time!=0 && data.data.time!=null){
        this.startLunchTime = data.data.time
      }
    });
    await model.present();
  }
  async functiondatePuckerEnd(){
    let model = await this.modalController.create({
      component:StartlunchComponent,
      animated:true,
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
      if(data.data.time!=undefined && data.data.time!=0 && data.data.time!=null){
        this.endLunchTime = data.data.time
      }
    });
    await model.present();
  }
  functionAddLunchInformation(){
    let sendValues = {'routeId':this.routeId,'routeLogId':this.routeLogId,'startLunchTime':this.startLunchTime,'endLunchTime':this.endLunchTime,'lunchTimeDuration':this.lunchTimeDuration};
    this.workorderService.addLunchInTime(sendValues).then(async data=>{
      this.returnAddLunchInTimeResultData = data;
      let errorData = this.returnAddLunchInTimeResultData.Error.ErrorCode;
      if(errorData == 1){
        this.displayResult(this.lunch_add_succ);
        this.modalController.dismiss({
          "key":1
        })
      }else if(errorData == 2){
        this.displayResult(this.lunch_add_failed);
      }else if(errorData == 3 || errorData == 4 || errorData == 5){
        this.displayResult(this.lunch_add_failed_data);
      }
    });
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
