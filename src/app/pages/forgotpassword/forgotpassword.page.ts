import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import {Storage} from '@ionic/storage-angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {UsersService} from "../../service/users.service";
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
  public pageTitle: any;
  public forgot_password_button: any;
  public isdisabled:boolean=true;
  public forgot_password_backe: any;
  public returnResultData:any;
  public forgot_password_error_one:any;
  public forgot_password_error_tow:any;
  public forgot_password_error_three:any;
  //checkemail information
  public emailUserName: any;
  public errorEmailUserName:any="";
  public isErrorEmailUserName:any = 1;
  public email_user_name_placeholder:any;
  public email_user_name_error_one:any;
  public email_user_name_error_tow:any;
  public error_message_email_user_name:any;
  //page setting
  public checkLanguage: any=0;
  public language: any;
  public menuDirection: any;
  public menuDirectionTow: any;
  public showPassword: boolean = false;
  constructor(private usersService: UsersService,private globalization: Globalization, private translate: TranslateService,private modalController: ModalController,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','forgotpassword');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot("/forgotpassword");
    });
  }
  initialiseTranslation(){
    this.translate.get('menuDirection').subscribe((res: string) => {
      this.menuDirection = res;
    });
    this.translate.get('menuDirectionTow').subscribe((res: string) => {
      this.menuDirectionTow = res;
    });
    this.translate.get('forgot_password').subscribe((res: string) => {
      this.pageTitle = res;
    });
    this.translate.get('forgot_password_button').subscribe((res: string) => {
      this.forgot_password_button = res;
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
    this.translate.get('forgot_password_backe').subscribe((res: string) => {
      this.forgot_password_backe = res;
    });
    this.translate.get('forgot_password_error_one').subscribe((res: string) => {
      this.forgot_password_error_one = res;
    });
    this.translate.get('forgot_password_error_tow').subscribe((res: string) => {
      this.forgot_password_error_tow = res;
    });
    this.translate.get('forgot_password_error_three').subscribe((res: string) => {
      this.forgot_password_error_three = res;
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
  async ngOnInit() {
    await this.getDeviceLanguage();
    this.storage.remove('fullName');
    this.storage.remove('userId');
    this.storage.remove('email');
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','forgotpassword');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    await this.storage.set('internetBack','1');
  }
  async forgotPassword(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','login');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    if(this.emailUserName == undefined || this.emailUserName == ""){
      this.errorEmailUserName = "ionItemStyleError";
      this.isErrorEmailUserName = 0;
      this.isdisabled = false;
      this.error_message_email_user_name = this.email_user_name_error_one;
      return false;
    }
    if(this.emailUserName != undefined) {
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 1500,
      });
      let sendValues = {'username':this.emailUserName};
      this.usersService.forgotPassword(sendValues).then(async data=>{
        this.returnResultData = data;
        let errorData = this.returnResultData.Error.ErrorCode;
        if(errorData == 1){
          this.displayResult(this.forgot_password_error_one);
          this.navCtrl.navigateRoot("/login");
        }else if(errorData == 2){
          this.displayResult(this.forgot_password_error_tow);
        }else if(errorData == 3 || errorData == 4){
          this.displayResult(this.forgot_password_error_three);
        }
      });
      await loading.present();
      this.isdisabled = true;
    }
    return true
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
  login(){
    this.navCtrl.navigateRoot("/login");
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
