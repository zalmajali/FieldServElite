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
  selector: 'app-materialsadd',
  templateUrl: './materialsadd.component.html',
  styleUrls: ['./materialsadd.component.scss'],
})
export class MaterialsaddComponent  implements OnInit {
  @Input() inspId: string | any;
  @Input() inspctionType: string | any;
  public isdisabled:boolean=true;
  public pageTitle: any;
  public ordersId: any;
  public eventId: any;
  public workSiteAddressId: any;
  public branchId: any;
  public zoneId: any;
  public select: any;
  public materials_target_pests_quantity: any;
  public materials_usage_unit: any;
  public usageUnit: any;
  public errorUsageUnit: any="ionItemStyleError";
  public materials_active_ingredients: any;
  public activeIngredients:any = [];
  public returnMaterialsOpData: any;
  public operationMaterialsResult: any;
  public returnMaterialsArray:any = [];
  public returnMatMethodsArray:any = [];
  public returnMatEquipmentsArray:any = [];
  public returnMatLocationsArray:any = [];
  public returnMatTargetPestsArray:any = [];
  public returnArrayMeterialFromServer: any;
  public returnArrayMatMethodsFromServer: any;
  public returnArrayMatEquipmentsFromServer: any;
  public returnArrayMatLocationsFromServer: any;
  public returnArrayTargetPestsFromServer: any;
  public returnActiveIngredientsArray:any = [];
  public returnMaterialsInfoByIdData: any;
  public operationMaterialsInfoByIdResult: any;
  public returnArrayActiveIngredientsFromServer: any;
  public materials_add: any;
  public selectValues: any;
  public returnAddMaterialsResultData: any;
  public materials_name_add_succ: any;
  public materials_name_add_failed: any;
  public materials_name_add_failed_data: any;

  //mat name
  public errorMaterialsName: any="";
  public materialsName: any;
  public isErrorMaterialsName:any = 1;
  public materials_name: any;
  public materials_name_add: any;
  //mat name
  public errorMaterialsQuantity: any="";
  public materialsQuantity: any;
  public isErrorMaterialsQuantity:any = 1;
  public materials_quantity: any;
  public materials_quantity_add: any;
  //mat name
  public errorEquipmentName: any="";
  public equipmentName: any;
  public isErrorEquipmentName:any = 1;
  public materials_equipment_name: any;
  public materials_equipment_name_add: any;
  //mat name
  public errorAppMethod: any="";
  public appMethod: any;
  public isErrorAppMethod:any = 1;
  public materials_app_method: any;
  public materials_app_method_add: any;
  //mat name
  public customLocations: any;
  public customLocationsDis:boolean=true;
  public materials_locations: any;
  public materials_custom_location: any;
  public errorLocations: any="";
  public locations:any = [];
  public isErrorLocations:any = 1;
  public materials_locations_add: any;
  //mat name
  public errorTargetPsts: any="";
  public targetPests:any = [];
  public targetPestsQuantity:any = [];
  public isErrorTargetPsts:any = 1;
  public materials_target_ests: any;
  public materials_target_ests_add: any;
  //mat name
  public errorAppRate: any="";
  public appRate: any;
  public isErrorAppRate:any = 1;
  public materials_app_Rate: any;
  public materials_app_Rate_add: any;
  //mat name
  public errorNote: any="";
  public note: any;
  public isErrorNote:any = 1;
  public materials_note: any;
  public materials_note_add: any;
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
    this.translate.get('add_materials').subscribe((res: string) => {
      this.pageTitle = res;
    });
    this.translate.get('select').subscribe((res: string) => {
      this.select = res;
    });
    this.translate.get('materials_target_pests_quantity').subscribe((res: string) => {
      this.materials_target_pests_quantity = res;
    });
    this.translate.get('materials_usage_unit').subscribe((res: string) => {
      this.materials_usage_unit = res;
    });
    this.translate.get('materials_active_ingredients').subscribe((res: string) => {
      this.materials_active_ingredients = res;
    });
    this.translate.get('materials_name').subscribe((res: string) => {
      this.materials_name = res;
    });
    this.translate.get('materials_name_add').subscribe((res: string) => {
      this.materials_name_add = res;
    });
    this.translate.get('materials_quantity').subscribe((res: string) => {
      this.materials_quantity = res;
    });
    this.translate.get('materials_quantity_add').subscribe((res: string) => {
      this.materials_quantity_add = res;
    });
    this.translate.get('materials_equipment_name').subscribe((res: string) => {
      this.materials_equipment_name = res;
    });
    this.translate.get('materials_equipment_name_add').subscribe((res: string) => {
      this.materials_equipment_name_add = res;
    });
    this.translate.get('materials_app_method').subscribe((res: string) => {
      this.materials_app_method = res;
    });
    this.translate.get('materials_app_method_add').subscribe((res: string) => {
      this.materials_app_method_add = res;
    });
    this.translate.get('materials_locations').subscribe((res: string) => {
      this.materials_locations = res;
    });
    this.translate.get('materials_custom_location').subscribe((res: string) => {
      this.materials_custom_location = res;
    });
    this.translate.get('materials_locations_add').subscribe((res: string) => {
      this.materials_locations_add = res;
    });
    this.translate.get('materials_target_ests').subscribe((res: string) => {
      this.materials_target_ests = res;
    });
    this.translate.get('materials_target_ests_add').subscribe((res: string) => {
      this.materials_target_ests_add = res;
    });
    this.translate.get('materials_app_Rate').subscribe((res: string) => {
      this.materials_app_Rate = res;
    });
    this.translate.get('materials_app_Rate_add').subscribe((res: string) => {
      this.materials_app_Rate_add = res;
    });
    this.translate.get('materials_note').subscribe((res: string) => {
      this.materials_note = res;
    });
    this.translate.get('materials_note_add').subscribe((res: string) => {
      this.materials_note_add = res;
    });
    this.translate.get('materials_add').subscribe((res: string) => {
      this.materials_add = res;
    });
    this.translate.get('materials_name_add_succ').subscribe((res: string) => {
      this.materials_name_add_succ = res;
    });
    this.translate.get('materials_name_add_failed').subscribe((res: string) => {
      this.materials_name_add_failed = res;
    });
    this.translate.get('materials_name_add_failed_data').subscribe((res: string) => {
      this.materials_name_add_failed_data = res;
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
    await this.functionGetMaterialsOperation(this.branchId,this.inspctionType);
  }
  async selectMaterialName(event:any){
    this.errorMaterialsName = "ionItemStyleSuccess";
    this.isErrorMaterialsName = 1;
    this.materialsName = event.target.value;
    if(this.materialsName == "" || this.materialsName == undefined || this.materialsName == 0){
      this.errorMaterialsName = "ionItemStyleError";
      this.isErrorMaterialsName = 0;
    }else{
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 1500,
      });
      await this.functionGetMaterialsIdInfo(this.branchId,this.inspctionType,this.materialsName);
      await loading.present();
    }
    this.isdisabled = true;
  }
  selectEquipmentName(event:any){
    this.errorEquipmentName = "ionItemStyleSuccess";
    this.isErrorEquipmentName = 1;
    this.equipmentName = event.target.value;
    if(this.equipmentName == "" || this.equipmentName == undefined || this.equipmentName == 0){
      this.errorEquipmentName = "ionItemStyleError";
      this.isErrorEquipmentName = 0;
    }
    this.isdisabled = true;
  }
  selectAppMethod(event:any){
    this.errorAppMethod = "ionItemStyleSuccess";
    this.isErrorAppMethod = 1;
    this.appMethod = event.target.value;
    if(this.appMethod == "" || this.appMethod == undefined || this.appMethod == 0){
      this.errorAppMethod = "ionItemStyleError";
      this.isErrorAppMethod = 0;
    }
    this.isdisabled = true;
  }
  checkQuantityName(event:any){
    this.errorMaterialsQuantity = "ionItemStyleSuccess";
    this.isErrorMaterialsQuantity = 1;
    this.materialsQuantity = event.target.value;
    if(this.materialsQuantity == "" || this.materialsQuantity == undefined || this.materialsQuantity == 0){
      this.errorMaterialsQuantity = "ionItemStyleError";
      this.isErrorMaterialsQuantity = 0;
    }
    this.isdisabled = true;
  }
  checkAppRate(event:any){
    this.errorAppRate = "ionItemStyleSuccess";
    this.isErrorAppRate = 1;
    this.appRate = event.target.value;
    if(this.appRate == "" || this.appRate == undefined || this.appRate == 0){
      this.errorAppRate = "ionItemStyleError";
      this.isErrorAppRate = 0;
    }
    this.isdisabled = true;
  }
  checkNote(event:any){
    this.errorNote = "ionItemStyleSuccess";
    this.isErrorNote = 1;
    this.note = event.target.value;
    if(this.note == "" || this.note == undefined || this.note == 0){
      this.errorNote = "ionItemStyleError";
      this.isErrorNote = 0;
    }
    this.isdisabled = true;
  }
  selectLocationNameSelected(val:any  ){
    this.locations = [];
    this.locations[0]=val;
    if(this.locations.length == 0 || val==0){
      this.selectValues = 0
      this.errorLocations = "ionItemStyleError";
      this.isErrorLocations = 0;
      this.customLocationsDis = false;
    }else{
      this.selectValues = 1
      this.customLocations = "";
      this.errorLocations = "ionItemStyleSuccess";
      this.isErrorLocations = 1;
      this.customLocationsDis = true;
    }
  }
  selectLocationName(event:any){
    this.locations = [];
    this.selectValues = 0;
    for(let i = 0; i < event.target.value.length;i++) {
      if(event.target.value[i] == 0){
        this.locations.length = 0;
        this.locations[0]= '0';
        this.selectValues = 0;
        break;
      }
      else{
        this.selectValues = 1;
        this.locations[i]=event.target.value[i]
      }
    }
    if(this.selectValues == 0){
      this.errorLocations = "ionItemStyleError";
      this.isErrorLocations = 0;
      this.customLocationsDis = false;
    }else{
      this.customLocations = "";
      this.errorLocations = "ionItemStyleSuccess";
      this.isErrorLocations = 1;
      this.customLocationsDis = true;
    }
    this.isdisabled = true;
  }
  checkCustomLocations(event:any){
    this.customLocations = event.target.value;
    if(this.selectValues == 0){
      if(this.customLocations == "" || this.customLocations == undefined || this.customLocations == 0){
        this.errorLocations = "ionItemStyleError";
        this.isErrorLocations = 0;
      }else{
        this.errorLocations = "ionItemStyleSuccess";
        this.isErrorLocations = 1;
      }
    }
    this.isdisabled = true;
  }
  selectTargetPests(event:any){
    this.errorTargetPsts = "ionItemStyleSuccess";
    this.isErrorTargetPsts = 1;
    this.targetPests = [];
    this.targetPestsQuantity=[]
    for(let i = 0; i < event.target.value.length;i++) {
      this.targetPestsQuantity[i]=[]
      this.targetPestsQuantity[i][0]=event.target.value[i]
      this.targetPests[i]=event.target.value[i]
    }
    if(this.targetPests.length == 0){
      this.errorTargetPsts = "ionItemStyleError";
      this.isErrorTargetPsts = 0;
    }
    this.isdisabled = true;
  }
  checkValOfTarQ(event:any,index:any){
    this.targetPestsQuantity[index][1]= event.target.value;
  }
  functionSelectActiveIngredients(event:any){
    if(event.detail.checked){
      this.activeIngredients.push(event.detail.value);
    }else{
      for(let i=0;i<this.activeIngredients.length;i++){
        if(this.activeIngredients[i] == event.detail.value)
          this.activeIngredients.splice(i,1);
      }
    }
  }
  functionGetMaterialsIdInfo(branchId:any,inspctionType:any,itemId:any){
    let sendValues = {'branchId':branchId,'inspctionType':inspctionType,'itemId':itemId};
    this.inspectionpointsService.materialsInformationByItem(sendValues).then(async data=>{
      this.returnMaterialsInfoByIdData = data;
      this.operationMaterialsInfoByIdResult = this.returnMaterialsInfoByIdData.Error.ErrorCode;
      if(this.operationMaterialsInfoByIdResult==1){
        this.locations = [];
        this.targetPests = [];
        if(this.returnMaterialsInfoByIdData.Data.itemUsageUnit!=0){
          this.usageUnit = this.returnMaterialsInfoByIdData.Data.itemUsageUnit;
          this.errorUsageUnit = "ionItemStyleSuccess";
        }
        this.appRate = this.returnMaterialsInfoByIdData.Data.itemApplicationRate;
        if(this.returnMaterialsInfoByIdData.Data.itemApplicationRate!=0){
          this.errorAppRate = "ionItemStyleSuccess";
          this.appRate = this.returnMaterialsInfoByIdData.Data.itemApplicationRate;
        }else{
          this.errorAppRate = "ionItemStyleError";
          this.appRate = "";
        }
        if(this.returnMaterialsInfoByIdData.Data.quantity!=0){
          this.errorMaterialsQuantity = "ionItemStyleSuccess";
          this.materialsQuantity = this.returnMaterialsInfoByIdData.Data.quantity;
        }else{
          this.errorMaterialsQuantity = "ionItemStyleError";
          this.materialsQuantity = "";
        }
        if(this.returnMaterialsInfoByIdData.Data.quantity!=0){
          this.errorEquipmentName = "ionItemStyleSuccess";
          this.equipmentName = this.returnMaterialsInfoByIdData.Data.equipmentId;
        }else{
          this.errorEquipmentName = "ionItemStyleError";
          this.equipmentName = 0;
        }
        if(this.returnMaterialsInfoByIdData.Data.applicationMethodId!=0){
          this.errorAppMethod = "ionItemStyleSuccess";
          this.appMethod = this.returnMaterialsInfoByIdData.Data.applicationMethodId;
        }else{
          this.errorAppMethod = "ionItemStyleError";
          this.appMethod = 0;
        }
        this.locations = this.returnMaterialsInfoByIdData.Data.locationId;
        await this.selectLocationNameSelected(this.locations);
        if(this.returnMaterialsInfoByIdData.Data.targetPestId!=0){
          this.targetPestsQuantity[0] = []
          this.errorTargetPsts = "ionItemStyleSuccess";
          this.targetPests[0] = this.returnMaterialsInfoByIdData.Data.targetPestId;
          this.targetPestsQuantity[0][0]=this.returnMaterialsInfoByIdData.Data.targetPestId;
          this.targetPestsQuantity[0][1]="";
        }
        this.returnArrayActiveIngredientsFromServer = this.returnMaterialsInfoByIdData.Data.activeIngredients;
        this.returnArrayTargetPestsFromServer = this.returnMaterialsInfoByIdData.Data.meterialTargetPest;
        if(this.returnMaterialsInfoByIdData.Data.countOfTarget!=0){
          this.returnMatTargetPestsArray=[];
          for(let i = 0; i < this.returnArrayTargetPestsFromServer.length;i++) {
            this.returnMatTargetPestsArray[i]=[];
            this.returnMatTargetPestsArray[i]['id'] = this.returnArrayTargetPestsFromServer[i].id;
            this.returnMatTargetPestsArray[i]['name'] = this.returnArrayTargetPestsFromServer[i].name;
          }
        }
        this.returnActiveIngredientsArray=[];
        for(let i = 0; i < this.returnArrayActiveIngredientsFromServer.length;i++) {
          this.returnActiveIngredientsArray[i]=[];
          this.returnActiveIngredientsArray[i]['id'] = this.returnArrayActiveIngredientsFromServer[i].id;
          this.returnActiveIngredientsArray[i]['name'] = this.returnArrayActiveIngredientsFromServer[i].name;
          this.returnActiveIngredientsArray[i]['activePercent'] = this.returnArrayActiveIngredientsFromServer[i].activePercent;
        }
      }
    }).catch(error=>{
      this.functionGetMaterialsIdInfo(branchId,inspctionType,itemId)
    });
  }
  functionGetMaterialsOperation(branchId:any,inspctionType:any){
    let sendValues = {'branchId':branchId,'inspctionType':inspctionType};
    this.inspectionpointsService.materialsOperation(sendValues).then(async data=>{
      this.returnMaterialsOpData = data;
      this.operationMaterialsResult = this.returnMaterialsOpData.Error.ErrorCode;
      if(this.operationMaterialsResult==1){
        this.returnMaterialsArray=[];
        this.returnMatMethodsArray=[];
        this.returnMatEquipmentsArray=[];
        this.returnMatLocationsArray=[];
        this.returnMatTargetPestsArray=[];
        this.returnArrayMeterialFromServer = this.returnMaterialsOpData.Data.meterial;
        this.returnArrayMatMethodsFromServer = this.returnMaterialsOpData.Data.methods;
        this.returnArrayMatEquipmentsFromServer = this.returnMaterialsOpData.Data.equipments;
        this.returnArrayMatLocationsFromServer = this.returnMaterialsOpData.Data.locations;
        this.returnArrayTargetPestsFromServer = this.returnMaterialsOpData.Data.targetPest;
        for(let i = 0; i < this.returnArrayMeterialFromServer.length;i++) {
          this.returnMaterialsArray[i]=[];
          this.returnMaterialsArray[i]['id'] = this.returnArrayMeterialFromServer[i].id;
          this.returnMaterialsArray[i]['name'] = this.returnArrayMeterialFromServer[i].name;
        }
        for(let i = 0; i < this.returnArrayMatMethodsFromServer.length;i++) {
          this.returnMatMethodsArray[i]=[];
          this.returnMatMethodsArray[i]['id'] = this.returnArrayMatMethodsFromServer[i].id;
          this.returnMatMethodsArray[i]['name'] = this.returnArrayMatMethodsFromServer[i].name;
        }
        for(let i = 0; i < this.returnArrayMatEquipmentsFromServer.length;i++) {
          this.returnMatEquipmentsArray[i]=[];
          this.returnMatEquipmentsArray[i]['id'] = this.returnArrayMatEquipmentsFromServer[i].id;
          this.returnMatEquipmentsArray[i]['name'] = this.returnArrayMatEquipmentsFromServer[i].name;
        }
        for(let i = 0; i < this.returnArrayMatLocationsFromServer.length;i++) {
          this.returnMatLocationsArray[i]=[];
          this.returnMatLocationsArray[i]['id'] = this.returnArrayMatLocationsFromServer[i].id;
          this.returnMatLocationsArray[i]['name'] = this.returnArrayMatLocationsFromServer[i].name;
        }
        for(let i = 0; i < this.returnArrayTargetPestsFromServer.length;i++) {
          this.returnMatTargetPestsArray[i]=[];
          this.returnMatTargetPestsArray[i]['id'] = this.returnArrayTargetPestsFromServer[i].id;
          this.returnMatTargetPestsArray[i]['name'] = this.returnArrayTargetPestsFromServer[i].name;
        }
      }
    }).catch(error=>{
      this.functionGetMaterialsOperation(branchId,inspctionType)
    });
  }
  functionAddNewMaterials(){
    if(this.materialsName == undefined || this.materialsName == "" || this.materialsName == 0){
      this.errorMaterialsName = "ionItemStyleError";
      this.isErrorMaterialsName = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.materialsQuantity == undefined || this.materialsQuantity == ""){
      this.errorMaterialsQuantity = "ionItemStyleError";
      this.isErrorMaterialsQuantity = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.equipmentName == undefined || this.equipmentName == "" || this.equipmentName == 0){
      this.errorEquipmentName = "ionItemStyleError";
      this.isErrorEquipmentName = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.appMethod == undefined || this.appMethod == "" || this.appMethod == 0){
      this.errorAppMethod = "ionItemStyleError";
      this.isErrorAppMethod = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.locations.length == 0){
      if(this.customLocations == undefined || this.customLocations == ""){
        this.errorLocations = "ionItemStyleError";
        this.isErrorLocations = 0;
        this.isdisabled = false;
        return false;
      }
    }
    if(this.targetPestsQuantity.length == 0) {
      this.errorTargetPsts = "ionItemStyleError";
      this.isErrorTargetPsts = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.appRate == undefined || this.appRate == ""){
      this.errorAppRate = "ionItemStyleError";
      this.isErrorAppRate = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.note == undefined || this.note == ""){
      this.errorNote = "ionItemStyleError";
      this.isErrorNote = 0;
      this.isdisabled = false;
      return false;
    }
    let sendValues = {'zoneId':this.zoneId,'eventId':this.eventId,'inspId':this.inspId,'itemId':this.materialsName,'usageUnitName':this.usageUnit,'quantityVal':this.materialsQuantity,'equipmentId':this.equipmentName,'appMethodId':this.appMethod,'locationsId':this.locations,
      'customlocation':this.customLocations,'targetPestsId':this.targetPestsQuantity,'appRate':this.appRate,'note':this.note,'activeIngredients':this.activeIngredients};
    this.inspectionpointsService.addMaterials(sendValues).then(async data=>{
      this.returnAddMaterialsResultData = data;
      let errorData = this.returnAddMaterialsResultData.Error.ErrorCode;
      if(errorData == 1){
        this.displayResult(this.materials_name_add_succ);
        this.modalController.dismiss({
          "key":1
        })
      }else if(errorData == 2){
        this.displayResult(this.materials_name_add_failed);
      }else if(errorData == 3 || errorData == 4 || errorData == 5){
        this.displayResult(this.materials_name_add_failed);
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
