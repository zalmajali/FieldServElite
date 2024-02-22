import { Component, OnInit } from '@angular/core';
import {AlertController,LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import {Storage} from '@ionic/storage-angular';
import {ActivatedRoute, Router} from '@angular/router';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import {UsersService} from "../../service/users.service";
import {WorkorderService} from "../../service/workorder.service";
import {ZonesaddComponent} from "../zonesadd/zonesadd.component";
@Component({
  selector: 'app-zones',
  templateUrl: './zones.page.html',
  styleUrls: ['./zones.page.scss'],
})
export class ZonesPage implements OnInit {
  public pageTitle: any;
  public isdisabled:boolean=true;
  public error_zone_small: any;
  public error_zone_larg: any;
  public eventName: any;
  public inspection_points: any;
  public inspection_progress: any;
  public inspection_completed: any;
  public inspection_pending: any;
  public inspectionpoints_add: any;
  public eventId: any;
  public ordersId: any;
  public workSiteAddressId: any;
  public returnZonseData:any;
  public returnArrayZonseFromServer:any;
  public returnZonseArray:any = [];
  public operationZonseResult:any;
  public zonse:any;
  public zone_delete:any;
  public returnZonseDeleteData:any;
  public operationZonseDeleteResult:any;
  public error_zone_delete_one:any;
  public error_zone_delete_tow:any;
  public error_zone_delete_three:any;
  public eventEventId:any;
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
  public are_you_sure:any;
  public yes:any;
  public no:any;
  constructor(private workorderService: WorkorderService,private alertController:AlertController,private activaterouter : ActivatedRoute,private usersService: UsersService,private callNumber: CallNumber,private globalization: Globalization, private translate: TranslateService,private modalController: ModalController,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
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
    this.translate.get('zones_information').subscribe((res: string) => {
      this.pageTitle = res;
    });
    this.translate.get('error_zone_small').subscribe((res: string) => {
      this.error_zone_small = res;
    });
    this.translate.get('error_zone_larg').subscribe((res: string) => {
      this.error_zone_larg = res;
    });
    this.translate.get('error_zone_larg').subscribe((res: string) => {
      this.error_zone_larg = res;
    });
    this.translate.get('inspection_points').subscribe((res: string) => {
      this.inspection_points = res;
    });
    this.translate.get('inspection_progress').subscribe((res: string) => {
      this.inspection_progress = res;
    });
    this.translate.get('inspection_completed').subscribe((res: string) => {
      this.inspection_completed = res;
    });
    this.translate.get('inspection_pending').subscribe((res: string) => {
      this.inspection_pending = res;
    });
    this.translate.get('inspectionpoints_add').subscribe((res: string) => {
      this.inspectionpoints_add = res;
    });
    this.translate.get('zone_delete').subscribe((res: string) => {
      this.zone_delete = res;
    });
    this.translate.get('error_zone_delete_one').subscribe((res: string) => {
      this.error_zone_delete_one = res;
    });
    this.translate.get('error_zone_delete_tow').subscribe((res: string) => {
      this.error_zone_delete_tow = res;
    });
    this.translate.get('error_zone_delete_three').subscribe((res: string) => {
      this.error_zone_delete_three = res;
    });
    this.translate.get('are_you_sure').subscribe((res: string) => {
      this.are_you_sure = res;
    });
    this.translate.get('yes').subscribe((res: string) => {
      this.yes = res;
    });
    this.translate.get('no').subscribe((res: string) => {
      this.no = res;
    });
  }
  async ngOnInit() {
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 1500,
    });
    await this.getDeviceLanguage();
    await this.checkLoginUser();
    await this.activaterouter.params.subscribe(async (params:any) => {
      if(params['eventName']!="" && params['eventName']!=null && params['eventName']!=undefined && params['eventName']!=0){
        this.eventName = params['eventName'];
        await this.storage.set('eventNameOperation',this.eventName);
      }else{
        this.eventName = await this.storage.get('eventNameOperation');
      }
      if(params['eventId']!="" && params['eventId']!=null && params['eventId']!=undefined && params['eventId']!=0){
        this.eventId = params['eventId'];
        await this.storage.set('eventIdOperation',this.eventId);
      }else{
        this.eventId = await this.storage.get('eventIdOperation');
      }
      if(params['ordersId']!="" && params['ordersId']!=null && params['ordersId']!=undefined && params['ordersId']!=0){
        this.ordersId = params['ordersId'];
        await this.storage.set('ordersIdOperation',this.ordersId);
      }else{
        this.ordersId = await this.storage.get('ordersIdOperation');
      }
      if(params['workSiteAddressId']!="" && params['workSiteAddressId']!=null && params['workSiteAddressId']!=undefined && params['workSiteAddressId']!=0){
        this.workSiteAddressId = params['workSiteAddressId'];
        await this.storage.set('workSiteAddressIdOperation',this.workSiteAddressId);
      }else{
        this.workSiteAddressId = await this.storage.get('workSiteAddressIdOperation');
      }
      if(params['eventEventId']!="" && params['eventEventId']!=null && params['eventEventId']!=undefined && params['eventEventId']!=0){
        this.eventEventId = params['eventEventId'];
        await this.storage.set('eventEventIdOperation',this.eventEventId);
      }else{
        this.eventEventId = await this.storage.get('eventEventIdOperation');
      }
      await this.functionGetAllZones(this.ordersId,this.workSiteAddressId)
    });
    await loading.present();
  }
  async functionAddZone(ordersId:any,workSiteAddressId:any){
    let model = await this.modalController.create({
      component:ZonesaddComponent,
      animated:true,
      componentProps:{ordersId:ordersId,workSiteAddressId:workSiteAddressId},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
      if(data.data.key!=undefined && data.data.key!=0 && data.data.key!=null){
        if(data.data.key == 1)
          this.ngOnInit();
      }
    });
    await model.present();
  }
  async functionGetAllZones(ordersId:any,workSiteAddressId:any){
    let sendValues = {'ordersId':ordersId,'workSiteAddressId':workSiteAddressId};
    this.workorderService.siteAdressZones(sendValues).then(async data=>{
      this.returnZonseData = data;
      this.operationZonseResult = this.returnZonseData.Error.ErrorCode;
      if(this.operationZonseResult==1){
        this.returnArrayZonseFromServer = this.returnZonseData.Data.zones;
        this.returnZonseArray=[];
        for(let i = 0; i < this.returnArrayZonseFromServer.length;i++) {
          this.returnZonseArray[i]=[];
          this.returnZonseArray[i]['id'] = this.returnArrayZonseFromServer[i].ozoneId;
          this.returnZonseArray[i]['ozoneName'] = this.returnArrayZonseFromServer[i].ozoneName;
          this.returnZonseArray[i]['countOfProgress'] = this.returnArrayZonseFromServer[i].countOfProgress;
          this.returnZonseArray[i]['countOfCompleted'] = this.returnArrayZonseFromServer[i].countOfCompleted;
          this.returnZonseArray[i]['countOfPending'] = this.returnArrayZonseFromServer[i].countOfPending;
        }
        let countOfData = this.returnZonseArray.length;
        if(countOfData == 0)
          this.zonse = 0;
        else{
          this.zonse = 1;
        }
      }else
        this.zonse = 0;
    }).catch(error=>{
      this.functionGetAllZones(ordersId,workSiteAddressId)
    });
  }
  async functionDelectZone(ordersId:any,workSiteAddressId:any,zoneId:any){
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
            let sendValues = {'ordersId':ordersId,'workSiteAddressId':workSiteAddressId,'zoneId':zoneId};
            this.workorderService.deleteZone(sendValues).then(async data=>{
              this.returnZonseDeleteData = data;
              this.operationZonseDeleteResult = this.returnZonseDeleteData.Error.ErrorCode;
              if(this.operationZonseDeleteResult==1){
                this.ngOnInit();
                this.displayResult(this.error_zone_delete_one);
              }
              else if(this.operationZonseDeleteResult==5)
                this.displayResult(this.error_zone_delete_tow);
              else
                this.displayResult(this.error_zone_delete_three);
            }).catch(error=>{
              this.displayResult(this.error_zone_delete_three);
            });
          }
        }
      ]
    });
    await alert.present();
  }
  functionInspectionPoints(zoneId:any){
    this.navCtrl.navigateRoot(['/inspectionpoints', {zoneId:zoneId}]);
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
