import { Component, OnInit } from '@angular/core';
import {AlertController,LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
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
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File,Entry } from '@awesome-cordova-plugins/file/ngx';
import {ObservationsaddComponent} from "../observationsadd/observationsadd.component";
import {ObservationseditComponent} from "../observationsedit/observationsedit.component";
import {ShowdataComponent} from "../showdata/showdata.component";
import {HttpClient,HttpHeaders } from "@angular/common/http";
@Component({
  selector: 'app-observations',
  templateUrl: './observations.page.html',
  styleUrls: ['./observations.page.scss'],
})
export class ObservationsPage implements OnInit {
  public pageTitle: any;
  public isdisabled:boolean=true;
  public error_observation_small: any;
  public error_observation_larg: any;
  public observation: any;
  public ip_type: any;
  public observation_name: any;
  public observation_recommendation_name: any;
  public observation_locations: any;
  public observation_ranking: any;
  public observation_responsibility: any;
  public observation_target_pests: any;
  public observation_options_One: any;
  public observation_options_tow: any;
  public ordersId: any;
  public eventId: any;
  public inspctionType: any;
  public workSiteAddressId: any;
  public branchId: any;
  public zoneId: any;
  public branchType: any;
  public inspId: any;
  public operationObservationsResult:any;
  public returnObservationsData:any;
  public returnArrayObservationsFromServer:any;
  public returnObservationsArray:any = [];
  public observation_responsibility_one:any;
  public observation_responsibility_tow:any;
  public observation_responsibility_three:any;
  public observation_responsibility_fore:any;
  public are_you_sure:any;
  public yes:any;
  public no:any;
  public ip_plants_menue: any;
  public observations_name_delete_succ: any;
  public observations_name_delete_failed: any;
  public imagesValues: any;
  public ip_add_image_succ: any;
  public ip_add_image_failed: any;
  public imageLink: any;
  public userIdAddIns: any;
  public returnEndInspectionData: any;
  public inspction_end_succ: any;
  public inspction_end_failed: any;
//check login
  public fullName:any;
  public userId:any;
  public username:any;
  public password:any;
  //check
  public woInspntPlantsId: any=0;
  public woInspntProductsId: any=0;
  public woInspntTargetPestsId: any=0;
  public woInspntMaterialsId: any=0;
  public woInspntObservationsId: any=0;
  public returnCheckInspectionPointsResultData: any;
  public editInformation: any=2;
  public inspectionpointsEdit_title: any;
  //add data Inspection points
  public ip_type_menue: any;
  public ip_observation_menue: any;
  public ip_target_Pest_menue: any;
  public ip_target_material_menue: any;
  public ip_target_planet_menue: any;
  //add for all pages
  public menuDirection: any;
  public menuDirectionTow: any;
  public checkLanguage: any=0;
  public language: any;
  public showMenueValue: any=2;
  public showNotificationIcon: any=1;
  constructor(private http:HttpClient,private alertController:AlertController,private transfer: FileTransfer,private file: File,private camera: Camera,private workorderService: WorkorderService,private inspectionpointsService: InspectionpointsService,private activaterouter : ActivatedRoute,private usersService: UsersService,private globalization: Globalization, private translate: TranslateService,private modalController: ModalController,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
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
    this.translate.get('observation_title').subscribe((res: string) => {
      this.pageTitle = res;
    });
    this.translate.get('error_observation_small').subscribe((res: string) => {
      this.error_observation_small = res;
    });
    this.translate.get('error_observation_larg').subscribe((res: string) => {
      this.error_observation_larg = res;
    });
    this.translate.get('ip_type').subscribe((res: string) => {
      this.ip_type = res;
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
    this.translate.get('observation_name').subscribe((res: string) => {
      this.observation_name = res;
    });
    this.translate.get('observation_recommendation_name').subscribe((res: string) => {
      this.observation_recommendation_name = res;
    });
    this.translate.get('observation_locations').subscribe((res: string) => {
      this.observation_locations = res;
    });
    this.translate.get('observation_ranking').subscribe((res: string) => {
      this.observation_ranking = res;
    });
    this.translate.get('observation_responsibility').subscribe((res: string) => {
      this.observation_responsibility = res;
    });
    this.translate.get('observation_target_pests').subscribe((res: string) => {
      this.observation_target_pests = res;
    });
    this.translate.get('observation_options_One').subscribe((res: string) => {
      this.observation_options_One = res;
    });
    this.translate.get('observation_options_tow').subscribe((res: string) => {
      this.observation_options_tow = res;
    });
    this.translate.get('observation_responsibility_one').subscribe((res: string) => {
      this.observation_responsibility_one = res;
    });
    this.translate.get('observation_responsibility_tow').subscribe((res: string) => {
      this.observation_responsibility_tow = res;
    });
    this.translate.get('observation_responsibility_three').subscribe((res: string) => {
      this.observation_responsibility_three = res;
    });
    this.translate.get('observation_responsibility_fore').subscribe((res: string) => {
      this.observation_responsibility_fore = res;
    });
    this.translate.get('ip_observation_menue').subscribe((res: string) => {
      this.ip_observation_menue = res;
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
    this.translate.get('ip_plants_menue').subscribe((res: string) => {
      this.ip_plants_menue = res;
    });
    this.translate.get('observations_name_delete_succ').subscribe((res: string) => {
      this.observations_name_delete_succ = res;
    });
    this.translate.get('observations_name_delete_failed').subscribe((res: string) => {
      this.observations_name_delete_failed = res;
    });
    this.translate.get('ip_add_image_succ').subscribe((res: string) => {
      this.ip_add_image_succ = res;
    });
    this.translate.get('ip_add_image_failed').subscribe((res: string) => {
      this.ip_add_image_failed = res;
    });
    this.translate.get('inspction_end_succ').subscribe((res: string) => {
      this.inspction_end_succ = res;
    });
    this.translate.get('inspction_end_failed').subscribe((res: string) => {
      this.inspction_end_failed = res;
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
   this.ordersId = await this.storage.get('ordersIdOperation');
   this.eventId = await this.storage.get('eventIdOperation');
   this.zoneId = await this.storage.get('zoneIdOperation');
   this.userIdAddIns = await this.storage.get('userId');
   this.workSiteAddressId = await this.storage.get('workSiteAddressIdOperation');
   this.activaterouter.params.subscribe(async (params:any) => {
     if(params['inspId']!="" && params['inspId']!=null && params['inspId']!=undefined && params['inspId']!=0){
       this.inspId = params['inspId'];
       await this.storage.set('inspIdOperation',this.inspId);
     }else{
       this.inspId = await this.storage.get('inspIdOperation');
     }
     if(params['inspctionType']!="" && params['inspctionType']!=null && params['inspctionType']!=undefined && params['inspctionType']!=0){
       this.inspctionType = params['inspctionType'];
       await this.storage.set('inspctionTypeIdOperation',this.inspctionType);
     }else{
       this.inspctionType = await this.storage.get('inspctionTypeIdOperation');
     }
     await this.functionObservationInfo(this.branchId,this.ordersId,this.inspId);
     await this.functionGetInformationInspectionPoints();
   });
   await loading.present();
  }
  async functionGetInformationInspectionPoints(){
    let sendValues = {'eventId':this.eventId,'zoneId':this.zoneId,'ordersId':this.ordersId,'workSiteAddressId':this.workSiteAddressId,'inspIdOperation':this.inspId};
    await this.inspectionpointsService.checkInspectionPoints(sendValues).then(async data=>{
      this.returnCheckInspectionPointsResultData = data;
      let errorData = this.returnCheckInspectionPointsResultData.Error.ErrorCode;
      if(errorData == 1){
        this.inspctionType = this.returnCheckInspectionPointsResultData.Data.inspctionType;
        this.woInspntPlantsId = this.returnCheckInspectionPointsResultData.Data.woInspntPlantsId;
        this.woInspntProductsId = this.returnCheckInspectionPointsResultData.Data.woInspntProductsId;
        this.woInspntTargetPestsId = this.returnCheckInspectionPointsResultData.Data.woInspntTargetPestsId;
        this.woInspntMaterialsId = this.returnCheckInspectionPointsResultData.Data.woInspntMaterialsId;
        this.woInspntObservationsId = this.returnCheckInspectionPointsResultData.Data.woInspntObservationsId;
      }
    });
  }
  functionObservationInfo(branchId:any,ordersId:any,inspId:any){
    let sendValues = {'ordersId':ordersId,'branchId':branchId,'inspId':inspId};
    this.inspectionpointsService.observations(sendValues).then(async data=>{
      this.returnObservationsData = data;
      this.operationObservationsResult = this.returnObservationsData.Error.ErrorCode;
      if(this.operationObservationsResult==1){
        this.returnArrayObservationsFromServer = this.returnObservationsData.Data.observation;
        this.returnObservationsArray=[];
        for(let i = 0; i < this.returnArrayObservationsFromServer.length;i++) {
          this.returnObservationsArray[i]=[];
          this.returnObservationsArray[i]['obId'] = this.returnArrayObservationsFromServer[i].obId;
          this.returnObservationsArray[i]['observationName'] = this.returnArrayObservationsFromServer[i].observationName;
          this.returnObservationsArray[i]['recommendationName'] = this.returnArrayObservationsFromServer[i].recommendationName;
          this.returnObservationsArray[i]['customLocationName'] = this.returnArrayObservationsFromServer[i].customLocationName;
          this.returnObservationsArray[i]['rankingName'] = this.returnArrayObservationsFromServer[i].rankingName;
          this.returnObservationsArray[i]['locations'] = this.returnArrayObservationsFromServer[i].locations.length;
          this.returnObservationsArray[i]['targetPests'] = this.returnArrayObservationsFromServer[i].targetPests.length;
          this.returnObservationsArray[i]['images']=[]
          this.imagesValues = this.returnArrayObservationsFromServer[i].images.length;
          if(this.imagesValues != 0){
            this.returnObservationsArray[i]['images'] = this.returnArrayObservationsFromServer[i].images;
          }
          if(this.returnArrayObservationsFromServer[i].responsibility == 1)
            this.returnObservationsArray[i]['responsibility'] = this.observation_responsibility_one;
          if(this.returnArrayObservationsFromServer[i].responsibility == 2)
            this.returnObservationsArray[i]['responsibility'] = this.observation_responsibility_tow;
          if(this.returnArrayObservationsFromServer[i].responsibility == 3)
            this.returnObservationsArray[i]['responsibility'] = this.observation_responsibility_three;
          if(this.returnArrayObservationsFromServer[i].responsibility == 4)
            this.returnObservationsArray[i]['responsibility'] = this.observation_responsibility_fore;
        }
        let countOfData = this.returnObservationsArray.length;
        if(countOfData == 0)
          this.observation = 0;
        else{
          this.observation = 1;
        }
      }else
        this.observation = 0;
    }).catch(error=>{
      this.functionObservationInfo(branchId,ordersId,inspId)
    });
  }
  functionInspectionPoints(zoneId:any){
    this.navCtrl.navigateRoot(['/inspectionpoints', {zoneId:zoneId}]);
  }
  functionTargetpests(inspId:any){
    this.navCtrl.navigateRoot(['/targetpests', {inspId:inspId}]);
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
  functionInspectionImage(obId:any){
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
      let sendValues = {'imageLink':this.imageLink,'obId':obId};
      this.http.post('https://fieldserv-elite.com/api/addObsImage',JSON.stringify(sendValues)).subscribe((response:any) => {
        this.ngOnInit();
      }, (error:any) => {
      });
      this.displayResult(this.ip_add_image_succ)
    }, (err) => {
      this.displayResult(this.ip_add_image_failed)
    });
  }
  async functionObservationEdit(obId:any){
    let model = await this.modalController.create({
      component:ObservationseditComponent,
      animated:true,
      componentProps:{obId:obId,inspId:this.inspId,inspctionType:this.inspctionType},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
      this.ngOnInit();
    });
    await model.present();
  }
  async functionObservationAdd(inspId:any,inspctionType:any){
    let model = await this.modalController.create({
      component:ObservationsaddComponent,
      animated:true,
      componentProps:{inspId:inspId,inspctionType:inspctionType},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
      this.ngOnInit();
    });
    await model.present();
  }
  async functionObservationDelete(obId:any){
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
            let sendValues = {'eventId':this.eventId,'inspId':this.inspId,'branchId':this.branchId,'obId':obId};
            this.inspectionpointsService.deleteObservations(sendValues).then(async data=>{
              this.returnObservationsData = data;
              let errorData = this.returnObservationsData.Error.ErrorCode;
              if(errorData==1){
                this.ngOnInit();
                this.displayResult(this.observations_name_delete_succ);
              }
              else if(errorData==5)
                this.displayResult(this.observations_name_delete_failed);
              else
                this.displayResult(this.observations_name_delete_failed);
            }).catch(error=>{
              this.displayResult(this.observations_name_delete_failed);
            });
          }
        }
      ]
    });
    await alert.present();
  }
  async functionEndInspectionPoint(inspId:any){
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
            let sendValues = {'userId':this.userIdAddIns,'eventId':this.eventId,'ordersId':this.ordersId,'inspId':inspId};
            console.log(sendValues)
            this.inspectionpointsService.endInspectionsPoints(sendValues).then(async data=>{
              this.returnEndInspectionData = data;
              let errorData = this.returnEndInspectionData.Error.ErrorCode;
              if(errorData==1){
                this.navCtrl.navigateRoot(['/inspectionpoints', {zoneId:this.zoneId}]);
                this.displayResult(this.inspction_end_succ);
              }
              else if(errorData==5)
                this.displayResult(this.inspction_end_failed);
              else
                this.displayResult(this.inspction_end_failed);
            }).catch(error=>{
              this.displayResult(this.inspction_end_failed);
            });
          }
        }
      ]
    });
    await alert.present();
  }
  async functionShowData(data:any){
    let model = await this.modalController.create({
      component:ShowdataComponent,
      animated:true,
      componentProps:{data:data,type:3},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
      if(data.data.key!=undefined && data.data.key!=0 && data.data.key!=null){
        if(data.data.key == 1)
          this.ngOnInit();
      }
    });
    await model.present();
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
}
