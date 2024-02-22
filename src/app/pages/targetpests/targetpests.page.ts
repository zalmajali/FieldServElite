import { Component, OnInit } from '@angular/core';
import {AlertController,LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import {Storage} from '@ionic/storage-angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from "../../service/users.service";
import {WorkorderService} from "../../service/workorder.service";
import {InspectionpointsService} from "../../service/inspectionpoints.service";
import {TargetpestsaddComponent} from "../targetpestsadd/targetpestsadd.component";
@Component({
  selector: 'app-targetpests',
  templateUrl: './targetpests.page.html',
  styleUrls: ['./targetpests.page.scss'],
})
export class TargetpestsPage implements OnInit {
  public pageTitle: any;
  public error_target_pest_larg: any;
  public error_target_pest_small: any;
  public target_pest_cat: any;
  public target_pest_pest: any;
  public target_pest_amount: any;
  public target_pest_Ranking: any;
  public ordersId: any;
  public eventId: any;
  public branchType: any;
  public workSiteAddressId: any;
  public branchId: any;
  public zoneId: any;
  public inspId: any;
  public inspctionType: any;
  public operationTargetPestsResult:any;
  public returnTargetPestsData:any;
  public returnArrayTargetPestsFromServer:any;
  public returnTargetPestsArray:any = [];
  public targetPests:any;
  public are_you_sure:any;
  public yes:any;
  public no:any;
  public returnDeleteTargetPestsResult:any;
  public error_target_delete_one:any;
  public error_target_delete_tow:any;
  public error_target_delete_three:any;
  public ip_plants_menue: any;
  public userIdAddIns: any;
  public returnEndInspectionData: any;
  public inspction_end_succ: any;
  public inspction_end_failed: any;
//check login
  public fullName:any;
  public userId:any;
  public username:any;
  public password:any;
  //check
  public woInspntPlantsId: any=0;
  public woInspntProductsId: any=0;
  public woInspntTargetPestsId: any=0;
  public woInspntMaterialsId: any=0;
  public woInspntObservationsId: any=0;
  public returnCheckInspectionPointsResultData: any;
  public editInformation: any=2;
  public inspectionpointsEdit_title: any;
  //add data Inspection points
  public ip_type_menue: any;
  public ip_observation_menue: any;
  public ip_target_Pest_menue: any;
  public ip_target_material_menue: any;
  public ip_target_planet_menue: any;
  //add for all pages
  public menuDirection: any;
  public menuDirectionTow: any;
  public checkLanguage: any=0;
  public language: any;
  public showMenueValue: any=2;
  public showNotificationIcon: any=1;
  constructor(private workorderService: WorkorderService,private alertController:AlertController,private inspectionpointsService: InspectionpointsService,private activaterouter : ActivatedRoute,private usersService: UsersService,private globalization: Globalization, private translate: TranslateService,private modalController: ModalController,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
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
    this.translate.get('target_pest_title').subscribe((res: string) => {
      this.pageTitle = res;
    });
    this.translate.get('error_target_pest_small').subscribe((res: string) => {
      this.error_target_pest_small = res;
    });
    this.translate.get('error_target_pest_larg').subscribe((res: string) => {
      this.error_target_pest_larg = res;
    });
    this.translate.get('ip_type_menue').subscribe((res: string) => {
      this.ip_type_menue = res;
    });
    this.translate.get('ip_target_Pest_menue').subscribe((res: string) => {
      this.ip_target_Pest_menue = res;
    });
    this.translate.get('ip_target_material_menue').subscribe((res: string) => {
      this.ip_target_material_menue = res;
    });
    this.translate.get('ip_target_planet_menue').subscribe((res: string) => {
      this.ip_target_planet_menue = res;
    });
    this.translate.get('target_pest_cat').subscribe((res: string) => {
      this.target_pest_cat = res;
    });
    this.translate.get('target_pest_pest').subscribe((res: string) => {
      this.target_pest_pest = res;
    });
    this.translate.get('target_pest_amount').subscribe((res: string) => {
      this.target_pest_amount = res;
    });
    this.translate.get('target_pest_Ranking').subscribe((res: string) => {
      this.target_pest_Ranking = res;
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
    this.translate.get('ip_observation_menue').subscribe((res: string) => {
      this.ip_observation_menue = res;
    });
    this.translate.get('error_target_delete_one').subscribe((res: string) => {
      this.error_target_delete_one = res;
    });
    this.translate.get('error_target_delete_tow').subscribe((res: string) => {
      this.error_target_delete_tow = res;
    });
    this.translate.get('error_target_delete_three').subscribe((res: string) => {
      this.error_target_delete_three = res;
    });
    this.translate.get('ip_plants_menue').subscribe((res: string) => {
      this.ip_plants_menue = res;
    });
    this.translate.get('inspction_end_succ').subscribe((res: string) => {
      this.inspction_end_succ = res;
    });
    this.translate.get('inspction_end_failed').subscribe((res: string) => {
      this.inspction_end_failed = res;
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
    this.zoneId = await this.storage.get('zoneIdOperation');
    this.workSiteAddressId = await this.storage.get('workSiteAddressIdOperation');
    this.inspctionType = await this.storage.get('inspctionTypeIdOperation');
    this.userIdAddIns = await this.storage.get('userId');
    this.activaterouter.params.subscribe(async (params:any) => {
      if(params['inspId']!="" && params['inspId']!=null && params['inspId']!=undefined && params['inspId']!=0){
        this.inspId = params['inspId'];
        await this.storage.set('inspIdOperation',this.inspId);
      }else{
        this.inspId = await this.storage.get('inspIdOperation');
      }
      await this.functionGetInformationInspectionPoints();
      await this.functionTargetPestInfo(this.inspId,this.ordersId)
    });
    await loading.present();
  }
  async functionGetInformationInspectionPoints(){
    let sendValues = {'eventId':this.eventId,'zoneId':this.zoneId,'ordersId':this.ordersId,'workSiteAddressId':this.workSiteAddressId,'inspIdOperation':this.inspId};
    await this.inspectionpointsService.checkInspectionPoints(sendValues).then(async data=>{
      this.returnCheckInspectionPointsResultData = data;
      let errorData = this.returnCheckInspectionPointsResultData.Error.ErrorCode;
      if(errorData == 1){
        this.inspctionType = this.returnCheckInspectionPointsResultData.Data.inspctionType;
        this.woInspntPlantsId = this.returnCheckInspectionPointsResultData.Data.woInspntPlantsId;
        this.woInspntProductsId = this.returnCheckInspectionPointsResultData.Data.woInspntProductsId;
        this.woInspntTargetPestsId = this.returnCheckInspectionPointsResultData.Data.woInspntTargetPestsId;
        this.woInspntMaterialsId = this.returnCheckInspectionPointsResultData.Data.woInspntMaterialsId;
        this.woInspntObservationsId = this.returnCheckInspectionPointsResultData.Data.woInspntObservationsId;
      }
    });
  }
  functionInspectionPoints(zoneId:any){
    this.navCtrl.navigateRoot(['/inspectionpoints', {zoneId:zoneId}]);
  }
  functionProduct(inspId:any){
    this.navCtrl.navigateRoot(['/equipment', {inspId:inspId}]);
  }
  functionObservation(inspId:any,inspctionType:any){
    this.navCtrl.navigateRoot(['/observations', {inspId:inspId,inspctionType:inspctionType}]);
  }
  functionMaterial(inspId:any){
    this.navCtrl.navigateRoot(['/materials', {inspId:inspId}]);
  }
  functionPlants(inspId:any){
    this.navCtrl.navigateRoot(['/plants', {inspId:inspId}]);
  }
  async functionTargetpestsAdd(inspId:any){
    let model = await this.modalController.create({
      component:TargetpestsaddComponent,
      animated:true,
      componentProps:{inspId:inspId},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
      this.ngOnInit();
    });
    await model.present();
  }
  async functionDeleteTargetPest(tragtId:any){
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
            let sendValues = {'eventId':this.eventId,'zoneId':this.zoneId,'ordersId':this.ordersId,'workSiteAddressId':this.workSiteAddressId,'inspId':this.inspId,'woTargetinspId':tragtId};
            this.inspectionpointsService.deleteTargetPests(sendValues).then(async data=>{
              this.returnDeleteTargetPestsResult = data;
              let errorData = this.returnDeleteTargetPestsResult.Error.ErrorCode;
              if(errorData == 1){
                this.ngOnInit();
                this.displayResult(this.error_target_delete_one)
              }
              else if(errorData == 2 || errorData == 3 || errorData == 3)
                this.displayResult(this.error_target_delete_tow)
              else
                this.displayResult(this.error_target_delete_three)
            });
          }
        }
      ]
    });
    await alert.present();
  }
  functionTargetPestInfo(inspId:any,ordersId:any){
    let sendValues = {'ordersId':ordersId,'inspId':inspId};
    this.inspectionpointsService.targetPests(sendValues).then(async data=>{
      this.returnTargetPestsData = data;
      this.operationTargetPestsResult = this.returnTargetPestsData.Error.ErrorCode;
      if(this.operationTargetPestsResult==1){
        this.returnArrayTargetPestsFromServer = this.returnTargetPestsData.Data.woInspntTargetPests;
        this.returnTargetPestsArray=[];
        for(let i = 0; i < this.returnArrayTargetPestsFromServer.length;i++) {
          this.returnTargetPestsArray[i]=[];
          this.returnTargetPestsArray[i]['id'] = this.returnArrayTargetPestsFromServer[i].id;
          this.returnTargetPestsArray[i]['categoriesName'] = this.returnArrayTargetPestsFromServer[i].categoriesName;
          this.returnTargetPestsArray[i]['targetPestsName'] = this.returnArrayTargetPestsFromServer[i].targetPestsName;
          this.returnTargetPestsArray[i]['amount'] = this.returnArrayTargetPestsFromServer[i].amount;
          this.returnTargetPestsArray[i]['rankingsName'] = this.returnArrayTargetPestsFromServer[i].rankingsName;
        }
        let countOfData = this.returnTargetPestsArray.length;
        if(countOfData == 0)
          this.targetPests = 0;
        else{
          this.targetPests = 1;
        }
      }else
        this.targetPests = 0;
    }).catch(error=>{
      this.functionTargetPestInfo(inspId,ordersId)
    });
  }
  async functionEndInspectionPoint(inspId:any){
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
            let sendValues = {'userId':this.userIdAddIns,'eventId':this.eventId,'ordersId':this.ordersId,'inspId':inspId};
            this.inspectionpointsService.endInspectionsPoints(sendValues).then(async data=>{
              this.returnEndInspectionData = data;
              let errorData = this.returnEndInspectionData.Error.ErrorCode;
              if(errorData==1){
                this.navCtrl.navigateRoot(['/inspectionpoints', {zoneId:this.zoneId}]);
                this.displayResult(this.inspction_end_succ);
              }
              else if(errorData==5)
                this.displayResult(this.inspction_end_failed);
              else
                this.displayResult(this.inspction_end_failed);
            }).catch(error=>{
              this.displayResult(this.inspction_end_failed);
            });
          }
        }
      ]
    });
    await alert.present();
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
