import { Component, OnInit,Input } from '@angular/core';
import {LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import {Storage} from '@ionic/storage-angular';
import {ActivatedRoute, Router} from '@angular/router';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {WorkorderService} from "../../service/workorder.service";
@Component({
  selector: 'app-accountnotes',
  templateUrl: './accountnotes.component.html',
  styleUrls: ['./accountnotes.component.scss'],
})
export class AccountnotesComponent  implements OnInit {
  @Input() eventId: number | any;
  @Input() orderId: number | any;
  public isdisabled:boolean=true;
  public pageTitle: any;
  public returnAccountNotesData: any;
  public operationAccountNotesResult: any;
  public returnAccountNotesArray:any=[];
  public returnArrayAccountNotesFromServer: any;
  public accountNotes: any;
  public error_note_small: any;
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
  constructor(private workorderService: WorkorderService,private activaterouter : ActivatedRoute,private globalization: Globalization, private translate: TranslateService,private modalController: ModalController,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
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
    this.translate.get('workorders_options_fore').subscribe((res: string) => {
      this.pageTitle = res;
    });
    this.translate.get('error_note_small').subscribe((res: string) => {
      this.error_note_small = res;
    });
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    await this.checkLoginUser();
    this.functionGetAccountNotes(this.eventId,this.orderId);
  }
  functionGetAccountNotes(eventId:any,orderId:any){
    let sendValues = {'eventId':eventId,'orderId':orderId};
    this.workorderService.accountNotes(sendValues).then(async data=>{
      this.returnAccountNotesData = data;
      this.operationAccountNotesResult = this.returnAccountNotesData.Error.ErrorCode;
      if(this.operationAccountNotesResult==1) {
        this.returnAccountNotesArray = [];
        this.returnArrayAccountNotesFromServer = this.returnAccountNotesData.Data.customerNotes;
        for (let i = 0; i < this.returnArrayAccountNotesFromServer.length; i++) {
          this.returnAccountNotesArray[i] = [];
          this.returnAccountNotesArray[i]['note'] = this.returnArrayAccountNotesFromServer[i].note;
          this.returnAccountNotesArray[i]['addTime'] = this.returnArrayAccountNotesFromServer[i].addTime;
        }
        let countOfData = this.returnAccountNotesArray.length;
        if(countOfData == 0)
          this.accountNotes = 0;
        else {
          this.accountNotes = 1;
        }
      }else
        this.accountNotes = 0;
    }).catch(error=>{
      this.functionGetAccountNotes(eventId,orderId)
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
