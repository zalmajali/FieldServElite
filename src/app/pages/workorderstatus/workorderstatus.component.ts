import { Component, OnInit,Input } from '@angular/core';
import {AlertController,LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import {Storage} from '@ionic/storage-angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import {WorkorderService} from "../../service/workorder.service";
@Component({
  selector: 'app-workorderstatus',
  templateUrl: './workorderstatus.component.html',
  styleUrls: ['./workorderstatus.component.scss'],
})
export class WorkorderstatusComponent  implements OnInit {
  @Input() eventId: string | any;
  @Input() ordersId: string | any;
  @Input() workSiteAddressId: string | any;
  @Input() type: string | any;
  public isdisabled:boolean=true;
  public pageTitle: any;
  public select: any;
  public tasks_status_one_title: any;
  public tasks_status_tow_title: any;
  public tasks_status_three_title: any;
  public tasks_status_for_title: any;
  public branchId: any;
  public routeId:any
  public reason_name: any;
  public errorReason: any="";
  public reason: any;
  public isErrorReason:any = 1;
  public reason_add: any;
  public reasonVal: any;
  public save: any;
  public name: any;
  public are_you_sure:any;
  public yes:any;
  public no:any;
  public task_completed_failed:any;
  public task_completed_succ:any;
  public returnOrderStatusData:any;
  //
  public returnArrayServiceComplaintsFromServer: any;
  public returnArrayStatusReasonsTowFromServer: any;
  public returnArrayStatusReasonsThreeFromServer: any;
  public returnArrayStatusReasonsForeFromServer: any;
  public returnArrayStatusReasonsFiveFromServer: any;
  public returnWorkOrderOpData: any;
  public operationWorkOrderResult: any;
  public returnServiceComplaintsArray: any=[];
  public returnStatusReasonsTowArray: any=[];
  public returnStatusReasonsThreeArray: any=[];
  public returnStatusReasonsForeArray: any=[];
  public returnStatusReasonsFiveArray: any=[];
  //
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
  constructor(private workorderService: WorkorderService,private alertController:AlertController,private translate: TranslateService,private globalization: Globalization,private modalController: ModalController,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
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
    this.translate.get('select').subscribe((res: string) => {
      this.select = res;
    });
    this.translate.get('tasks_status_one_title').subscribe((res: string) => {
      this.tasks_status_one_title = res;
    });
    this.translate.get('tasks_status_tow_title').subscribe((res: string) => {
      this.tasks_status_tow_title = res;
    });
    this.translate.get('tasks_status_three_title').subscribe((res: string) => {
      this.tasks_status_three_title = res;
    });
    this.translate.get('tasks_status_for_title').subscribe((res: string) => {
      this.tasks_status_for_title = res;
    });
    this.translate.get('reason_name').subscribe((res: string) => {
      this.reason_name = res;
    });
    this.translate.get('reason').subscribe((res: string) => {
      this.reason = res;
    });
    this.translate.get('reason_add').subscribe((res: string) => {
      this.reason_add = res;
    });
    this.translate.get('save').subscribe((res: string) => {
      this.save = res;
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
    this.translate.get('task_completed_succ').subscribe((res: string) => {
      this.task_completed_succ = res;
    });
    this.translate.get('task_completed_failed').subscribe((res: string) => {
      this.task_completed_failed = res;
    });
  }
  selectReasonTow(event:any){
    let valueSelectTow = event.target.value;
    this.reasonVal = this.returnStatusReasonsTowArray[valueSelectTow]['reason'];
    this.checkReasonSelected(this.reasonVal)
  }
  selectReasonThree(event:any){
    let valueSelectThree = event.target.value;
    this.reasonVal = this.returnStatusReasonsThreeArray[valueSelectThree]['reason'];
    this.checkReasonSelected(this.reasonVal)
  }
  selectReasonFore(event:any){
    let valueSelectFore = event.target.value;
    this.reasonVal = this.returnStatusReasonsForeArray[valueSelectFore]['reason'];
    this.checkReasonSelected(this.reasonVal)
  }
  selectReasonFive(event:any){
    let valueSelectFore = event.target.value;
    this.reasonVal = this.returnStatusReasonsFiveArray[valueSelectFore]['reason'];
    this.checkReasonSelected(this.reasonVal)
  }
  checkReason(event:any){
    this.errorReason = "ionItemStyleSuccess";
    this.isErrorReason = 1;
    this.reasonVal = event.target.value;
    if(this.reasonVal == "" || this.reasonVal == undefined || this.reasonVal == 0){
      this.errorReason = "ionItemStyleError";
      this.isErrorReason = 0;
    }
    this.isdisabled = true;
  }
  checkReasonSelected(val:any){
    this.errorReason = "ionItemStyleSuccess";
    this.isErrorReason = 1;
    this.reasonVal = val;
    if(this.reasonVal == "" || this.reasonVal == undefined || this.reasonVal == 0){
      this.errorReason = "ionItemStyleError";
      this.isErrorReason = 0;
    }
    this.isdisabled = true;
  }
  async ngOnInit() {
    this.routeId = await this.storage.get('routeLogId');
    await this.getDeviceLanguage();
    await this.checkLoginUser();
    this.userId = await this.storage.get('userId');
    this.branchId = await this.storage.get('branch_id');
    await this.functionworkOrderOperation(this.branchId,this.routeId);
  }
  functionworkOrderOperation(branchId:any,routeId:any){
    let sendValues = {'branchId':branchId,"routeId":routeId};
    this.workorderService.workOrderOperation(sendValues).then(async data=>{
      this.returnWorkOrderOpData = data;
      this.operationWorkOrderResult = this.returnWorkOrderOpData.Error.ErrorCode;
      if(this.operationWorkOrderResult==1){
        this.returnServiceComplaintsArray=[];
        this.returnStatusReasonsTowArray=[];
        this.returnStatusReasonsThreeArray=[];
        this.returnStatusReasonsForeArray=[];
        this.returnStatusReasonsFiveArray=[];
        this.returnArrayServiceComplaintsFromServer = this.returnWorkOrderOpData.Data.serviceComplaints;
        this.returnArrayStatusReasonsTowFromServer = this.returnWorkOrderOpData.Data.statusReasonsTow;
        this.returnArrayStatusReasonsThreeFromServer = this.returnWorkOrderOpData.Data.statusReasonsThree;
        this.returnArrayStatusReasonsForeFromServer = this.returnWorkOrderOpData.Data.statusReasonsFore;
        this.returnArrayStatusReasonsFiveFromServer = this.returnWorkOrderOpData.Data.statusReasonsFive;
        for(let i = 0; i < this.returnArrayServiceComplaintsFromServer.length;i++) {
          this.returnServiceComplaintsArray[i]=[];
          this.returnServiceComplaintsArray[i]['id'] = this.returnArrayServiceComplaintsFromServer[i].id;
          this.returnServiceComplaintsArray[i]['name'] = this.returnArrayServiceComplaintsFromServer[i].name;
        }
        for(let i = 0; i < this.returnArrayStatusReasonsTowFromServer.length;i++) {
          this.returnStatusReasonsTowArray[i]=[];
          this.returnStatusReasonsTowArray[i]['id'] = this.returnArrayStatusReasonsTowFromServer[i].id;
          let reason = this.returnArrayStatusReasonsTowFromServer[i].reason
          this.returnStatusReasonsTowArray[i]['syb'] = reason.substring(0,10);
          this.returnStatusReasonsTowArray[i]['reason'] = this.returnArrayStatusReasonsTowFromServer[i].reason;
        }
        for(let i = 0; i < this.returnArrayStatusReasonsThreeFromServer.length;i++) {
          this.returnStatusReasonsThreeArray[i]=[];
          this.returnStatusReasonsThreeArray[i]['id'] = this.returnArrayStatusReasonsThreeFromServer[i].id;
          let reason = this.returnArrayStatusReasonsThreeFromServer[i].reason
          this.returnStatusReasonsThreeArray[i]['syb'] = reason.substring(0,10);
          this.returnStatusReasonsThreeArray[i]['reason'] = this.returnArrayStatusReasonsThreeFromServer[i].reason;
        }
        for(let i = 0; i < this.returnArrayStatusReasonsForeFromServer.length;i++) {
          this.returnStatusReasonsForeArray[i]=[];
          this.returnStatusReasonsForeArray[i]['id'] = this.returnArrayStatusReasonsForeFromServer[i].id;
          let reason = this.returnArrayStatusReasonsForeFromServer[i].reason
          this.returnStatusReasonsForeArray[i]['syb'] = reason.substring(0,10);
          this.returnStatusReasonsForeArray[i]['reason'] = this.returnArrayStatusReasonsForeFromServer[i].reason;
        }
        for(let i = 0; i < this.returnArrayStatusReasonsFiveFromServer.length;i++) {
          this.returnStatusReasonsFiveArray[i]=[];
          this.returnStatusReasonsFiveArray[i]['id'] = this.returnArrayStatusReasonsFiveFromServer[i].id;
          let reason = this.returnArrayStatusReasonsFiveFromServer[i].reason
          this.returnStatusReasonsFiveArray[i]['syb'] = reason.substring(0,10);
          this.returnStatusReasonsFiveArray[i]['reason'] = this.returnArrayStatusReasonsFiveFromServer[i].reason;
        }
      }
    }).catch(error=>{
      this.functionworkOrderOperation(branchId,routeId)
    });
  }
  async functionWorkOrderStatus(){
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
            let sendValues = {'userId':this.userId,'type':this.type,'eventId':this.eventId,'ordersId':this.ordersId,reason:this.reasonVal};
            this.workorderService.workOrderStatus(sendValues).then(async data=>{
              this.returnOrderStatusData = data;
              let errorData = this.returnOrderStatusData.Error.ErrorCode;
              if(errorData==1){
                this.displayResult(this.task_completed_succ);
                this.modalController.dismiss({
                  "key":1
                })
              }
              else if(errorData==5)
                this.displayResult(this.task_completed_failed);
              else
                this.displayResult(this.task_completed_failed);
            }).catch(error=>{
              this.displayResult(this.task_completed_failed);
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
  functionClosePage(){
    this.modalController.dismiss({
      "key":1
    })
  }
}
