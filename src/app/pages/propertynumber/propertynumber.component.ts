import { Component, OnInit,Input,ViewChild,ElementRef } from '@angular/core';
import {LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import {Storage} from '@ionic/storage-angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import {WorkorderService} from "../../service/workorder.service";
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
@Component({
  selector: 'app-propertynumber',
  templateUrl: './propertynumber.component.html',
  styleUrls: ['./propertynumber.component.scss'],
})
export class PropertynumberComponent  implements OnInit {
  @Input() eventId: string | any;
  @Input() ordersId: string | any;
  @Input() workSiteAddressId: string | any;
  public isdisabled:boolean=true;
  public pageTitle: any;
  public returnCheckDataOperationData: any;
  public save: any;
  public errorNumber: any="";
  public number: any;
  public propertyNumber: any;
  public number_add: any;
  public isErrorNumber:any = 1;
  public save_number_succ:any;
  public save_number_failed:any;
  public returnUpdateWorkOrderData:any;
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
  constructor(private camera: Camera,private workorderService: WorkorderService,private translate: TranslateService,private globalization: Globalization,private modalController: ModalController,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
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
    this.translate.get('property_Number').subscribe((res: string) => {
      this.pageTitle = res;
    });
    this.translate.get('save').subscribe((res: string) => {
      this.save = res;
    });
    this.translate.get('number').subscribe((res: string) => {
      this.number = res;
    });
    this.translate.get('number_add').subscribe((res: string) => {
      this.number_add = res;
    });
    this.translate.get('save_number_succ').subscribe((res: string) => {
      this.save_number_succ = res;
    });
    this.translate.get('save_number_failed').subscribe((res: string) => {
      this.save_number_failed = res;
    });
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    await this.checkLoginUser();
    this.userId = await this.storage.get('userId');
    await this.functionCheckData(this.eventId,this.ordersId,this.workSiteAddressId);
  }
  checkPropertyNumber(event:any){
    this.errorNumber = "ionItemStyleSuccess";
    this.isErrorNumber = 1;
    this.propertyNumber = event.target.value;
    if(this.propertyNumber == "" || this.propertyNumber == undefined || this.propertyNumber == 0){
      this.errorNumber = "ionItemStyleError";
      this.isErrorNumber = 0;
    }
    this.isdisabled = true;
  }
  functionCheckData(eventId:any,ordersId:any,workSiteAddressId:any){
    let sendValues = {'eventId':eventId,'ordersId':ordersId,'workSiteAddressId':workSiteAddressId};
    this.workorderService.checkInspectionByOrder(sendValues).then(async data=>{
      this.returnCheckDataOperationData = data;
      let errorData = this.returnCheckDataOperationData.Error.ErrorCode;
      if(errorData == 1){
        this.propertyNumber = this.returnCheckDataOperationData.Data.propertyNumber
      }
    }).catch(error=>{
      this.functionCheckData(eventId,ordersId,workSiteAddressId)
    });
  }
  functionPropertyNumberTask(){
    if(this.propertyNumber == undefined || this.propertyNumber == "" || this.propertyNumber == 0){
      this.errorNumber = "ionItemStyleError";
      this.isErrorNumber = 0;
      this.isdisabled = false;
      return false;
    }
    let sendValues = {'workSiteAddressId':this.workSiteAddressId,'val':this.propertyNumber,'type':5};
    this.workorderService.updateWorkOrderData(sendValues).then(async data=>{
      this.returnUpdateWorkOrderData = data;
      let errorData = this.returnUpdateWorkOrderData.Error.ErrorCode;
      if(errorData==1){
        this.displayResult(this.save_number_succ);
        this.modalController.dismiss({
          "key":1
        })
      }
      else if(errorData==5)
        this.displayResult(this.save_number_failed);
      else
        this.displayResult(this.save_number_failed);
    }).catch(error=>{
      this.displayResult(this.save_number_failed);
    });
    this.isdisabled = true;
    return true;
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
  functionClosePage(){
    this.modalController.dismiss({
      "key":1
    })
  }
}
