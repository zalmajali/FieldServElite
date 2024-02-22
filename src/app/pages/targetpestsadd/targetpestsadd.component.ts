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
  selector: 'app-targetpestsadd',
  templateUrl: './targetpestsadd.component.html',
  styleUrls: ['./targetpestsadd.component.scss'],
})
export class TargetpestsaddComponent  implements OnInit {
  @Input() inspId: string | any;
  public isdisabled:boolean=true;
  public pageTitle: any;
  public ordersId: any;
  public eventId: any;
  public workSiteAddressId: any;
  public branchId: any;
  public zoneId: any;
  public eventEventId: any;
  public inspctionTypeId:any;
  public returnTargetPestOperationData:any
  public operationTargetPestOperationResult:any
  public returnTargetPestsArray:any=[];
  public returnTargetRankingsArray:any=[];
  public returnArrayTargetPestsFromServer:any
  public returnArrayTargetRankingsFromServer:any;
  public returnInspectionPointsTypeOperationData: any;
  public returnTargetPestsBySelectArray:any=[];
  public returnArrayTargetPestsSelectFromServer: any;
  public error_target_Add_one: any;
  public error_target_Add_tow: any;
  public error_target_Add_three: any;
  public returnaddTargetPestsResultData: any;
  public select:any;
  //targetCt
  public errorTargetPestsCat: any;
  public category: any;
  public isErrorTargetPestsCat:any = 1;
  public target_pest_cat: any;
  public error_add_target_cat: any;
  //targett
  public errorTargetPests: any;
  public targetPests: any;
  public isErrorTargetPests:any = 1;
  public target_pest_pest: any;
  public error_add_target_target_pest: any;
  //targetCt
  public errorTargetAmount: any;
  public amount: any;
  public isErrorAmount:any = 1;
  public target_pest_amount: any;
  public error_add_target_amount: any;
  //targetCt
  public errorTargetRanking: any;
  public ranking: any;
  public isErrorRanking:any = 1;
  public target_pest_ranking: any;
  public error_add_target_ranking: any;

  public target_add: any;
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
    this.translate.get('menuDirection').subscribe((res: string) => {
      this.menuDirection = res;
    });
    this.translate.get('menuDirectionTow').subscribe((res: string) => {
      this.menuDirectionTow = res;
    });
    this.translate.get('target_add_title').subscribe((res: string) => {
      this.pageTitle = res;
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
    this.translate.get('target_pest_ranking').subscribe((res: string) => {
      this.target_pest_ranking = res;
    });
    this.translate.get('target_add').subscribe((res: string) => {
      this.target_add = res;
    });
    this.translate.get('error_add_target_cat').subscribe((res: string) => {
      this.error_add_target_cat = res;
    });
    this.translate.get('error_add_target_target_pest').subscribe((res: string) => {
      this.error_add_target_target_pest = res;
    });
    this.translate.get('error_add_target_amount').subscribe((res: string) => {
      this.error_add_target_amount = res;
    });
    this.translate.get('error_add_target_ranking').subscribe((res: string) => {
      this.error_add_target_ranking = res;
    });
    this.translate.get('error_add_target_ranking').subscribe((res: string) => {
      this.error_add_target_ranking = res;
    });
    this.translate.get('error_target_Add_one').subscribe((res: string) => {
      this.error_target_Add_one = res;
    });
    this.translate.get('error_target_Add_tow').subscribe((res: string) => {
      this.error_target_Add_tow = res;
    });
    this.translate.get('error_target_Add_three').subscribe((res: string) => {
      this.error_target_Add_three = res;
    });
    this.translate.get('select').subscribe((res: string) => {
      this.select = res;
    });
  }
  async selectCatSelected(val:any){
    this.errorTargetPestsCat = "ionItemStyleSuccess";
    this.isErrorTargetPestsCat = 1;
    this.category = val;
    if(this.category == "" || this.category == undefined || this.category == 0){
      this.errorTargetPestsCat = "ionItemStyleError";
      this.isErrorTargetPestsCat = 0;
    }
    this.isdisabled = true;
  }
  async selectCat(event:any){
    this.errorTargetPestsCat = "ionItemStyleSuccess";
    this.isErrorTargetPestsCat = 1;
    this.category = event.target.value;
    if(this.category == "" || this.category == undefined || this.category == 0){
      this.errorTargetPestsCat = "ionItemStyleError";
      this.isErrorTargetPestsCat = 0;
    }else
      await this.selectedValuesOfCatTarget(this.category)
    this.isdisabled = true;
  }
  selectRanking(event:any){
    this.errorTargetRanking = "ionItemStyleSuccess";
    this.isErrorRanking = 1;
    this.ranking = event.target.value;
    if(this.ranking == "" || this.ranking == undefined || this.ranking == 0){
      this.errorTargetRanking = "ionItemStyleError";
      this.isErrorRanking = 0;
    }
    this.isdisabled = true;
  }
  checkAmount(event:any){
    this.errorTargetAmount = "ionItemStyleSuccess";
    this.isErrorAmount = 1;
    this.amount = event.target.value;
    if(this.amount == "" || this.amount == undefined || this.amount == 0){
      this.errorTargetAmount = "ionItemStyleError";
      this.isErrorAmount = 0;
    }
    this.isdisabled = true;
  }
  selectTrgetPest(event:any){
    this.errorTargetPests = "ionItemStyleSuccess";
    this.isErrorTargetPests = 1;
    this.targetPests = event.target.value;
    if(this.targetPests == "" || this.targetPests == undefined || this.targetPests == 0){
      this.errorTargetPests = "ionItemStyleError";
      this.isErrorTargetPests = 0;
    }
    this.isdisabled = true;
  }
  async ngOnInit() {
   this.branchId = await this.storage.get('branch_id');
   this.ordersId = await this.storage.get('ordersIdOperation');
   this.eventId = await this.storage.get('eventIdOperation');
   this.zoneId = await this.storage.get('zoneIdOperation');
   this.workSiteAddressId = await this.storage.get('workSiteAddressIdOperation');
   this.eventEventId = await this.storage.get('eventEventIdOperation');
    this.inspctionTypeId = await this.storage.get('inspctionTypeIdOperation');
   await this.getDeviceLanguage();
   await this.checkLoginUser();
   await this.functionGetTargetPestOperation(this.branchId,this.eventEventId,this.inspctionTypeId);
 }
  async functionGetTargetPestOperation(branchId:any,eventEventId:any,inspctionTypeId:any){
    let sendValues = {'branchId':branchId,'eventEventId':eventEventId,'inspctionTypeId':inspctionTypeId};
    this.inspectionpointsService.targetPestsOperation(sendValues).then(async data=>{
      this.returnTargetPestOperationData = data;
      this.operationTargetPestOperationResult = this.returnTargetPestOperationData.Error.ErrorCode;
      if(this.operationTargetPestOperationResult==1){
        this.returnTargetPestsArray=[];
        this.returnTargetRankingsArray=[];
        this.returnArrayTargetPestsFromServer = this.returnTargetPestOperationData.Data.targetPests;
        this.returnArrayTargetRankingsFromServer = this.returnTargetPestOperationData.Data.targetRankings;
        for(let i = 0; i < this.returnArrayTargetPestsFromServer.length;i++) {
          this.returnTargetPestsArray[i]=[];
          this.returnTargetPestsArray[i]['id'] = this.returnArrayTargetPestsFromServer[i].id;
          if(this.returnArrayTargetPestsFromServer[i].selected != 0){
            await this.selectedValuesOfCatTarget(this.returnTargetPestsArray[i]['id']);
            this.category = this.returnTargetPestsArray[i]['id'];
          }
          this.returnTargetPestsArray[i]['name'] = this.returnArrayTargetPestsFromServer[i].name;
        }
        for(let i = 0; i < this.returnArrayTargetRankingsFromServer.length;i++) {
          this.returnTargetRankingsArray[i]=[];
          this.returnTargetRankingsArray[i]['id'] = this.returnArrayTargetRankingsFromServer[i].id;
          this.returnTargetRankingsArray[i]['name'] = this.returnArrayTargetRankingsFromServer[i].name;
        }
      }
    }).catch(error=>{
      this.functionGetTargetPestOperation(branchId,eventEventId,inspctionTypeId)
    });
  }
  functionAddTrgetPest(){
    if(this.category == "" || this.category == undefined || this.category == 0){
      this.errorTargetPestsCat = "ionItemStyleError";
      this.isErrorTargetPestsCat = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.targetPests == "" || this.targetPests == undefined || this.targetPests == 0){
      this.errorTargetPests = "ionItemStyleError";
      this.isErrorTargetPests = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.amount == "" || this.amount == undefined || this.amount == 0){
      this.errorTargetAmount = "ionItemStyleError";
      this.isErrorAmount = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.ranking == "" || this.ranking == undefined || this.ranking == 0){
      this.errorTargetRanking = "ionItemStyleError";
      this.isErrorRanking = 0;
      this.isdisabled = false;
      return false;
    }
    let sendValues = {'zoneId':this.zoneId,'eventId':this.eventId,'inspId':this.inspId,'catId':this.category,'targetPestId':this.targetPests,'targetRankingId':this.ranking,'amounts':this.amount};
    this.inspectionpointsService.addTargetPests(sendValues).then(async data=>{
      this.returnaddTargetPestsResultData = data;
      let errorData = this.returnaddTargetPestsResultData.Error.ErrorCode;
      if(errorData == 1){
        this.displayResult(this.error_target_Add_one);
        this.modalController.dismiss({
          "key":1
        })
      }else if(errorData == 2){
        this.displayResult(this.error_target_Add_tow);
      }else if(errorData == 3 || errorData == 4 || errorData == 5){
        this.displayResult(this.error_target_Add_three);
      }
    });
    this.isdisabled = true;
    return true;
  }
  async selectedValuesOfCatTarget(targetId:any){
      let sendValues = {'valId':targetId,'type':4,'branchId':this.branchId};
      this.inspectionpointsService.inspectionPointsTypeOperation(sendValues).then(async data=>{
        this.returnInspectionPointsTypeOperationData = data;
        let errorData = this.returnInspectionPointsTypeOperationData.Error.ErrorCode;
        if(errorData == 1){
          this.selectCatSelected(targetId);
          this.returnArrayTargetPestsFromServer = this.returnInspectionPointsTypeOperationData.Data.targetPests;
          this.returnTargetPestsBySelectArray=[];
          for(let i = 0; i < this.returnArrayTargetPestsFromServer.length;i++) {
            this.returnTargetPestsBySelectArray[i]=[];
            this.returnTargetPestsBySelectArray[i]['id'] = this.returnArrayTargetPestsFromServer[i].id;
            this.returnTargetPestsBySelectArray[i]['name'] = this.returnArrayTargetPestsFromServer[i].name;
          }
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
