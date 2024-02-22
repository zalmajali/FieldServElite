import { Component, OnInit,Input,ViewChild,ElementRef } from '@angular/core';
import {LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import {Storage} from '@ionic/storage-angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import {WorkorderService} from "../../service/workorder.service";
import {DatepickerComponent} from "../datepicker/datepicker.component";
@Component({
  selector: 'app-followup',
  templateUrl: './followup.component.html',
  styleUrls: ['./followup.component.scss'],
})
export class FollowupComponent  implements OnInit {
  @Input() eventId: string | any;
  @Input() ordersId: string | any;
  public isdisabled:boolean=true;
  public pageTitle: any;
  public workorder_followup_add: any;
  public followup_add_succ: any;
  public followup_add_failed: any;
  public select: any;
  public followup_add_failed_data: any;
  public returnaddTargetPestsResultData: any;
  public branchId: any;

  public returnFollowupInfoOperationData: any;
  public operationFollowupInfoOperationResult: any;
  public returnemployeeArray:any =[];
  public returnArrayEmployeeFromServer: any;
//em
  public errorEmployee: any="";
  public employee: any;
  public isErrorEmployee:any = 1;
  public workorder_followup_employee: any;
  public workorder_followup_employee_add: any;
  //date
  public errorTime: any="";
  public contactTime: any;
  public isErrorTime:any = 1;
  public workorder_followup_time: any;
  public workorder_followup_time_add: any;
  //date
  public errorNote: any="";
  public contactNote: any;
  public isErrorNote:any = 1;
  public workorder_followup_note: any;
  public workorder_followup_note_add: any;
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
  public save_location_failed: any;
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
    this.translate.get('workorder_followup').subscribe((res: string) => {
      this.pageTitle = res;
    });

    this.translate.get('workorder_followup_employee').subscribe((res: string) => {
      this.workorder_followup_employee = res;
    });
    this.translate.get('workorder_followup_employee_add').subscribe((res: string) => {
      this.workorder_followup_employee_add = res;
    });
    this.translate.get('workorder_followup_time').subscribe((res: string) => {
      this.workorder_followup_time = res;
    });
    this.translate.get('workorder_followup_time_add').subscribe((res: string) => {
      this.workorder_followup_time_add = res;
    });
    this.translate.get('workorder_followup_note').subscribe((res: string) => {
      this.workorder_followup_note = res;
    });
    this.translate.get('workorder_followup_note_add').subscribe((res: string) => {
      this.workorder_followup_note_add = res;
    });
    this.translate.get('workorder_followup_add').subscribe((res: string) => {
      this.workorder_followup_add = res;
    });
    this.translate.get('followup_add_succ').subscribe((res: string) => {
      this.followup_add_succ = res;
    });
    this.translate.get('followup_add_failed').subscribe((res: string) => {
      this.followup_add_failed = res;
    });
    this.translate.get('followup_add_failed_data').subscribe((res: string) => {
      this.followup_add_failed_data = res;
    });
    this.translate.get('select').subscribe((res: string) => {
      this.select = res;
    });
  }
  selectEmployee(event:any){
    this.errorEmployee = "ionItemStyleSuccess";
    this.isErrorEmployee = 1;
    this.employee = event.target.value;
    if(this.employee == "" || this.employee == undefined || this.employee == 0){
      this.errorEmployee = "ionItemStyleError";
      this.isErrorEmployee = 0;
    }
    this.isdisabled = true;
  }
  checkTime(event:any){
    this.errorTime = "ionItemStyleSuccess";
    this.isErrorTime = 1;
    this.contactTime = event.target.value;
    if(this.contactTime == "" || this.contactTime == undefined || this.contactTime == 0){
      this.errorTime = "ionItemStyleError";
      this.isErrorTime = 0;
    }
    this.isdisabled = true;
  }
  checkNote(event:any){
    this.errorNote = "ionItemStyleSuccess";
    this.isErrorNote = 1;
    this.contactNote = event.target.value;
    if(this.contactNote == "" || this.contactNote == undefined || this.contactNote == 0){
      this.errorNote = "ionItemStyleError";
      this.isErrorNote = 0;
    }
    this.isdisabled = true;
  }
 async ngOnInit() {
    this.branchId = await this.storage.get('branch_id');
    await this.getDeviceLanguage();
    await this.checkLoginUser();
    await this.functionWoFollowupInformation(this.branchId,this.eventId,this.ordersId);
  }
  functionWoFollowupInformation(branchId:any,eventId:any,ordersId:any){
    let sendValues = {'branchId':branchId,'eventId':eventId,'ordersId':ordersId};
    this.workorderService.woFollowupInformation(sendValues).then(async data=>{
      this.returnFollowupInfoOperationData = data;
      this.operationFollowupInfoOperationResult = this.returnFollowupInfoOperationData.Error.ErrorCode;
      if(this.operationFollowupInfoOperationResult==1){
        this.employee = this.returnFollowupInfoOperationData.Data.contactPersonId;
        this.contactTime = this.returnFollowupInfoOperationData.Data.contactTime;
        this.contactNote = this.returnFollowupInfoOperationData.Data.contactNote;
        this.returnemployeeArray=[];
        this.returnArrayEmployeeFromServer = this.returnFollowupInfoOperationData.Data.employee;
        for(let i = 0; i < this.returnArrayEmployeeFromServer.length;i++) {
          this.returnemployeeArray[i]=[];
          this.returnemployeeArray[i]['id'] = this.returnArrayEmployeeFromServer[i].id;
          this.returnemployeeArray[i]['name'] = this.returnArrayEmployeeFromServer[i].name;
        }
      }
    }).catch(error=>{
      this.functionWoFollowupInformation(branchId,eventId,ordersId)
    });
  }
  async functiondatePuckerStart(){
    let model = await this.modalController.create({
      component:DatepickerComponent,
      animated:true,
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
      if(data.data.time!=undefined && data.data.time!=0 && data.data.time!=null){
        this.contactTime = data.data.time
      }
    });
    await model.present();
  }
  functionAddFollowup(){
    if(this.employee == "" || this.employee == undefined || this.employee == 0){
      this.errorEmployee = "ionItemStyleError";
      this.isErrorEmployee = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.contactTime == "" || this.contactTime == undefined || this.contactTime == 0){
      this.errorTime = "ionItemStyleError";
      this.isErrorTime = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.contactNote == "" || this.contactNote == undefined || this.contactNote == 0){
      this.errorNote = "ionItemStyleError";
      this.isErrorNote = 0;
      this.isdisabled = false;
      return false;
    }
    let sendValues = {'eventId':this.eventId,'ordersId':this.ordersId,'employee':this.employee,'contactTime':this.contactTime,'contactNote':this.contactNote};
    this.workorderService.addFollowup(sendValues).then(async data=>{
      this.returnaddTargetPestsResultData = data;
      let errorData = this.returnaddTargetPestsResultData.Error.ErrorCode;
      if(errorData == 1){
        this.displayResult(this.followup_add_succ);
        this.modalController.dismiss({
          "key":1
        })
      }else if(errorData == 2){
        this.displayResult(this.followup_add_failed);
      }else if(errorData == 3 || errorData == 4 || errorData == 5){
        this.displayResult(this.followup_add_failed_data);
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
