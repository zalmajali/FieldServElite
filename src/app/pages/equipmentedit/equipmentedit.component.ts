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
  selector: 'app-equipmentedit',
  templateUrl: './equipmentedit.component.html',
  styleUrls: ['./equipmentedit.component.scss'],
})
export class EquipmenteditComponent  implements OnInit {
  @Input() inspId: string | any;
  @Input() equiId: string | any;
  @Input() itemName: string | any;
  @Input() quantity: string | any;
  @Input() notes: string | any;
  public isdisabled:boolean=true;
  public pageTitle: any;
  public ordersId: any;
  public eventId: any;
  public workSiteAddressId: any;
  public branchId: any;
  public zoneId: any;
  public select: any;
  public operationEquipmentsOpResult:any;
  public returnEquipmentsOpData:any;
  public returnArrayEquipmentsOpFromServer:any;
  public returnEquipmentsOpArray:any = [];
  public returnAddEquipmentsResultData:any;
  public edit_equipments:any;
  public equipments_name_edit_succ:any;
  public equipments_name_edit_failed:any;
  public equipments_name_edit_failed_data:any;
//mat name
  public errorItemName: any="";
  public isErrorItemName:any = 1;
  public equipments_name_item: any;
  public equipments_name_item_add: any;
  //mat name
  public errorQuantity: any="";
  public isErrorQuantity:any = 1;
  public equipments_quantity: any;
  public equipments_quantity_add: any;
  //mat name
  public errorNotes: any="";
  public isErrorNotes:any = 1;
  public equipments_nots: any;
  public equipments_nots_add: any;
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
    this.translate.get('equipments_edit').subscribe((res: string) => {
      this.pageTitle = res;
    });
    this.translate.get('select').subscribe((res: string) => {
      this.select = res;
    });
    this.translate.get('equipments_name_item').subscribe((res: string) => {
      this.equipments_name_item = res;
    });
    this.translate.get('equipments_name_item_add').subscribe((res: string) => {
      this.equipments_name_item_add = res;
    });
    this.translate.get('equipments_quantity').subscribe((res: string) => {
      this.equipments_quantity = res;
    });
    this.translate.get('equipments_quantity_add').subscribe((res: string) => {
      this.equipments_quantity_add = res;
    });
    this.translate.get('equipments_nots').subscribe((res: string) => {
      this.equipments_nots = res;
    });
    this.translate.get('equipments_nots_add').subscribe((res: string) => {
      this.equipments_nots_add = res;
    });
    this.translate.get('edit_equipments').subscribe((res: string) => {
      this.edit_equipments = res;
    });
    this.translate.get('equipments_name_edit_succ').subscribe((res: string) => {
      this.equipments_name_edit_succ = res;
    });
    this.translate.get('equipments_name_edit_failed').subscribe((res: string) => {
      this.equipments_name_edit_failed = res;
    });
    this.translate.get('equipments_name_add_failed_data').subscribe((res: string) => {
      this.equipments_name_edit_failed_data = res;
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
    await this.functionGetEquipmentsOperation(this.eventId,this.inspId,this.zoneId,this.branchId);
  }
  functionGetEquipmentsOperation(eventId:any,inspId:any,zoneId:any,branchId:any){
    let sendValues = {'eventId':eventId,'inspId':inspId,'zoneId':zoneId,'branchId':branchId};
    this.inspectionpointsService.equipmentOperation(sendValues).then(async data=>{
      this.returnEquipmentsOpData = data;
      this.operationEquipmentsOpResult = this.returnEquipmentsOpData.Error.ErrorCode;
      if(this.operationEquipmentsOpResult==1){
        this.returnEquipmentsOpArray=[];
        this.returnArrayEquipmentsOpFromServer = this.returnEquipmentsOpData.Data.eqItems;
        for(let i = 0; i < this.returnArrayEquipmentsOpFromServer.length;i++) {
          this.returnEquipmentsOpArray[i]=[];
          this.returnEquipmentsOpArray[i]['id'] = this.returnArrayEquipmentsOpFromServer[i].id;
          this.returnEquipmentsOpArray[i]['name'] = this.returnArrayEquipmentsOpFromServer[i].name;
        }
      }
    }).catch(error=>{
      this.functionGetEquipmentsOperation(eventId,inspId,zoneId,branchId)
    });
  }
  selectItemName(event:any){
    this.errorItemName = "ionItemStyleSuccess";
    this.isErrorItemName = 1;
    this.itemName = event.target.value;
    if(this.itemName == "" || this.itemName == undefined || this.itemName == 0){
      this.errorItemName = "ionItemStyleError";
      this.isErrorItemName = 0;
    }
    this.isdisabled = true;
  }
  checkQuantity(event:any){
    this.errorQuantity = "ionItemStyleSuccess";
    this.isErrorQuantity = 1;
    this.quantity = event.target.value;
    if(this.quantity == "" || this.quantity == undefined || this.quantity == 0){
      this.errorQuantity = "ionItemStyleError";
      this.isErrorQuantity = 0;
    }
    this.isdisabled = true;
  }
  checkNotes(event:any){
    this.errorNotes = "ionItemStyleSuccess";
    this.isErrorNotes = 1;
    this.notes = event.target.value;
    if(this.notes == "" || this.notes == undefined || this.notes == 0){
      this.errorNotes = "ionItemStyleError";
      this.isErrorNotes = 0;
    }
    this.isdisabled = true;
  }
  functionEditNewEquipments() {
    if(this.itemName == undefined || this.itemName == "" || this.itemName == 0){
      this.errorItemName = "ionItemStyleError";
      this.isErrorItemName = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.quantity == undefined || this.quantity == ""){
      this.errorQuantity = "ionItemStyleError";
      this.isErrorQuantity = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.notes == undefined || this.notes == ""){
      this.errorNotes = "ionItemStyleError";
      this.isErrorNotes = 0;
      this.isdisabled = false;
      return false;
    }
    let sendValues = {'equiId':this.equiId,'zoneId':this.zoneId,'eventId':this.eventId,'inspId':this.inspId,'itemId':this.itemName,'quantity':this.quantity,'notes':this.notes};
    this.inspectionpointsService.editEquipment(sendValues).then(async data=>{
      this.returnAddEquipmentsResultData = data;
      let errorData = this.returnAddEquipmentsResultData.Error.ErrorCode;
      if(errorData == 1){
        this.displayResult(this.equipments_name_edit_succ);
        this.modalController.dismiss({
          "key":1
        })
      }else if(errorData == 2){
        this.displayResult(this.equipments_name_edit_failed);
      }else if(errorData == 3 || errorData == 4 || errorData == 5){
        this.displayResult(this.equipments_name_edit_failed_data);
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
