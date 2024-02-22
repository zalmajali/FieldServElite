import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import {Storage} from '@ionic/storage-angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import {UsersService} from "../../service/users.service";
import {WorkorderService} from "../../service/workorder.service";
@Component({
  selector: 'app-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss'],
})
export class EmployeesPage implements OnInit {
  public pageTitle: any;
  public isdisabled:boolean=true;
  public employees_title: any;
  public employees_call_msg: any;
  public employees_button: any;
  public employeesSelected:any = [];
  public employees_add_error_one: any;
  public employees_add_error_tow: any;
  public employees_add_error_three: any;
  public employees_add_error_four: any;
  public teamId: any;
  public branchId: any;
  public returnEmployeesData:any;
  public returnArrayEmployeesFromServer:any;
  public returnEmployeesArray:any = [];
  public operationResult:any;
  public countOfData:any;
  public employees:any;
  public error_no_data_large:any;
  public error_no_data_small:any;
  public inDayes:any;
  public error_add_remove_employees:any;
  public returnStartRoutes:any;
  public operationResultStartRoutes:any;
//check route Log
  public returnCheckRoutsLog:any;
  public operationResultCheckRoutsLog:any;
  public employeesLogArray:any = [];
  public checkRoute:any = 0;
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
  constructor(private usersService: UsersService,private workorderService: WorkorderService,private callNumber: CallNumber,private globalization: Globalization, private translate: TranslateService,private modalController: ModalController,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
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
    this.translate.get('employees_title').subscribe((res: string) => {
      this.pageTitle = res;
    });
    this.translate.get('dirTow').subscribe((res: string) => {
      this.dirTow = res;
    });
    this.translate.get('employees_call_msg').subscribe((res: string) => {
      this.employees_call_msg = res;
    });
    this.translate.get('start_route').subscribe((res: string) => {
      this.employees_button = res;
    });
    this.translate.get('employees_add_error_one').subscribe((res: string) => {
      this.employees_add_error_one = res;
    });
    this.translate.get('employees_add_error_tow').subscribe((res: string) => {
      this.employees_add_error_tow = res;
    });
    this.translate.get('employees_add_error_three').subscribe((res: string) => {
      this.employees_add_error_three = res;
    });
    this.translate.get('error_no_data_large').subscribe((res: string) => {
      this.error_no_data_large = res;
    });
    this.translate.get('error_add_remove_employees').subscribe((res: string) => {
      this.error_add_remove_employees = res;
    });
    this.translate.get('employees_add_error_four').subscribe((res: string) => {
      this.employees_add_error_four = res;
    });
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    await this.checkLoginUser();
    this.teamId = await this.storage.get('team_id');
    this.inDayes = await this.storage.get('inDayes');
    this.branchId = await this.storage.get('branch_id');
    this.functionGetEmployees(this.teamId,this.branchId);
  }
  async functionGetEmployees(teamId:any,branchId:any){
    let sendValues = {'teamId':this.teamId,'branchId':this.branchId};
    this.usersService.employees(sendValues).then(async data=>{
      this.returnEmployeesData = data;
      this.operationResult = this.returnEmployeesData.Error.ErrorCode;
      if(this.operationResult==1){
        this.returnArrayEmployeesFromServer = this.returnEmployeesData.Data.employees;
        this.returnEmployeesArray=[];
        for(let i = 0; i < this.returnArrayEmployeesFromServer.length;i++) {
          this.returnEmployeesArray[i]=[];
          this.returnEmployeesArray[i]['id'] = this.returnArrayEmployeesFromServer[i].id;
          this.returnEmployeesArray[i]['fullName'] = this.returnArrayEmployeesFromServer[i].fullName;
          this.returnEmployeesArray[i]['signaturePhoto'] = this.returnArrayEmployeesFromServer[i].signaturePhoto;
          this.returnEmployeesArray[i]['photo'] = this.returnArrayEmployeesFromServer[i].photo;
          this.returnEmployeesArray[i]['mobile'] = this.returnArrayEmployeesFromServer[i].mobile;
          this.returnEmployeesArray[i]['check'] = false;
        }
        let countOfData = this.returnEmployeesArray.length;
        if(countOfData == 0)
          this.employees = 0;
        else{
          this.employees = 1;
        }
      }else
        this.employees = 0;
    }).catch(error=>{
      this.functionGetEmployees(teamId,branchId)
    });
    await this.workorderService.checkRoutsLog(sendValues).then(async data=>{
      this.returnCheckRoutsLog = data;
      this.operationResultCheckRoutsLog = this.returnCheckRoutsLog.Error.ErrorCode;
      if(this.operationResultCheckRoutsLog==1){
        this.checkRoute = 0;
        this.displayResult(this.error_add_remove_employees);
        await this.storage.set('routeLogId',this.returnCheckRoutsLog.Data.routLogId);
        await this.storage.set('routeId',this.returnCheckRoutsLog.Data.routId);
        let employeeeLog = this.returnCheckRoutsLog.Data.allEmployees;
        this.employeesLogArray= employeeeLog.split(",");
        for(let i = 0; i < this.returnEmployeesArray.length;i++) {
          if(this.employeesLogArray.includes(this.returnEmployeesArray[i]['id']))
            this.returnEmployeesArray[i]['check'] = true;
        }
      }
      else{
        this.checkRoute = 1;
        await this.storage.set('routeLogId',0);
        await this.storage.set('routeId',0);
      }
    })
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
  functionCallNumber(numer:any){
    this.callNumber.callNumber(numer, true)
      .then(async res =>{
      })
      .catch(err =>{
        this.displayResult(this.employees_call_msg);
      });
  }
  functionSelectEmployee(event:any){
    if(event.detail.checked){
      this.employeesSelected.push(event.detail.value);
    }else{
      for(let i=0;i<this.employeesSelected.length;i++){
        if(this.employeesSelected[i] == event.detail.value)
          this.employeesSelected.splice(i,1);
      }
    }
  }
  async functionSaveInformation(){
    if(this.employeesSelected.length == 0 || this.employeesSelected.length==null || this.employeesSelected.length == undefined){
      this.displayResult(this.employees_add_error_one);
    }else{
      let valSelectEmployee = this.employeesSelected.toString();
      let sendValues = {'teamId':this.teamId,'branchId':this.branchId,employees:valSelectEmployee};
      await this.workorderService.startRoutes(sendValues).then(async data=>{
        this.returnStartRoutes = data;
        this.operationResultStartRoutes = this.returnStartRoutes.Error.ErrorCode;
        if(this.operationResultStartRoutes==1){
          this.displayResult(this.employees_add_error_tow);
          await this.storage.set('routeLogId',this.returnStartRoutes.Data.routLogId);
          await this.storage.set('routeId',this.returnStartRoutes.Data.routId);
          this.navCtrl.navigateRoot('home');
        }else if(this.operationResultStartRoutes==5){
          this.displayResult(this.employees_add_error_three);
        }
        else{
          this.displayResult(this.employees_add_error_four);
        }
      })
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
      duration: 4500,
      position: 'bottom',
      cssClass:"toastStyle",
      color:""
    });
    await toast.present();
  }
}
