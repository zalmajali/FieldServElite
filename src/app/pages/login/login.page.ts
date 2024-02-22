import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import {Storage} from '@ionic/storage-angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {UsersService} from "../../service/users.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public pageTitle: any;
  public login_button: any;
  public isdisabled:boolean=true;
  public returnResultData:any;
  public login_error_one:any;
  public login_error_tow:any;
  public login_error_three:any;
  public select_date_sync:any = 1;
  //checkemail information
  public emailUserName: any;
  public errorEmailUserName:any="";
  public isErrorEmailUserName:any = 1;
  public email_user_name_placeholder:any;
  public email_user_name_error_one:any;
  public email_user_name_error_tow:any;
  public error_message_email_user_name:any;
  //checkPassawrd information
  public userPassword: any;
  public errorUserPassword:any="";
  public isErrorUserPassword:any = 1;
  public user_password_placeholder:any;
  public user_password_error:any;
  //selectDateLabel information
  public label_select_date: any;
  public select_date_placeholder: any;
  public select_date_one: any;
  public select_date_tow: any;
  public select_date_three: any;
  public select_date_fore: any;
  public select: any;
  //page setting
  public forgot_password: any;
  public checkLanguage: any=0;
  public language: any;
  public menuDirection: any;
  public menuDirectionTow: any;
  public showPassword: boolean = false;
  constructor(private usersService: UsersService,private globalization: Globalization, private translate: TranslateService,private modalController: ModalController,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','login');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot("/login");
    });
    this.menu.enable(false,"last");
  }
  initialiseTranslation(){
    this.translate.get('menuDirection').subscribe((res: string) => {
      this.menuDirection = res;
    });
    this.translate.get('menuDirectionTow').subscribe((res: string) => {
      this.menuDirectionTow = res;
    });
    this.translate.get('login_title').subscribe((res: string) => {
      this.pageTitle = res;
    });
    this.translate.get('login_button').subscribe((res: string) => {
      this.login_button = res;
    });
    this.translate.get('email_user_name_placeholder').subscribe((res: string) => {
      this.email_user_name_placeholder = res;
    });
    this.translate.get('email_user_name_error_one').subscribe((res: string) => {
      this.email_user_name_error_one = res;
    });
    this.translate.get('email_user_name_error_tow').subscribe((res: string) => {
      this.email_user_name_error_tow = res;
    });
    this.translate.get('user_password_placeholder').subscribe((res: string) => {
      this.user_password_placeholder = res;
    });
    this.translate.get('user_password_error').subscribe((res: string) => {
      this.user_password_error = res;
    });
    this.translate.get('label_select_date').subscribe((res: string) => {
      this.label_select_date = res;
    });
    this.translate.get('select_date_placeholder').subscribe((res: string) => {
      this.select_date_placeholder = res;
    });
    this.translate.get('select_date_one').subscribe((res: string) => {
      this.select_date_one = res;
    });
    this.translate.get('select_date_tow').subscribe((res: string) => {
      this.select_date_tow = res;
    });
    this.translate.get('select_date_three').subscribe((res: string) => {
      this.select_date_three = res;
    });
    this.translate.get('select_date_fore').subscribe((res: string) => {
      this.select_date_fore = res;
    });
    this.translate.get('select').subscribe((res: string) => {
      this.select = res;
    });
    this.translate.get('forgot_password').subscribe((res: string) => {
      this.forgot_password = res;
    });
    this.translate.get('login_error_one').subscribe((res: string) => {
      this.login_error_one = res;
    });
    this.translate.get('login_error_tow').subscribe((res: string) => {
      this.login_error_tow = res;
    });
    this.translate.get('login_error_three').subscribe((res: string) => {
      this.login_error_three = res;
    });
  }
  checkEmailUserName(event:any){
    this.emailUserName = event.target.value;
    if(this.emailUserName == "" || this.emailUserName == undefined){
      this.errorEmailUserName = "ionItemStyleError";
      this.error_message_email_user_name = this.email_user_name_error_one;
      this.isErrorEmailUserName = 0;
    }else{
      let checkVal = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!checkVal.test(this.emailUserName)){
        this.errorEmailUserName = "ionItemStyleError";
        this.error_message_email_user_name = this.email_user_name_error_tow;
        this.isErrorEmailUserName = 0;
      }else{
        this.errorEmailUserName = "ionItemStyleSuccess";
        this.isErrorEmailUserName = 1;
      }
    }
  }
  checkPassword(event:any){
    this.errorUserPassword = "ionItemStyleSuccess";
    this.isErrorUserPassword = 1;
    this.userPassword = event.target.value;
    if(this.userPassword == "" || this.userPassword == undefined){
      this.errorUserPassword = "ionItemStyleError";
      this.isErrorUserPassword = 0;
    }
  }
  async selectSyncData(event:any){
    this.select_date_sync = event.target.value;
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    this.storage.remove('fullName');
    this.storage.remove('userId');
    this.storage.remove('email');
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','login');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    await this.storage.set('internetBack','1');
  }
  async checkUser(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','login');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    if((this.emailUserName == undefined || this.emailUserName == "") && (this.userPassword == undefined || this.userPassword == "")){
      this.errorEmailUserName = "ionItemStyleError";
      this.isErrorEmailUserName = 0;
      this.errorUserPassword = "ionItemStyleError";
      this.isErrorUserPassword = 0;
      this.error_message_email_user_name = this.email_user_name_error_one;
      this.isdisabled = false;
      return false;
    }
    if(this.emailUserName == undefined || this.emailUserName == ""){
      this.errorEmailUserName = "ionItemStyleError";
      this.isErrorEmailUserName = 0;
      this.error_message_email_user_name = this.email_user_name_error_one;
      this.isdisabled = false;
      return false;
    }
    if(this.userPassword == undefined || this.userPassword == ""){
      this.errorUserPassword = "ionItemStyleError";
      this.isErrorUserPassword = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.emailUserName != undefined && this.userPassword != undefined) {
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 1500,
      });
      let sendValues = {'username':this.emailUserName,'password':this.userPassword};
      this.usersService.login(sendValues).then(async data=>{
        this.returnResultData = data;
        let errorData = this.returnResultData.Error.ErrorCode;
        if(errorData == 1){
          await this.storage.set('select_date_sync',this.select_date_sync);
          await this.storage.set('branch_type',this.returnResultData.Data.branch_type);
          await this.storage.set('userId',this.returnResultData.Data.id);
          await this.storage.set('company_id',this.returnResultData.Data.company_id);
          await this.storage.set('branch_id',this.returnResultData.Data.branch_id);
          await this.storage.set('role_id',this.returnResultData.Data.role_id);
          await this.storage.set('username',this.returnResultData.Data.username);
          await this.storage.set('password',this.returnResultData.Data.password);
          await this.storage.set('full_name',this.returnResultData.Data.full_name);
          await this.storage.set('mobile',this.returnResultData.Data.mobile);
          await this.storage.set('login_days',this.returnResultData.Data.login_days);
          await this.storage.set('login_start_time',this.returnResultData.Data.login_start_time);
          await this.storage.set('login_end_time',this.returnResultData.Data.login_end_time);
          await this.storage.set('mobile_user_udid',this.returnResultData.Data.mobile_user_udid);
          await this.storage.set('team_id',this.returnResultData.Data.team_id);
          await this.storage.set('team_name',this.returnResultData.Data.team_name);
          await this.storage.set('team_target_pests_cat_id',this.returnResultData.Data.team_target_pests_cat_id);
          await this.storage.set('team_target_pests_name',this.returnResultData.Data.team_target_pests_name);
          await this.storage.set('inDayes',this.returnResultData.Data.inDayes);
          this.displayResult(this.login_error_one);
          this.navCtrl.navigateRoot("/employees");
        }else if(errorData == 2){
          this.displayResult(this.login_error_tow);
        }else if(errorData == 3 || errorData == 4){
          this.displayResult(this.login_error_three);
        }
      });
      await loading.present();
      this.isdisabled = true;
    }
    return true;
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
  forgotPassword(){
    this.navCtrl.navigateRoot("/forgotpassword");
  }
  changeInputType(){
    this.showPassword = !this.showPassword;
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
  async functionOpenMenue(){
    this.menu.enable(true,"first");
    this.menu.open("first");
  }
}
