import { Component, OnInit,Input } from '@angular/core';
import {LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import {Storage} from '@ionic/storage-angular';
import {ActivatedRoute, Router} from '@angular/router';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import {UsersService} from "../../service/users.service";
import {WorkorderService} from "../../service/workorder.service";
@Component({
  selector: 'app-zonesadd',
  templateUrl: './zonesadd.component.html',
  styleUrls: ['./zonesadd.component.scss'],
})
export class ZonesaddComponent  implements OnInit {
  @Input() ordersId: string | any;
  @Input() workSiteAddressId: string | any;
  public pageTitle: any;
  public isdisabled:boolean=true;
  public add_zone_button: any;
  public zone_name_add_succ: any;
  public zone_name_add_failed: any;
  public returnZoneAddResultData: any;
//add zone
  public zoneName:any="";
  public errorZoneName:any="";
  public isErrorZoneName:any = 1;
  public zone_name_placeholder: any;
  public error_message_zone_name: any;
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
  constructor(private workorderService: WorkorderService,private activaterouter : ActivatedRoute,private usersService: UsersService,private callNumber: CallNumber,private globalization: Globalization, private translate: TranslateService,private modalController: ModalController,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','forgotpassword');//edit in heare
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss({
        "key":1
      })
    });
  }
  initialiseTranslation(){
    this.translate.get('menuDirection').subscribe((res: string) => {
      this.menuDirection = res;
    });
    this.translate.get('menuDirectionTow').subscribe((res: string) => {
      this.menuDirectionTow = res;
    });
    this.translate.get('add_zone').subscribe((res: string) => {
      this.pageTitle = res;
    });
    this.translate.get('add_zone_button').subscribe((res: string) => {
      this.add_zone_button = res;
    });
    this.translate.get('zone_name_placeholder').subscribe((res: string) => {
      this.zone_name_placeholder = res;
    });
    this.translate.get('error_message_zone_name').subscribe((res: string) => {
      this.error_message_zone_name = res;
    });
    this.translate.get('zone_name_add_succ').subscribe((res: string) => {
      this.zone_name_add_succ = res;
    });
    this.translate.get('zone_name_add_failed').subscribe((res: string) => {
      this.zone_name_add_failed = res;
    });
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    await this.checkLoginUser();
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
  checkZoneName(event:any){
    this.errorZoneName = "ionItemStyleSuccess";
    this.isErrorZoneName = 1;
    this.zoneName = event.target.value;
    if(this.zoneName == "" || this.zoneName == undefined){
      this.errorZoneName = "ionItemStyleError";
      this.isErrorZoneName = 0;
    }
  }
  async functionAddNewZone(){
    if(this.zoneName == undefined || this.zoneName == ""){
      this.errorZoneName = "ionItemStyleError";
      this.isErrorZoneName = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.zoneName != undefined && this.ordersId != undefined && this.workSiteAddressId != undefined) {
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 1500,
      });
      let sendValues = {'zoneName':this.zoneName,'ordersId':this.ordersId,'workSiteAddressId':this.workSiteAddressId};
      this.workorderService.addZone(sendValues).then(async data=>{
        this.returnZoneAddResultData = data;
        let errorData = this.returnZoneAddResultData.Error.ErrorCode;
        if(errorData == 1){
          this.displayResult(this.zone_name_add_succ);
          this.modalController.dismiss({
            "key":1
          })
        }else if(errorData == 2){
          this.displayResult(this.zone_name_add_failed);
        }else if(errorData == 3 || errorData == 4){
          this.displayResult(this.zone_name_add_failed);
        }
      });
      await loading.present();
      this.isdisabled = true;
    }
    return true;
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
