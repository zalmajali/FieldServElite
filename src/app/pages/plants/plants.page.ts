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
import {InspectionpointsService} from "../../service/inspectionpoints.service";
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File,Entry } from '@awesome-cordova-plugins/file/ngx';
import {PlantsaddComponent} from "../plantsadd/plantsadd.component";
import {PlantseditComponent} from "../plantsedit/plantsedit.component";
@Component({
  selector: 'app-plants',
  templateUrl: './plants.page.html',
  styleUrls: ['./plants.page.scss'],
})
export class PlantsPage implements OnInit {
  public pageTitle: any;
  public isdisabled:boolean=true;
  public plants_name: any;
  public plants_amount: any;
  public plants_options_One: any;
  public plants_options_tow: any;
  public error_plants_small: any;
  public error_plants_larg: any;
  public ordersId: any;
  public eventId: any;
  public inspctionType: any;
  public workSiteAddressId: any;
  public branchId: any;
  public zoneId: any;
  public branchType: any;
  public inspId: any;
  public returnDeletePlantsResult:any;
  public operationPlantsResult:any;
  public returnPlantsData:any;
  public returnArrayPlantsFromServer:any;
  public returnPlantsArray:any = [];
  public plants:any;
  public are_you_sure:any;
  public yes:any;
  public no:any;
  public ip_plants_menue: any;
  public plants_name_delete_succ: any;
  public plants_name_delete_failed: any;
  public userIdAddIns: any;
  public returnEndInspectionData: any;
  public inspction_end_succ: any;
  public inspction_end_failed: any;
  //add data Inspection points
  public ip_type_menue: any;
  public ip_observation_menue: any;
  public ip_target_Pest_menue: any;
  public ip_target_material_menue: any;
  public ip_target_planet_menue: any;
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
  constructor(private alertController:AlertController,private transfer: FileTransfer,private file: File,private camera: Camera,private workorderService: WorkorderService,private inspectionpointsService: InspectionpointsService,private activaterouter : ActivatedRoute,private usersService: UsersService,private globalization: Globalization, private translate: TranslateService,private modalController: ModalController,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
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
    this.translate.get('plants_title').subscribe((res: string) => {
      this.pageTitle = res;
    });
    this.translate.get('plants_name').subscribe((res: string) => {
      this.plants_name = res;
    });
    this.translate.get('plants_amount').subscribe((res: string) => {
      this.plants_amount = res;
    });
    this.translate.get('plants_options_One').subscribe((res: string) => {
      this.plants_options_One = res;
    });
    this.translate.get('plants_options_tow').subscribe((res: string) => {
      this.plants_options_tow = res;
    });
    this.translate.get('error_plants_small').subscribe((res: string) => {
      this.error_plants_small = res;
    });
    this.translate.get('error_plants_larg').subscribe((res: string) => {
      this.error_plants_larg = res;
    });
    this.translate.get('ip_type_menue').subscribe((res: string) => {
      this.ip_type_menue = res;
    });
    this.translate.get('ip_target_material_menue').subscribe((res: string) => {
      this.ip_target_material_menue = res;
    });
    this.translate.get('ip_target_Pest_menue').subscribe((res: string) => {
      this.ip_target_Pest_menue = res;
    });
    this.translate.get('ip_target_planet_menue').subscribe((res: string) => {
      this.ip_target_planet_menue = res;
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
    this.translate.get('ip_plants_menue').subscribe((res: string) => {
      this.ip_plants_menue = res;
    });
    this.translate.get('plants_name_delete_succ').subscribe((res: string) => {
      this.plants_name_delete_succ = res;
    });
    this.translate.get('plants_name_delete_failed').subscribe((res: string) => {
      this.plants_name_delete_failed = res;
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
      await this.functionPlantsInfo(this.ordersId,this.inspId);
    });
    await loading.present();
  }
  functionPlantsInfo(ordersId:any,inspId:any){
    let sendValues = {'ordersId':ordersId,'inspId':inspId};
    this.inspectionpointsService.plants(sendValues).then(async data=>{
      this.returnPlantsData = data;
      this.operationPlantsResult = this.returnPlantsData.Error.ErrorCode;
      if(this.operationPlantsResult==1){
        this.returnArrayPlantsFromServer = this.returnPlantsData.Data.woInspntPlants;
        this.returnPlantsArray=[];
        for(let i = 0; i < this.returnArrayPlantsFromServer.length;i++) {
          this.returnPlantsArray[i]=[];
          this.returnPlantsArray[i]['id'] = this.returnArrayPlantsFromServer[i].id;
          this.returnPlantsArray[i]['plantId'] = this.returnArrayPlantsFromServer[i].plantId;
          this.returnPlantsArray[i]['plantName'] = this.returnArrayPlantsFromServer[i].plantName;
          this.returnPlantsArray[i]['amount'] = this.returnArrayPlantsFromServer[i].amount;
        }
        let countOfData = this.returnPlantsArray.length;
        if(countOfData == 0)
          this.plants = 0;
        else{
          this.plants = 1;
        }
      }else
        this.plants = 0;
    }).catch(error=>{
      this.functionPlantsInfo(ordersId,inspId)
    });
  }
  functionInspectionPoints(zoneId:any){
    this.navCtrl.navigateRoot(['/inspectionpoints', {zoneId:zoneId}]);
  }
  functionTargetpests(inspId:any){
    this.navCtrl.navigateRoot(['/targetpests', {inspId:inspId}]);
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
  async functionPlantsAdd(inspId:any){
    let model = await this.modalController.create({
      component:PlantsaddComponent,
      animated:true,
      componentProps:{inspId:inspId},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
      this.ngOnInit();
    });
    await model.present();
  }
  async functionPlantsEdit(planetId:any,plantName:any,amount:any){
    let model = await this.modalController.create({
      component:PlantseditComponent,
      animated:true,
      componentProps:{planetId:planetId,inspId:this.inspId,amount:amount,plantsName:plantName},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
      this.ngOnInit();
    });
    await model.present();
  }
  async functionPlantsDelete(planetId:any){
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
            let sendValues = {'eventId':this.eventId,'zoneId':this.zoneId,'inspId':this.inspId,'woPlantsId':planetId};
            this.inspectionpointsService.deletePlants(sendValues).then(async data=>{
              this.returnDeletePlantsResult = data;
              let errorData = this.returnDeletePlantsResult.Error.ErrorCode;
              if(errorData == 1){
                this.ngOnInit();
                this.displayResult(this.plants_name_delete_succ)
              }
              else if(errorData == 2 || errorData == 3 || errorData == 3)
                this.displayResult(this.plants_name_delete_failed)
              else
                this.displayResult(this.plants_name_delete_failed)
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
