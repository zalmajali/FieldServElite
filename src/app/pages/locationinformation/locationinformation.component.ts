import { Component, OnInit,Input,ViewChild,ElementRef } from '@angular/core';
import {LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import {Storage} from '@ionic/storage-angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import {WorkorderService} from "../../service/workorder.service";
@Component({
  selector: 'app-locationinformation',
  templateUrl: './locationinformation.component.html',
  styleUrls: ['./locationinformation.component.scss'],
})
export class LocationinformationComponent  implements OnInit {
  @Input() eventId: string | any;
  @Input() ordersId: string | any;
  @Input() workSiteAddressId: string | any;
  public isdisabled:boolean=true;
  public pageTitle: any;
  public governorate_name: any;
  public city_name: any;
  public district_name: any;
  public neighborhood_name: any;
  public street_no: any;
  public street_name: any;
  public address: any;
  public property_name: any;
  public property_number: any;
  public barcode_data: any;
  public private_note: any;
  public zone_number: any;
  public returnLocationInformationResultData: any;

  public countZones: any;
  public governorateName: any;
  public cityName: any;
  public districtName: any;
  public neighborhoodName: any;
  public streetNo: any;
  public streetName: any;
  public addressLine1: any;
  public addressLine2: any;
  public propertyName: any;
  public propertyNumber: any;
  public barcode: any;
  public image: any;
  public image_data: any;
  public privateNote: any;
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
  constructor(private workorderService: WorkorderService,private translate: TranslateService,private globalization: Globalization,private modalController: ModalController,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
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
    this.translate.get('workorders_options_seven').subscribe((res: string) => {
      this.pageTitle = res;
    });
    this.translate.get('governorate_name').subscribe((res: string) => {
      this.governorate_name = res;
    });
    this.translate.get('city_name').subscribe((res: string) => {
      this.city_name = res;
    });
    this.translate.get('district_name').subscribe((res: string) => {
      this.district_name = res;
    });
    this.translate.get('neighborhood_name').subscribe((res: string) => {
      this.neighborhood_name = res;
    });
    this.translate.get('street_no').subscribe((res: string) => {
      this.street_no = res;
    });
    this.translate.get('street_name').subscribe((res: string) => {
      this.street_name = res;
    });
    this.translate.get('address').subscribe((res: string) => {
      this.address = res;
    });
    this.translate.get('property_name').subscribe((res: string) => {
      this.property_name = res;
    });
    this.translate.get('property_number').subscribe((res: string) => {
      this.property_number = res;
    });
    this.translate.get('barcode').subscribe((res: string) => {
      this.barcode_data = res;
    });
    this.translate.get('private_note').subscribe((res: string) => {
      this.private_note = res;
    });
    this.translate.get('zone_number').subscribe((res: string) => {
      this.zone_number = res;
    });
    this.translate.get('Image').subscribe((res: string) => {
      this.image_data = res;
    });
  }
 async ngOnInit() {
    await this.getDeviceLanguage();
    await this.checkLoginUser();
    await this.functionLocationInformation(this.eventId,this.ordersId,this.workSiteAddressId);
  }
  functionLocationInformation(eventId:any,ordersId:any,workSiteAddressId:any){
    let sendValues = {'eventId':eventId,'ordersId':ordersId,'workSiteAddressId':workSiteAddressId};
    this.workorderService.locationInformation(sendValues).then(async data=>{
      this.returnLocationInformationResultData = data;
      let errorData = this.returnLocationInformationResultData.Error.ErrorCode;
      if(errorData == 1){
        this.countZones = this.returnLocationInformationResultData.Data.countZones;
        this.governorateName = this.returnLocationInformationResultData.Data.governorateName;
        this.cityName = this.returnLocationInformationResultData.Data.cityName;
        this.districtName = this.returnLocationInformationResultData.Data.districtName;
        this.neighborhoodName = this.returnLocationInformationResultData.Data.neighborhoodName;
        this.streetNo = this.returnLocationInformationResultData.Data.streetNo;
        this.streetName = this.returnLocationInformationResultData.Data.streetName;
        this.addressLine1 = this.returnLocationInformationResultData.Data.addressLine1;
        this.addressLine2 = this.returnLocationInformationResultData.Data.addressLine2;
        this.propertyName = this.returnLocationInformationResultData.Data.propertyName;
        this.propertyNumber = this.returnLocationInformationResultData.Data.propertyNumber;
        this.barcode = this.returnLocationInformationResultData.Data.barcode;
        this.image = this.returnLocationInformationResultData.Data.image;
        this.privateNote = this.returnLocationInformationResultData.Data.privateNote;
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
  functionClosePage(){
    this.modalController.dismiss({
      "key":1
    })
  }
}
