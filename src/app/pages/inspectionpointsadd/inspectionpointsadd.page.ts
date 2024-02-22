import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import {Storage} from '@ionic/storage-angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from "../../service/users.service";
import {WorkorderService} from "../../service/workorder.service";
import {InspectionpointsService} from "../../service/inspectionpoints.service";
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import {HttpClient,HttpHeaders } from "@angular/common/http";
@Component({
  selector: 'app-inspectionpointsadd',
  templateUrl: './inspectionpointsadd.page.html',
  styleUrls: ['./inspectionpointsadd.page.scss'],
})
export class InspectionpointsaddPage implements OnInit {
  public pageTitle: any;
  public isdisabled:boolean=true;
  public inspectionpointsAdd_title: any;
  public ip_type: any;
  public ip_barcode: any;
  public ip_location: any;
  public ip_qrCode: any;
  public ip_status: any;
  public ip_note: any;
  public branchId: any;
  public branchType: any;
  public operationInsOpResult:any;
  public returnInsOpData:any;
  public returnArrayInsTypeFromServer:any;
  public returnInsTypeArray:any = [];
  public returnArrayInsLocationsFromServer:any;
  public returnInsLocationsArray:any = [];
  public returnArrayInsStatusesFromServer:any;
  public returnInsStatusesArray:any = [];
  public select:any;
  public errorInsTypeName:any="";
  public isErrorInsTypeName:any = 1;
  public error_message_InsType_name: any;
  public inspctionType: any;
  public inspctionLocations: any;
  public add_type: any;
  public errorBarcode: any;
  public barcode: any;
  public error_message_barcode_name: any;
  public isErrorBarcode: any;
  public errorInsLocationName: any;
  public isErrorInsLocationName: any;
  public error_message_InsLocation_name: any;
  public errorInStatusName: any;
  public status: any;
  public error_message_status_name: any;
  public isErrorInsStatusName: any;
  public note: any;
  public eventId: any;
  public errorNote: any;
  public isErrorNote: any;
  public error_message_note_name: any;
  public zoneId: any;
  public ordersId: any;
  public workSiteAddressId: any;
  public returnInspectionPointsResultData: any;
  public ip_type_add_succ: any;
  public ip_name_add_failed: any;
  public ip_name_add_failed_data: any;
  public ip_add_barcode_failed: any;
  public userIdAddIns: any;
  public imageSelect: any='0';
  public ip_add_image_succ: any;
  public ip_add_image_failed: any;
  public imageLink: any;
  public inspId: any;
  public returnInspectionPointsTypeOperationData: any;
  public inspIdOperation: any;
  public eventName: any;
  public ip_error_check_failed: any;
  public ip_plants_menue: any;
  //check
  public woInspntPlantsId: any=0;
  public woInspntProductsId: any=0;
  public woInspntTargetPestsId: any=0;
  public woInspntMaterialsId: any=0;
  public woInspntObservationsId: any=0;
  public returnCheckInspectionPointsResultData: any;
  public editInformation: any=2;
  public inspectionpointsEdit_title: any;

  public edit_type: any;
  public ip_type_edit_succ: any;
  public ip_name_edit_failed: any;
  public ip_name_edit_failed_data: any;
  //add data Inspection points
  public ip_type_menue: any;
  public ip_observation_menue: any;
  public ip_target_Pest_menue: any;
  public ip_target_material_menue: any;
  public ip_target_planet_menue: any;
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
  constructor(private http:HttpClient,private barcodeScanner: BarcodeScanner,private camera: Camera,private workorderService: WorkorderService,private inspectionpointsService: InspectionpointsService,private activaterouter : ActivatedRoute,private usersService: UsersService,private globalization: Globalization, private translate: TranslateService,private modalController: ModalController,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
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
    this.translate.get('inspectionpointsAdd_title').subscribe((res: string) => {
      this.pageTitle = res;
    });
    this.translate.get('ip_type').subscribe((res: string) => {
      this.ip_type = res;
    });
    this.translate.get('ip_barcode').subscribe((res: string) => {
      this.ip_barcode = res;
    });
    this.translate.get('ip_location').subscribe((res: string) => {
      this.ip_location = res;
    });
    this.translate.get('ip_qrCode').subscribe((res: string) => {
      this.ip_qrCode = res;
    });
    this.translate.get('ip_status').subscribe((res: string) => {
      this.ip_status = res;
    });
    this.translate.get('select').subscribe((res: string) => {
      this.select = res;
    });
    this.translate.get('error_message_InsType_name').subscribe((res: string) => {
      this.error_message_InsType_name = res;
    });
    this.translate.get('add_type').subscribe((res: string) => {
      this.add_type = res;
    });
    this.translate.get('error_message_barcode_name').subscribe((res: string) => {
      this.error_message_barcode_name = res;
    });
    this.translate.get('error_message_InsLocation_name').subscribe((res: string) => {
      this.error_message_InsLocation_name = res;
    });
    this.translate.get('error_message_status_name').subscribe((res: string) => {
      this.error_message_status_name = res;
    });
    this.translate.get('ip_note').subscribe((res: string) => {
      this.ip_note = res;
    });
    this.translate.get('error_message_note_name').subscribe((res: string) => {
      this.error_message_note_name = res;
    });
    this.translate.get('ip_type_add_succ').subscribe((res: string) => {
      this.ip_type_add_succ = res;
    });
    this.translate.get('ip_name_add_failed').subscribe((res: string) => {
      this.ip_name_add_failed = res;
    });
    this.translate.get('ip_name_add_failed_data').subscribe((res: string) => {
      this.ip_name_add_failed_data = res;
    });
    this.translate.get('ip_add_barcode_failed').subscribe((res: string) => {
      this.ip_add_barcode_failed = res;
    });
    this.translate.get('ip_add_image_succ').subscribe((res: string) => {
      this.ip_add_image_succ = res;
    });
    this.translate.get('ip_add_image_failed').subscribe((res: string) => {
      this.ip_add_image_failed = res;
    });
    this.translate.get('ip_error_check_failed').subscribe((res: string) => {
      this.ip_error_check_failed = res;
    });
    this.translate.get('edit_type').subscribe((res: string) => {
      this.edit_type = res;
    });
    this.translate.get('ip_type_edit_succ').subscribe((res: string) => {
      this.ip_type_edit_succ = res;
    });
    this.translate.get('ip_name_edit_failed').subscribe((res: string) => {
      this.ip_name_edit_failed = res;
    });
    this.translate.get('ip_name_edit_failed_data').subscribe((res: string) => {
      this.ip_name_edit_failed_data = res;
    });
    this.translate.get('ip_type_menue').subscribe((res: string) => {
      this.ip_type_menue = res;
    });
    this.translate.get('ip_observation_menue').subscribe((res: string) => {
      this.ip_observation_menue = res;
    });
    this.translate.get('ip_target_Pest_menue').subscribe((res: string) => {
      this.ip_target_Pest_menue = res;
    });
    this.translate.get('ip_target_material_menue').subscribe((res: string) => {
      this.ip_target_material_menue = res;
    });
    this.translate.get('ip_target_planet_menue').subscribe((res: string) => {
      this.ip_target_planet_menue = res;
    });
    this.translate.get('inspectionpointsEdit_title').subscribe((res: string) => {
      this.inspectionpointsEdit_title = res;
    });
    this.translate.get('ip_plants_menue').subscribe((res: string) => {
      this.ip_plants_menue = res;
    });
  }
  async ngOnInit() {
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 1500,
    });
    await this.getDeviceLanguage();
    await this.checkLoginUser();
    this.branchId = await this.storage.get('branch_id');
    this.branchType = await this.storage.get('branch_type');
    this.userIdAddIns = await this.storage.get('userId');
    this.eventName = await this.storage.get('eventNameOperation');
    this.ordersId = await this.storage.get('ordersIdOperation');
    this.eventId = await this.storage.get('eventIdOperation');
    this.workSiteAddressId = await this.storage.get('workSiteAddressIdOperation');
    this.zoneId = await this.storage.get('zoneIdOperation');
    await this.activaterouter.params.subscribe(async (params:any) => {
      if(params['inspId']!="" && params['inspId']!=null && params['inspId']!=undefined && params['inspId']!=0){
        this.inspId = params['inspId'];
        await this.storage.set('inspIdOperation',this.inspId);
      }else{
        this.inspId = await this.storage.get('inspIdOperation');
      }
      if(this.inspId!=0){
        this.editInformation = 1;
        this.functionGetInformationInspectionPoints();
      }else{
        this.editInformation = 0;
      }
    });
    this.functionGetInspointOperation(this.branchId);
    await loading.present();
  }
  functionInspectionPoints(zoneId:any){
    this.navCtrl.navigateRoot(['/inspectionpoints', {zoneId:zoneId}]);
  }
  functionTargetpests(inspId:any){
    this.navCtrl.navigateRoot(['/targetpests', {inspId:inspId}]);
  }
  functionObservation(inspId:any,inspctionType:any){
    this.navCtrl.navigateRoot(['/observations', {inspId:inspId,inspctionType:inspctionType}]);
  }
  functionProduct(inspId:any){
    this.navCtrl.navigateRoot(['/equipment', {inspId:inspId}]);
  }
  functionMaterial(inspId:any){
    this.navCtrl.navigateRoot(['/materials', {inspId:inspId}]);
  }
  functionPlants(inspId:any){
    this.navCtrl.navigateRoot(['/plants', {inspId:inspId}]);
  }
  selectInsLocationValues(event:any){
    this.errorInsLocationName = "ionItemStyleSuccess";
    this.isErrorInsLocationName = 1;
    this.inspctionLocations = event.target.value;
    if(this.inspctionLocations == "" || this.inspctionLocations == undefined || this.inspctionLocations == 0){
      this.errorInsLocationName = "ionItemStyleError";
      this.isErrorInsLocationName = 0;
    }
    this.isdisabled = true;
  }
  async selectInsTypeValues(event:any){
    this.errorInsTypeName = "ionItemStyleSuccess";
    this.isErrorInsTypeName = 1;
    this.inspctionType = event.target.value;
    if(this.inspctionType == "" || this.inspctionType == undefined || this.inspctionType == 0){
      this.errorInsTypeName = "ionItemStyleError";
      this.isErrorInsTypeName = 0;
      this.inspctionLocations = 0;
    }else{
      await this.selectCatLocation(this.inspctionType,1)
    }
    this.isdisabled = true;
  }
  async selectCatLocation(inspctionType:any,type:any){
    this.branchId = await this.storage.get('branch_id');
    let sendValues = {'valId':inspctionType,'type':type,'branchId':this.branchId};
    await this.inspectionpointsService.inspectionPointsTypeOperation(sendValues).then(async data=>{
      this.returnInspectionPointsTypeOperationData = data;
      let errorData = this.returnInspectionPointsTypeOperationData.Error.ErrorCode;
      if(errorData == 1){
        this.inspctionLocations = this.returnInspectionPointsTypeOperationData.Data.typeSelectLocation
      }
    });
    this.isdisabled = true;
  }
  checkNote(event:any){
    this.errorNote = "ionItemStyleSuccess";
    this.isErrorNote = 1;
    this.note = event.target.value;
    if(this.note == "" || this.note == undefined){
      this.errorNote = "ionItemStyleError";
      this.isErrorNote = 0;
    }
    this.isdisabled = true;
  }
  checkBarcode(event:any){
    this.errorBarcode = "ionItemStyleSuccess";
    this.isErrorBarcode = 1;
    this.barcode = event.target.value;
    if(this.barcode == "" || this.barcode == undefined){
      this.errorBarcode = "ionItemStyleError";
      this.isErrorBarcode = 0;
    }
    this.isdisabled = true;
  }
  selectInsStatusValues(event:any){
    this.errorInStatusName = "ionItemStyleSuccess";
    this.isErrorInsStatusName = 1;
    this.status = event.target.value;
    if(this.status == "" || this.status == undefined || this.status == 0){
      this.errorInStatusName = "ionItemStyleError";
      this.isErrorInsStatusName = 0;
    }
    this.isdisabled = true;
  }
  functionReadeBarcode(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.barcode = barcodeData.text
    }).catch(err => {
      this.displayResult(this.ip_add_barcode_failed)
    });
    this.isdisabled = true;
  }
  functionInspectionImage(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL, // Use FILE_URI instead of DATA_URL
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight:400,
      targetWidth:400,
      correctOrientation:true
    };
    this.camera.getPicture(options).then((imageData) => {
      this.imageLink = imageData;
      this.displayResult(this.ip_add_image_succ)
    }, (err) => {
      this.displayResult(this.ip_add_image_failed)
    });
  }
  async functionGetInformationInspectionPoints(){
    let sendValues = {'eventId':this.eventId,'zoneId':this.zoneId,'ordersId':this.ordersId,'workSiteAddressId':this.workSiteAddressId,'inspIdOperation':this.inspId};
    await this.inspectionpointsService.checkInspectionPoints(sendValues).then(async data=>{
      this.returnCheckInspectionPointsResultData = data;
      let errorData = this.returnCheckInspectionPointsResultData.Error.ErrorCode;
      if(errorData == 1){
        this.inspctionType = this.returnCheckInspectionPointsResultData.Data.inspctionType;
        this.inspctionLocations = this.returnCheckInspectionPointsResultData.Data.inspctionLocations;
        this.status = this.returnCheckInspectionPointsResultData.Data.status;
        this.note = this.returnCheckInspectionPointsResultData.Data.note;
        this.barcode = this.returnCheckInspectionPointsResultData.Data.barcode;
        this.woInspntPlantsId = this.returnCheckInspectionPointsResultData.Data.woInspntPlantsId;
        this.woInspntProductsId = this.returnCheckInspectionPointsResultData.Data.woInspntProductsId;
        this.woInspntTargetPestsId = this.returnCheckInspectionPointsResultData.Data.woInspntTargetPestsId;
        this.woInspntMaterialsId = this.returnCheckInspectionPointsResultData.Data.woInspntMaterialsId;
        this.woInspntObservationsId = this.returnCheckInspectionPointsResultData.Data.woInspntObservationsId;
      }else{
        this.displayResult(this.ip_error_check_failed);
      }
    });
  }
  async functionEditDataInspection(){
    if(this.inspctionType == undefined || this.inspctionType == ""){
      this.errorInsTypeName = "ionItemStyleError";
      this.isErrorInsTypeName = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.barcode == undefined || this.barcode == ""){
      this.errorBarcode = "ionItemStyleError";
      this.isErrorBarcode = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.inspctionLocations == undefined || this.inspctionLocations == ""){
      this.errorInsLocationName = "ionItemStyleError";
      this.isErrorInsLocationName = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.status == undefined || this.status == ""){
      this.errorInStatusName = "ionItemStyleError";
      this.isErrorInsStatusName = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.note == undefined || this.note == ""){
      this.errorNote = "ionItemStyleError";
      this.isErrorNote = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.inspctionType != undefined && this.barcode != undefined && this.inspctionLocations != undefined && this.status != undefined && this.note != undefined) {
      let sendValues = {'inspId':this.inspId,'userId':this.userIdAddIns,'eventId':this.eventId,'zoneId':this.zoneId,'ordersId':this.ordersId,'workSiteAddressId':this.workSiteAddressId,'inspctionType':this.inspctionType,'barcode':this.barcode,'inspctionLocations':this.inspctionLocations,'status':this.status,'note':this.note};
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 1500,
      });
      await this.inspectionpointsService.addInspectionPoints(sendValues).then(async data=>{
        this.returnInspectionPointsResultData = data;
        let errorData = this.returnInspectionPointsResultData.Error.ErrorCode;
        if(errorData == 1){
          this.inspId = this.returnInspectionPointsResultData.Data.inspId;
          if(this.imageLink!=undefined && this.imageLink!=null && this.imageLink!=""){
            let sendValues = {'imageLink':this.imageLink,'inspId':this.inspId};
            this.http.post('https://fieldserv-elite.com/api/addInspImage',JSON.stringify(sendValues)).subscribe((response:any) => {
            }, (error:any) => {
            });
          }
          await loading.present();
          this.displayResult(this.ip_type_edit_succ);
        }else if(errorData == 2){
          await loading.present();
          this.displayResult(this.ip_name_edit_failed_data);
        }else if(errorData == 3 || errorData == 4){
          this.displayResult(this.ip_name_edit_failed);
          await loading.present();
        }
      });
      this.isdisabled = true;
    }
    return true;
  }
  functionGetInspointOperation(branchId:any){
    let sendValues = {'branchId':branchId};
    this.inspectionpointsService.inspectionpointsOperation(sendValues).then(async data=>{
      this.returnInsOpData = data;
      this.operationInsOpResult = this.returnInsOpData.Error.ErrorCode;
      if(this.operationInsOpResult==1){
        this.returnInsTypeArray=[];
        this.returnInsLocationsArray=[];
        this.returnInsStatusesArray=[];
        this.returnArrayInsTypeFromServer = this.returnInsOpData.Data.insPointsType;
        this.returnArrayInsLocationsFromServer = this.returnInsOpData.Data.insPointsLocations;
        this.returnArrayInsStatusesFromServer = this.returnInsOpData.Data.insPointsStatuses;
        for(let i = 0; i < this.returnArrayInsTypeFromServer.length;i++) {
          this.returnInsTypeArray[i]=[];
          this.returnInsTypeArray[i]['id'] = this.returnArrayInsTypeFromServer[i].id;
          this.returnInsTypeArray[i]['locationId'] = this.returnArrayInsTypeFromServer[i].locationId;
          this.returnInsTypeArray[i]['name'] = this.returnArrayInsTypeFromServer[i].name;
        }
        for(let i = 0; i < this.returnArrayInsLocationsFromServer.length;i++) {
          this.returnInsLocationsArray[i]=[];
          this.returnInsLocationsArray[i]['id'] = this.returnArrayInsLocationsFromServer[i].id;
          this.returnInsLocationsArray[i]['name'] = this.returnArrayInsLocationsFromServer[i].name;
        }
        for(let i = 0; i < this.returnArrayInsStatusesFromServer.length;i++) {
          this.returnInsStatusesArray[i]=[];
          this.returnInsStatusesArray[i]['id'] = this.returnArrayInsStatusesFromServer[i].id;
          this.returnInsStatusesArray[i]['name'] = this.returnArrayInsStatusesFromServer[i].name;
        }
      }
    }).catch(error=>{
      this.functionGetInspointOperation(branchId)
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
  async functionSaveDataInspection(){
    if(this.inspctionType == undefined || this.inspctionType == ""){
      this.errorInsTypeName = "errorFiled";
      this.isErrorInsTypeName = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.barcode == undefined || this.barcode == ""){
      this.errorBarcode = "ionItemStyleError";
      this.isErrorBarcode = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.inspctionLocations == undefined || this.inspctionLocations == ""){
      this.errorInsLocationName = "ionItemStyleError";
      this.isErrorInsLocationName = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.status == undefined || this.status == ""){
      this.errorInStatusName = "ionItemStyleError";
      this.isErrorInsStatusName = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.note == undefined || this.note == ""){
      this.errorNote = "ionItemStyleError";
      this.isErrorNote = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.inspctionType != undefined && this.barcode != undefined && this.inspctionLocations != undefined && this.status != undefined && this.note != undefined) {
      let sendValues = {'userId':this.userIdAddIns,'eventId':this.eventId,'zoneId':this.zoneId,'ordersId':this.ordersId,'workSiteAddressId':this.workSiteAddressId,'inspctionType':this.inspctionType,'barcode':this.barcode,'inspctionLocations':this.inspctionLocations,'status':this.status,'note':this.note};
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 1500,
      });
     await this.inspectionpointsService.addInspectionPoints(sendValues).then(async data=>{
        this.returnInspectionPointsResultData = data;
        let errorData = this.returnInspectionPointsResultData.Error.ErrorCode;
        if(errorData == 1){
          this.inspId = this.returnInspectionPointsResultData.Data.inspId;
          await this.storage.set('inspIdOperation',this.inspId);
          if(this.imageLink!=undefined && this.imageLink!=null && this.imageLink!=""){
            let sendValues = {'imageLink':this.imageLink,'inspId':this.inspId};
            this.http.post('https://fieldserv-elite.com/api/addInspImage',JSON.stringify(sendValues)).subscribe((response:any) => {
            }, (error:any) => {
            });
          }
          await loading.present();
          this.navCtrl.navigateRoot(['/observations', {inspId:this.inspId,inspctionType:this.inspctionType}]);
          this.displayResult(this.ip_type_add_succ);
        }else if(errorData == 2){
          await loading.present();
          this.displayResult(this.ip_name_add_failed_data);
        }else if(errorData == 3 || errorData == 4){
          this.displayResult(this.ip_name_add_failed);
          await loading.present();
        }
      });
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
}
