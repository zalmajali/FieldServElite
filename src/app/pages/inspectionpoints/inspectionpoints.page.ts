import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController,ModalController, NavController, Platform, ToastController,AlertController} from "@ionic/angular";
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import {Storage} from '@ionic/storage-angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from "../../service/users.service";
import {WorkorderService} from "../../service/workorder.service";
import {ShowdataComponent} from "../showdata/showdata.component";
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import {InspectionpointsService} from "../../service/inspectionpoints.service";
@Component({
  selector: 'app-inspectionpoints',
  templateUrl: './inspectionpoints.page.html',
  styleUrls: ['./inspectionpoints.page.scss'],
})
export class InspectionpointsPage implements OnInit {
  public pageTitle: any;
  public isdisabled:boolean=true;
  public inspectionpoints_options_one: any;
  public inspectionpoints_options_tow: any;
  public inspectionpoints_options_three: any;
  public inspectionpoints_add: any;
  public error_inspection_larg: any;
  public error_inspection_small: any;
  public ip_type: any;
  public ip_zone: any;
  public ip_event: any;
  public ip_status: any;
  public ip_location: any;
  public ip_barcode: any;
  public ip_qrCode: any;
  public ordersId: any;
  public eventId: any;
  public zoneId: any;
  public branchType: any;
  public workSiteAddressId: any;
  public branchId: any;
  public inPoints: any;
  public returnIPData:any;
  public returnArrayIPFromServer:any;
  public returnIPArray:any = [];
  public operationIPResult:any;
  public ip_observation_menue:any;
  public floatD: any;
  public are_you_sure:any;
  public yes:any;
  public no:any;
  public workorders_loc_msg_one: any;
  public workorders_loc_msg_tow: any;
  public lat: any;
  public lng: any;
  public returnInspectionLocationResultData: any;
  public ip_type_add_location_succ: any;
  public ip_name_add_location_failed_data: any;
  public ip_name_add_location_failed: any;
  public returnDeleteInspectionResult: any;
  public inspection_name_delete_succ: any;
  public inspection_name_delete_failed: any;
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
  constructor(private alertController:AlertController,private geolocation: Geolocation,private inspectionpointsService: InspectionpointsService,private workorderService: WorkorderService,private activaterouter : ActivatedRoute,private usersService: UsersService,private globalization: Globalization, private translate: TranslateService,private modalController: ModalController,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
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
    this.translate.get('inspectionpoints_title').subscribe((res: string) => {
      this.pageTitle = res;
    });
    this.translate.get('inspectionpoints_options_one').subscribe((res: string) => {
      this.inspectionpoints_options_one = res;
    });
    this.translate.get('inspectionpoints_options_tow').subscribe((res: string) => {
      this.inspectionpoints_options_tow = res;
    });
    this.translate.get('inspectionpoints_options_three').subscribe((res: string) => {
      this.inspectionpoints_options_three = res;
    });
    this.translate.get('error_inspection_larg').subscribe((res: string) => {
      this.error_inspection_larg = res;
    });
    this.translate.get('error_inspection_small').subscribe((res: string) => {
      this.error_inspection_small = res;
    });
    this.translate.get('inspectionpoints_add').subscribe((res: string) => {
      this.inspectionpoints_add = res;
    });
    this.translate.get('ip_type').subscribe((res: string) => {
      this.ip_type = res;
    });
    this.translate.get('ip_zone').subscribe((res: string) => {
      this.ip_zone = res;
    });
    this.translate.get('ip_event').subscribe((res: string) => {
      this.ip_event = res;
    });
    this.translate.get('ip_status').subscribe((res: string) => {
      this.ip_status = res;
    });
    this.translate.get('ip_location').subscribe((res: string) => {
      this.ip_location = res;
    });
    this.translate.get('ip_barcode').subscribe((res: string) => {
      this.ip_barcode = res;
    });
    this.translate.get('ip_qrCode').subscribe((res: string) => {
      this.ip_qrCode = res;
    });
    this.translate.get('ip_observation_menue').subscribe((res: string) => {
      this.ip_observation_menue = res;
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
    this.translate.get('workorders_loc_msg_one').subscribe((res: string) => {
      this.workorders_loc_msg_one = res;
    });
    this.translate.get('workorders_loc_msg_tow').subscribe((res: string) => {
      this.workorders_loc_msg_tow = res;
    });
    this.translate.get('ip_type_add_location_succ').subscribe((res: string) => {
      this.ip_type_add_location_succ = res;
    });
    this.translate.get('ip_name_add_location_failed_data').subscribe((res: string) => {
      this.ip_name_add_location_failed_data = res;
    });
    this.translate.get('ip_name_add_location_failed').subscribe((res: string) => {
      this.ip_name_add_location_failed = res;
    });

    this.translate.get('inspection_name_delete_succ').subscribe((res: string) => {
      this.inspection_name_delete_succ = res;
    });
    this.translate.get('inspection_name_delete_failed').subscribe((res: string) => {
      this.inspection_name_delete_failed = res;
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
    this.branchId = await this.storage.get('branch_id');
    this.branchType = await this.storage.get('branch_type');
    this.ordersId = await this.storage.get('ordersIdOperation');
    this.eventId = await this.storage.get('eventIdOperation');
    this.workSiteAddressId = await this.storage.get('workSiteAddressIdOperation');
    await this.storage.set('inspIdOperation','0');
    this.activaterouter.params.subscribe(async (params:any) => {
      if(params['zoneId']!="" && params['zoneId']!=null && params['zoneId']!=undefined && params['zoneId']!=0){
        this.zoneId = params['zoneId'];
        await this.storage.set('zoneIdOperation',this.zoneId);
      }else{
        this.zoneId = await this.storage.get('zoneIdOperation');
      }
      this.functionGetAllInspectionPoints(this.ordersId,this.eventId,this.zoneId,this.workSiteAddressId,this.branchId)
    });
    await loading.present();
  }
  async functionGetAllInspectionPoints(ordersId:any,eventId:any,zoneId:any,workSiteAddressId:any,branchId:any){
    let sendValues = {'ordersId':ordersId,'eventId':eventId,'workSiteAddressId':workSiteAddressId,'zoneId':zoneId,'branchId':branchId};
    this.workorderService.inspectionsPoints(sendValues).then(async data=>{
      this.returnIPData = data;
      this.operationIPResult = this.returnIPData.Error.ErrorCode;
      if(this.operationIPResult==1){
        this.returnArrayIPFromServer = this.returnIPData.Data.inspectioPoints;
        this.returnIPArray=[];
        for(let i = 0; i < this.returnArrayIPFromServer.length;i++) {
          this.returnIPArray[i]=[];
          this.returnIPArray[i]['IPId'] = this.returnArrayIPFromServer[i].IPId;
          this.returnIPArray[i]['inspntTypeName'] = this.returnArrayIPFromServer[i].inspntTypeName;
          this.returnIPArray[i]['wororderEventName'] = this.returnArrayIPFromServer[i].wororderEventName;
          this.returnIPArray[i]['locationName'] = this.returnArrayIPFromServer[i].locationName;
          this.returnIPArray[i]['siteAddressZoneName'] = this.returnArrayIPFromServer[i].siteAddressZoneName;
          this.returnIPArray[i]['inspntStatusName'] = this.returnArrayIPFromServer[i].inspntStatusName;
          this.returnIPArray[i]['barcode'] = this.returnArrayIPFromServer[i].barcode;
          this.returnIPArray[i]['typeCode'] = this.returnArrayIPFromServer[i].typeCode;
          this.returnIPArray[i]['qrCode'] = this.returnArrayIPFromServer[i].qrCode;
          this.returnIPArray[i]['geolocation'] = this.returnArrayIPFromServer[i].geolocation;
          this.returnIPArray[i]['image'] = this.returnArrayIPFromServer[i].image;
          this.returnIPArray[i]['note'] = this.returnArrayIPFromServer[i].note;
        }
        let countOfData = this.returnIPArray.length;
        if(countOfData == 0)
          this.inPoints = 0;
        else{
          this.inPoints = 1;
        }
      }else
        this.inPoints = 0;
    }).catch(error=>{
      this.functionGetAllInspectionPoints(ordersId,eventId,zoneId,workSiteAddressId,branchId)
    });
  }
  async functionAddGoLocation(IPId:any){
    await this.geolocation.getCurrentPosition().then(async (resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
    })
    let sendValues = {'inspId':IPId,'lat':this.lat,'lng':this.lng};
    await this.inspectionpointsService.addInspectionLocation(sendValues).then(async data=>{
      this.returnInspectionLocationResultData = data;
      let errorData = this.returnInspectionLocationResultData.Error.ErrorCode;
      if(errorData == 1){
        this.displayResult(this.ip_type_add_location_succ);
      }else if(errorData == 2){
        this.displayResult(this.ip_name_add_location_failed_data);
      }else if(errorData == 3){
        this.displayResult(this.ip_name_add_location_failed);
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
  async functionInspectionPointsDelete(inspId:any){
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
            let sendValues = {'eventId':this.eventId,'zoneId':this.zoneId,'inspId':inspId};
            this.inspectionpointsService.deleteInspectionPoints(sendValues).then(async data=>{
              this.returnDeleteInspectionResult = data;
              let errorData = this.returnDeleteInspectionResult.Error.ErrorCode;
              if(errorData == 1){
                this.ngOnInit();
                this.displayResult(this.inspection_name_delete_succ)
              }
              else if(errorData == 2 || errorData == 3 || errorData == 3)
                this.displayResult(this.inspection_name_delete_failed)
              else
                this.displayResult(this.inspection_name_delete_failed)
            });
          }
        }
      ]
    });
    await alert.present();
  }
  functionInspectionPointsAdd(){
    this.navCtrl.navigateRoot('inspectionpointsadd');
  }
  functionInspectionPointsEdit(inspId:any){
    this.navCtrl.navigateRoot(['inspectionpointsadd', {inspId:inspId}]);
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
  async functionShowData(data:any,type:any){
    let model = await this.modalController.create({
      component:ShowdataComponent,
      animated:true,
      componentProps:{data:data,type:type},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
    });
    await model.present();
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
