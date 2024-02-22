import { Component, OnInit,Input,ViewChild,ElementRef } from '@angular/core';
import {LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import {Storage} from '@ionic/storage-angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import {WorkorderService} from "../../service/workorder.service";
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import SignaturePad from 'signature_pad';
@Component({
  selector: 'app-completetasks',
  templateUrl: './completetasks.component.html',
  styleUrls: ['./completetasks.component.scss'],
})
export class CompletetasksComponent  implements OnInit {
  @ViewChild('canvasElTec') canvasElTec: ElementRef | any;
  @ViewChild('canvasElCusom') canvasElCusom: ElementRef | any;
  @Input() eventId: string | any;
  @Input() ordersId: string | any;
  @Input() workSiteAddressId: string | any;
  @Input() barcodeRequired: string | any;
  public signatureTecPadReturn:any;
  public signatureCusomPadReturn:any;
  public isdisabled:boolean=true;
  public pageTitle: any;
  public select: any;
  public branchId: any;
  public routeId:any
  public save: any;
  public service_complaints: any;
  public check_inspection_num: any;
  public returnCheckInspectionOperationData:any;
  public showButton:any=2;
  public check_inspection_code:any;
  public check_inspection_number:any;
  public selectUserImageSignature:any=0;
  public imageLinkData:any;
  public hide:any;
  public returnWorkOrderCompletResultData:any;
  public task_completed_succ:any;
  public task_completed_failed:any;
  public task_completed_failed_data:any;
  public checkInspect:any;
//ProvidedName
  public errorProvidedName: any="";
  public provided_name: any;
  public provided_name_add: any;
  public providedName: any;
  public isErrorProvidedName:any = 1;
  //UserName
  public errorEmployeeName: any="";
  public employee_name: any;
  public employee_name_add: any;
  public employeeName: any;
  public isErrorEmployeeName:any = 1;
//signature;
  public errorTecSignature: any="";
  public signatureTecImgReturn:any=0;
  public signature_technician:any;
  public signature_technician_add:any;
  public isErrorTecSignature:any = 1;
  public errorCusomSignature: any="";
  public signatureCusomImgReturn:any;
  public signature_customer:any;
  public signature_customer_add:any;
  public isErrorCusomSignature:any = 1;
//note
  public errorReason: any="";
  public reason: any;
  public isErrorReason:any = 1;
  public reason_add: any;
  public reasonVal: any;
  public returnArrayServiceComplaintsFromServer: any;
  public returnArrayProvidedFromServer: any;
  public returnArrayRouteEmployeeFromServer: any;
  public returnWorkOrderOpData: any;
  public operationWorkOrderResult: any;
  public returnServiceComplaintsArray: any=[];
  public returnProvidedArray: any=[];
  public returnRouteEmployeeArray: any=[];
  public ip_add_image_succ: any;
  public ip_add_image_failed: any;
  public imageLink: any=0;
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
  ngAfterViewInit() {
    this.signatureTecPadReturn = new SignaturePad(this.canvasElTec.nativeElement);
    this.signatureCusomPadReturn = new SignaturePad(this.canvasElCusom.nativeElement);
  }
  moved(event: Event) {
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
    this.translate.get('tasks_status_five_title').subscribe((res: string) => {
      this.pageTitle = res;
    });
    this.translate.get('select').subscribe((res: string) => {
      this.select = res;
    });
    this.translate.get('provided_name').subscribe((res: string) => {
      this.provided_name = res;
    });
    this.translate.get('provided_name_add').subscribe((res: string) => {
      this.provided_name_add = res;
    });
    this.translate.get('save').subscribe((res: string) => {
      this.save = res;
    });
    this.translate.get('employee_name').subscribe((res: string) => {
      this.employee_name = res;
    });
    this.translate.get('employee_name_add').subscribe((res: string) => {
      this.employee_name_add = res;
    });
    this.translate.get('service_complaints').subscribe((res: string) => {
      this.service_complaints = res;
    });
    this.translate.get('com_reason').subscribe((res: string) => {
      this.reason = res;
    });
    this.translate.get('com_reason_add').subscribe((res: string) => {
      this.reason_add = res;
    });
    this.translate.get('signature_customer').subscribe((res: string) => {
      this.signature_customer = res;
    });
    this.translate.get('signature_customer_add').subscribe((res: string) => {
      this.signature_customer_add = res;
    });
    this.translate.get('signature_technician').subscribe((res: string) => {
      this.signature_technician = res;
    });
    this.translate.get('signature_technician_add').subscribe((res: string) => {
      this.signature_technician_add = res;
    });
    this.translate.get('ip_add_image_succ').subscribe((res: string) => {
      this.ip_add_image_succ = res;
    });
    this.translate.get('ip_add_image_failed').subscribe((res: string) => {
      this.ip_add_image_failed = res;
    });
    this.translate.get('check_inspection_num').subscribe((res: string) => {
      this.check_inspection_num = res;
    });
    this.translate.get('check_inspection_code').subscribe((res: string) => {
      this.check_inspection_code = res;
    });
    this.translate.get('check_inspection_number').subscribe((res: string) => {
      this.check_inspection_number = res;
    });
    this.translate.get('task_completed_succ').subscribe((res: string) => {
      this.task_completed_succ = res;
    });
    this.translate.get('task_completed_failed').subscribe((res: string) => {
      this.task_completed_failed = res;
    });
    this.translate.get('task_completed_failed_data').subscribe((res: string) => {
      this.task_completed_failed_data = res;
    });
  }
  async ngOnInit() {
    this.routeId = await this.storage.get('routeLogId');
    await this.getDeviceLanguage();
    await this.checkLoginUser();
    this.userId = await this.storage.get('userId');
    this.branchId = await this.storage.get('branch_id');
    await this.functionworkOrderOperation(this.branchId,this.routeId);
    await this.functionCheckData(this.eventId,this.ordersId,this.workSiteAddressId);
  }
  functionCheckData(eventId:any,ordersId:any,workSiteAddressId:any){
    let sendValues = {'eventId':eventId,'ordersId':ordersId,'workSiteAddressId':workSiteAddressId};
      this.workorderService.checkInspectionByOrder(sendValues).then(async data=>{
        this.returnCheckInspectionOperationData = data;
        let errorData = this.returnCheckInspectionOperationData.Error.ErrorCode;
        if(errorData == 1){
          this.checkInspect = this.returnCheckInspectionOperationData.Data.inspect
            if(this.returnCheckInspectionOperationData.Data.checkCode==1){
              this.displayResult(this.check_inspection_code);
              this.showButton = 0;
            }
            else if(this.returnCheckInspectionOperationData.Data.checkNumber==1){
              this.displayResult(this.check_inspection_number);
              this.showButton = 0;
            }
            else{
              this.showButton = 1;
            }
        }
      }).catch(error=>{
        this.functionCheckData(eventId,ordersId,workSiteAddressId)
      });
  }
  functionworkOrderOperation(branchId:any,routeId:any){
    let sendValues = {'branchId':branchId,"routeId":routeId};
    this.workorderService.workOrderOperation(sendValues).then(async data=>{
      this.returnWorkOrderOpData = data;
      this.operationWorkOrderResult = this.returnWorkOrderOpData.Error.ErrorCode;
      if(this.operationWorkOrderResult==1){
        this.returnServiceComplaintsArray=[];
        this.returnProvidedArray=[];
        this.returnRouteEmployeeArray=[];
        this.returnArrayServiceComplaintsFromServer = this.returnWorkOrderOpData.Data.serviceComplaints;
        this.returnArrayProvidedFromServer = this.returnWorkOrderOpData.Data.provided;
        this.returnArrayRouteEmployeeFromServer = this.returnWorkOrderOpData.Data.routeEmployee;
        for(let i = 0; i < this.returnArrayServiceComplaintsFromServer.length;i++) {
          this.returnServiceComplaintsArray[i]=[];
          this.returnServiceComplaintsArray[i]['id'] = this.returnArrayServiceComplaintsFromServer[i].id;
          this.returnServiceComplaintsArray[i]['name'] = this.returnArrayServiceComplaintsFromServer[i].name;
        }
        for(let i = 0; i < this.returnArrayProvidedFromServer.length;i++) {
          this.returnProvidedArray[i]=[];
          this.returnProvidedArray[i]['id'] = this.returnArrayProvidedFromServer[i].id;
          this.returnProvidedArray[i]['name'] = this.returnArrayProvidedFromServer[i].name;
        }
        for(let i = 0; i < this.returnArrayRouteEmployeeFromServer.length;i++) {
          this.returnRouteEmployeeArray[i]=[];
          this.returnRouteEmployeeArray[i]['id'] = this.returnArrayRouteEmployeeFromServer[i].id;
          this.returnRouteEmployeeArray[i]['name'] = this.returnArrayRouteEmployeeFromServer[i].name;
          this.returnRouteEmployeeArray[i]['signaturePhoto'] = this.returnArrayRouteEmployeeFromServer[i].signaturePhoto;
        }
      }
    }).catch(error=>{
      this.functionworkOrderOperation(branchId,routeId)
    });
  }
  selectEmployeeName(event:any){
    this.errorEmployeeName = "ionItemStyleSuccess";
    this.isErrorEmployeeName = 1;
    let dataArray = event.target.value.split('-');
    this.employeeName = dataArray[0];
    let index = dataArray[1];
    if(this.employeeName == "" || this.employeeName == undefined || this.employeeName == 0){
      this.errorEmployeeName = "ionItemStyleError";
      this.isErrorEmployeeName = 0;
    }else{
      if(this.returnRouteEmployeeArray[index]['signaturePhoto']!=0){
        this.selectUserImageSignature = 1;
        this.imageLinkData = this.returnRouteEmployeeArray[index]['signaturePhoto'];
        this.hide="hide";
      }else{
        this.imageLinkData = "";
        this.selectUserImageSignature = 0;
        this.hide="";
      }
    }
    this.isdisabled = true;
  }
  selectProvidedName(event:any){
    this.errorProvidedName = "ionItemStyleSuccess";
    this.isErrorProvidedName = 1;
    this.providedName = event.target.value;
    if(this.providedName == "" || this.providedName == undefined || this.providedName == 0){
      this.errorProvidedName = "ionItemStyleError";
      this.isErrorProvidedName = 0;
    }
    this.isdisabled = true;
  }
  selectComplaintsName(event:any){
    this.reasonVal = event.target.value;
    this.errorReason = "ionItemStyleSuccess";
    this.isErrorReason = 1;
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
  startDrawingTec(event: Event) {
    this.errorTecSignature = "ionItemStyleSuccess";
    this.isErrorTecSignature = 1;
    const base64DataReturn = this.signatureTecPadReturn.toDataURL();
    this.signatureTecImgReturn = base64DataReturn;
    if(this.signatureTecImgReturn == "" || this.signatureTecImgReturn == undefined || this.signatureTecImgReturn == 0){
      this.errorTecSignature = "ionItemStyleError";
      this.isErrorTecSignature = 0;
    }
    this.isdisabled = true;
  }
  startDrawingCusom(event: Event) {
    this.errorCusomSignature = "ionItemStyleSuccess";
    this.isErrorCusomSignature = 1;
    const base64DataReturn = this.signatureCusomPadReturn.toDataURL();
    this.signatureCusomImgReturn = base64DataReturn;
    if(this.signatureCusomImgReturn == "" || this.signatureCusomImgReturn == undefined || this.signatureCusomImgReturn == 0){
      this.errorCusomSignature = "ionItemStyleError";
      this.isErrorCusomSignature = 0;
    }
    this.isdisabled = true;
  }
  functionCompleteTask(){
    if(this.providedName == undefined || this.providedName == "" || this.providedName == 0){
      this.errorProvidedName = "ionItemStyleError";
      this.isErrorProvidedName = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.employeeName == undefined || this.employeeName == "" || this.employeeName == 0){
      this.errorEmployeeName = "ionItemStyleError";
      this.isErrorEmployeeName = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.selectUserImageSignature = 0){
      if(this.signatureTecImgReturn == 0){
        this.errorTecSignature = "ionItemStyleError";
        this.isErrorTecSignature = 0;
        this.isdisabled = false;
        return false;
      }
    }
    if(this.reasonVal == undefined || this.reasonVal == ""){
      this.errorReason = "ionItemStyleError";
      this.isErrorReason = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.signatureCusomImgReturn == 0){
      this.errorCusomSignature = "ionItemStyleError";
      this.isErrorCusomSignature = 0;
      this.isdisabled = false;
      return false;
    }
    let sendValues = {'userId':this.userId,'eventId':this.eventId,'ordersId':this.ordersId,'providedName':this.providedName,'employeeName':this.employeeName,'signatureTecImgReturn':this.signatureTecImgReturn,'reasonVal':this.reasonVal,'signatureCusomImgReturn':this.signatureCusomImgReturn,'selectUserImageSignature':this.selectUserImageSignature};
    this.workorderService.workOrderComplet(sendValues).then(async data=>{
      this.returnWorkOrderCompletResultData = data;
      let errorData = this.returnWorkOrderCompletResultData.Error.ErrorCode;
      if(errorData == 1){
        this.displayResult(this.task_completed_succ);
        this.modalController.dismiss({
          "key":1
        })
      }else if(errorData == 2){
        this.displayResult(this.task_completed_failed);
      }else if(errorData == 3 || errorData == 4 || errorData == 5){
        this.displayResult(this.task_completed_failed_data);
      }
    });
    this.isdisabled = true;
    return true
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
