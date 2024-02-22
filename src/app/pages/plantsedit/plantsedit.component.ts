import { Component, OnInit,Input } from '@angular/core';
import {LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import {Storage} from '@ionic/storage-angular';
import {ActivatedRoute, Router} from '@angular/router';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {InspectionpointsService} from "../../service/inspectionpoints.service";
@Component({
  selector: 'app-plantsedit',
  templateUrl: './plantsedit.component.html',
  styleUrls: ['./plantsedit.component.scss'],
})
export class PlantseditComponent  implements OnInit {
  @Input() inspId: string | any;
  @Input() planetId: string | any;
  @Input() plantsName: string | any;
  @Input() amount: string | any;
  public isdisabled:boolean=true;
  public pageTitle: any;
  public ordersId: any;
  public eventId: any;
  public workSiteAddressId: any;
  public branchId: any;
  public zoneId: any;
  public select: any;
  public plants_add: any;
  public edit_plants: any;
  public operationPlantsOpResult:any;
  public returnPlantsOpData:any;
  public returnArrayPlantsOpFromServer:any;
  public returnPlantsOpArray:any = [];
  public returnAddPlantsResultData:any;
  public plants_name_edit_succ:any;
  public plants_name_edit_failed:any;
  public plants_name_edit_failed_data:any;
  //mat name
  public errorPlantsName: any="";
  public isErrorPlantsName:any = 1;
  public plants_name: any;
  public plants_name_add: any;
  //mat name
  public errorAmount: any="";
  public isErrorAmount:any = 1;
  public plants_amount: any;
  public plants_amount_add: any;

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
  constructor(private inspectionpointsService: InspectionpointsService,private activaterouter : ActivatedRoute,private globalization: Globalization, private translate: TranslateService,private modalController: ModalController,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
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
    this.translate.get('plants_edit').subscribe((res: string) => {
      this.pageTitle = res;
    });
    this.translate.get('select').subscribe((res: string) => {
      this.select = res;
    });
    this.translate.get('plants_name').subscribe((res: string) => {
      this.plants_name = res;
    });
    this.translate.get('plants_name_add').subscribe((res: string) => {
      this.plants_name_add = res;
    });
    this.translate.get('plants_amount').subscribe((res: string) => {
      this.plants_amount = res;
    });
    this.translate.get('plants_amount_add').subscribe((res: string) => {
      this.plants_amount_add = res;
    });
    this.translate.get('edit_plants').subscribe((res: string) => {
      this.edit_plants = res;
    });
    this.translate.get('plants_name_edit_succ').subscribe((res: string) => {
      this.plants_name_edit_succ = res;
    });
    this.translate.get('plants_name_edit_failed').subscribe((res: string) => {
      this.plants_name_edit_failed = res;
    });
    this.translate.get('plants_name_edit_failed_data').subscribe((res: string) => {
      this.plants_name_edit_failed_data = res;
    });
  }
  async ngOnInit() {
    this.branchId = await this.storage.get('branch_id');
    this.ordersId = await this.storage.get('ordersIdOperation');
    this.eventId = await this.storage.get('eventIdOperation');
    this.zoneId = await this.storage.get('zoneIdOperation');
    this.workSiteAddressId = await this.storage.get('workSiteAddressIdOperation');
    await this.getDeviceLanguage();
    await this.checkLoginUser();
    await this.functionGetPlantsOperation(this.eventId,this.inspId,this.zoneId,this.branchId);
  }
  functionGetPlantsOperation(eventId:any,inspId:any,zoneId:any,branchId:any){
    let sendValues = {'eventId':eventId,'inspId':inspId,'zoneId':zoneId,'branchId':branchId};
    this.inspectionpointsService.plantsOperation(sendValues).then(async data=>{
      this.returnPlantsOpData = data;
      this.operationPlantsOpResult = this.returnPlantsOpData.Error.ErrorCode;
      if(this.operationPlantsOpResult==1){
        this.returnPlantsOpArray=[];
        this.returnArrayPlantsOpFromServer = this.returnPlantsOpData.Data.plants;
        for(let i = 0; i < this.returnArrayPlantsOpFromServer.length;i++) {
          this.returnPlantsOpArray[i]=[];
          this.returnPlantsOpArray[i]['id'] = this.returnArrayPlantsOpFromServer[i].id;
          this.returnPlantsOpArray[i]['name'] = this.returnArrayPlantsOpFromServer[i].name;
        }
      }
    }).catch(error=>{
      this.functionGetPlantsOperation(eventId,inspId,zoneId,branchId)
    });
  }
  selectPlantsName(event:any){
    this.errorPlantsName = "ionItemStyleSuccess";
    this.isErrorPlantsName = 1;
    this.plantsName = event.target.value;
    if(this.plantsName == "" || this.plantsName == undefined || this.plantsName == 0){
      this.errorPlantsName = "ionItemStyleError";
      this.isErrorPlantsName = 0;
    }
    this.isdisabled = true;
  }
  checkAmount(event:any){
    this.errorAmount = "ionItemStyleSuccess";
    this.isErrorAmount = 1;
    this.amount = event.target.value;
    if(this.amount == "" || this.amount == undefined || this.amount == 0){
      this.errorAmount = "ionItemStyleError";
      this.isErrorAmount = 0;
    }
    this.isdisabled = true;
  }
  functionEditPlants() {
    if(this.plantsName == undefined || this.plantsName == "" || this.plantsName == 0){
      this.errorPlantsName = "ionItemStyleError";
      this.isErrorPlantsName = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.amount == undefined || this.amount == ""){
      this.errorAmount = "ionItemStyleError";
      this.isErrorAmount = 0;
      this.isdisabled = false;
      return false;
    }
    let sendValues = {'zoneId':this.zoneId,'eventId':this.eventId,'inspId':this.inspId,'plantsId':this.plantsName,'woPlantsId':this.planetId,'amount':this.amount};
    this.inspectionpointsService.editPlants(sendValues).then(async data=>{
      this.returnAddPlantsResultData = data;
      let errorData = this.returnAddPlantsResultData.Error.ErrorCode;
      if(errorData == 1){
        this.displayResult(this.plants_name_edit_succ);
        this.modalController.dismiss({
          "key":1
        })
      }else if(errorData == 2){
        this.displayResult(this.plants_name_edit_failed);
      }else if(errorData == 3 || errorData == 4 || errorData == 5){
        this.displayResult(this.plants_name_edit_failed_data);
      }
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
