import { Component, OnInit,Input } from '@angular/core';
import {LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import {Storage} from '@ionic/storage-angular';
import {ActivatedRoute, Router} from '@angular/router';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {InspectionpointsService} from "../../service/inspectionpoints.service";
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File,Entry } from '@awesome-cordova-plugins/file/ngx';
import {HttpClient,HttpHeaders } from "@angular/common/http";
@Component({
  selector: 'app-observationsadd',
  templateUrl: './observationsadd.component.html',
  styleUrls: ['./observationsadd.component.scss'],
})
export class ObservationsaddComponent  implements OnInit {
  @Input() inspId: string | any;
  @Input() inspctionType: string | any;
  public isdisabled:boolean=true;
  public pageTitle: any;
  public ordersId: any;
  public eventId: any;
  public workSiteAddressId: any;
  public branchId: any;
  public zoneId: any;
  public returnOperationOpData: any;
  public operationOperationResult: any;
  public returnObservationsArray:any = [];
  public returnObLocationsArray:any = [];
  public returnObRankingsArray:any = [];
  public returnTargetPestsArray:any = [];
  public returnArrayObservationsFromServer: any;
  public returnArrayObLocationsFromServer: any;
  public returnArrayObRankingsFromServer: any;
  public returnArrayTargetPestsFromServer: any;
  public isSelectedObs:any;
  public returnRecommendationsData: any;
  public operationRecommendationsResult: any;
  public returnArrayRecommendationsFromServer: any;
  public returnRecommendationsArray:any = [];
  public select:any;
  public obId:any;
  public observation_add:any;
  public observation_responsibility_one:any;
  public observation_responsibility_tow:any;
  public observation_responsibility_three:any;
  public observation_responsibility_fore:any;
  public returnObservationResultData:any;
  public observation_name_add_succ:any;
  public observation_name_add_failed:any;
  public selectValues: any;
  public ip_add_image_succ: any;
  public ip_add_image_failed: any;
  public imageLink: any;
  //form
  public observation_form: any;
  public observation_custom_form: any;
  public observation_recommendation_form: any;
  public observation_custom_recommendation_form: any;
  public observation_locations: any;
  public observation_custom_locations: any;
  public observation_custom_ranking: any;
  public observation_target_pests_form: any;
  public observation_responsibility: any;
  public observation_image: any;
  //errorObservationName
  public errorObservationName: any="";
  public observation_form_select: any;
  public observationName: any;
  public isErrorObservationName:any = 1;
  public observationCustom: any;
  public observationCustomDis:boolean=true;
//errorRecommendationName
  public errorRecommendationName: any="";
  public recommendationName: any;
  public customRecommendation: any;
  public observation_recommendation_form_select: any;
  public isErrorRecommendationName:any = 1;
  public recommendationDis:boolean=false;
  public recommendationCustomDis:boolean=true;
//location
  public errorLocationName: any="";
  public locations: any = [];
  public customLocations: any;
  public observation_custom_locations_select: any;
  public isErrorLocationName:any = 1;
  public locationsDis:boolean=false;
  public customLocationsDis:boolean=true;
  //ranking
  public ranking: any;
  public errorRanking: any="";
  public isErrorRanking:any = 1;
  public observation_custom_ranking_select: any;
  //target
  public errorTargetPests: any;
  public targetPests: any = [];
  public isErrorTargetPests:any = 1;
  public observation_custom_pests_form_select: any;
  //responsibility
  public responsibility: any=1;
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
  constructor(private http:HttpClient,private transfer: FileTransfer,private file: File,private camera: Camera,private inspectionpointsService: InspectionpointsService,private activaterouter : ActivatedRoute,private globalization: Globalization, private translate: TranslateService,private modalController: ModalController,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
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
    this.translate.get('add_observation').subscribe((res: string) => {
      this.pageTitle = res;
    });
    this.translate.get('select').subscribe((res: string) => {
      this.select = res;
    });
    this.translate.get('observation_form').subscribe((res: string) => {
      this.observation_form = res;
    });
    this.translate.get('observation_custom_form').subscribe((res: string) => {
      this.observation_custom_form = res;
    });
    this.translate.get('observation_recommendation_form').subscribe((res: string) => {
      this.observation_recommendation_form = res;
    });
    this.translate.get('observation_custom_recommendation_form').subscribe((res: string) => {
      this.observation_custom_recommendation_form = res;
    });
    this.translate.get('observation_locations').subscribe((res: string) => {
      this.observation_locations = res;
    });
    this.translate.get('observation_custom_locations').subscribe((res: string) => {
      this.observation_custom_locations = res;
    });
    this.translate.get('observation_custom_ranking').subscribe((res: string) => {
      this.observation_custom_ranking = res;
    });
    this.translate.get('observation_target_pests_form').subscribe((res: string) => {
      this.observation_target_pests_form = res;
    });
    this.translate.get('observation_responsibility').subscribe((res: string) => {
      this.observation_responsibility = res;
    });
    this.translate.get('observation_image').subscribe((res: string) => {
      this.observation_image = res;
    });
    this.translate.get('observation_form_select').subscribe((res: string) => {
      this.observation_form_select = res;
    });
    this.translate.get('observation_recommendation_form_select').subscribe((res: string) => {
      this.observation_recommendation_form_select = res;
    });
    this.translate.get('observation_custom_locations_select').subscribe((res: string) => {
      this.observation_custom_locations_select = res;
    });
    this.translate.get('observation_custom_ranking_select').subscribe((res: string) => {
      this.observation_custom_ranking_select = res;
    });
    this.translate.get('observation_custom_pests_form_select').subscribe((res: string) => {
      this.observation_custom_pests_form_select = res;
    });
    this.translate.get('observation_add').subscribe((res: string) => {
      this.observation_add = res;
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
    this.translate.get('observation_name_add_succ').subscribe((res: string) => {
      this.observation_name_add_succ = res;
    });
    this.translate.get('observation_name_add_failed').subscribe((res: string) => {
      this.observation_name_add_failed = res;
    });
    this.translate.get('ip_add_image_succ').subscribe((res: string) => {
      this.ip_add_image_succ = res;
    });
    this.translate.get('ip_add_image_failed').subscribe((res: string) => {
      this.ip_add_image_failed = res;
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
    this.functionGetObservationsOperation(this.branchId,this.inspctionType);
  }
  selectObservationName(event:any){
    this.observationName = event.target.value;
    if(this.observationName == 0){
      this.errorObservationName = "ionItemStyleError";
      this.isErrorObservationName = 0;
      this.observationCustomDis = false;
    }else{
      this.observationCustom = "";
      this.errorObservationName = "ionItemStyleSuccess";
      this.isErrorObservationName = 1;
      this.observationCustomDis = true;
      this.functionObservationsRecommendations(this.observationName);
    }
    this.isdisabled = true;
  }
  customObservationName(event:any){
    this.observationCustom = event.target.value;
    if(this.observationName == 0){
      if(this.observationCustom == "" || this.observationCustom == undefined || this.observationCustom == 0){
        this.errorObservationName = "ionItemStyleError";
        this.isErrorObservationName = 0;
      }else{
        this.errorObservationName = "ionItemStyleSuccess";
        this.isErrorObservationName = 1;
      }
    }
    this.isdisabled = true;
  }
  selectRecommendationName(event:any){
    this.recommendationName = event.target.value;
    if(this.recommendationName == 0){
      this.errorRecommendationName = "ionItemStyleError";
      this.isErrorRecommendationName = 0;
      this.recommendationCustomDis = false;
    }else{
      this.observationCustom = "";
      this.errorRecommendationName = "ionItemStyleSuccess";
      this.isErrorRecommendationName = 1;
      this.recommendationCustomDis = true;
    }
    this.isdisabled = true;
  }
  checkCustomRecommendation(event:any){
    this.customRecommendation = event.target.value;
    if(this.recommendationName == 0){
      if(this.customRecommendation == "" || this.customRecommendation == undefined || this.customRecommendation == 0){
        this.errorRecommendationName = "ionItemStyleError";
        this.isErrorRecommendationName = 0;
      }else{
        this.errorRecommendationName = "ionItemStyleSuccess";
        this.isErrorRecommendationName = 1;
      }
    }
    this.isdisabled = true;
  }
  selectLocationName(event:any){
      this.locations = [];
      for(let i = 0; i < event.target.value.length;i++) {
        if(event.target.value[i] == 0)
          this.locations[0]= 0;
        else
          this.locations[i]=event.target.value[i]
      }
      if(this.locations.length == 0){
        this.errorLocationName = "ionItemStyleError";
        this.isErrorLocationName = 0;
        this.customLocationsDis = false;
      }else{
        this.customLocations = "";
        this.errorLocationName = "ionItemStyleSuccess";
        this.isErrorLocationName = 1;
        this.customLocationsDis = true;
      }
    this.isdisabled = true;
  }
  checkCustomLocations(event:any){
    this.customLocations = event.target.value;
    if(this.locations.length == 0){
      if(this.customLocations == "" || this.customLocations == undefined || this.customLocations == 0){
        this.errorLocationName = "ionItemStyleError";
        this.isErrorLocationName = 0;
      }else{
        this.errorLocationName = "ionItemStyleSuccess";
        this.isErrorLocationName = 1;
      }
    }
    this.isdisabled = true;
  }
  selectRanking(event:any){
    this.errorRanking = "ionItemStyleSuccess";
    this.isErrorRanking = 1;
    this.ranking = event.target.value;
    if(this.ranking == "" || this.ranking == undefined || this.ranking == 0){
      this.errorRanking = "ionItemStyleError";
      this.isErrorRanking = 0;
    }
    this.isdisabled = true;
  }
  selectTargetPests(event:any){
    this.errorTargetPests = "ionItemStyleSuccess";
    this.isErrorTargetPests = 1;
    this.targetPests = [];
    for(let i = 0; i < event.target.value.length;i++) {
      this.targetPests[i]=event.target.value[i]
    }
    if(this.targetPests.length == 0){
      this.errorTargetPests = "ionItemStyleError";
      this.isErrorTargetPests = 0;
    }
    this.isdisabled = true;
  }
  selectresponsibility(event:any){
    this.responsibility = event.target.value;
    this.isdisabled = true;
  }
  functionGetObservationsOperation(branchId:any,inspctionType:any){
    let sendValues = {'branchId':branchId,'inspctionType':inspctionType};
    this.inspectionpointsService.observationsOperation(sendValues).then(async data=>{
      this.returnOperationOpData = data;
      this.operationOperationResult = this.returnOperationOpData.Error.ErrorCode;
      if(this.operationOperationResult==1){
        this.returnObservationsArray=[];
        this.returnObLocationsArray=[];
        this.returnObRankingsArray=[];
        this.returnTargetPestsArray=[];
        this.returnArrayObservationsFromServer = this.returnOperationOpData.Data.observations;
        this.returnArrayObLocationsFromServer = this.returnOperationOpData.Data.observationsLocations;
        this.returnArrayObRankingsFromServer = this.returnOperationOpData.Data.observationsRankings;
        this.returnArrayTargetPestsFromServer = this.returnOperationOpData.Data.targetPests;
        for(let i = 0; i < this.returnArrayObservationsFromServer.length;i++) {
          this.returnObservationsArray[i]=[];
          this.returnObservationsArray[i]['id'] = this.returnArrayObservationsFromServer[i].id;
          this.returnObservationsArray[i]['name'] = this.returnArrayObservationsFromServer[i].name;
        }
        for(let i = 0; i < this.returnArrayObLocationsFromServer.length;i++) {
          this.returnObLocationsArray[i]=[];
          this.returnObLocationsArray[i]['id'] = this.returnArrayObLocationsFromServer[i].id;
          this.returnObLocationsArray[i]['name'] = this.returnArrayObLocationsFromServer[i].name;
        }
        for(let i = 0; i < this.returnArrayObRankingsFromServer.length;i++) {
          this.returnObRankingsArray[i]=[];
          this.returnObRankingsArray[i]['id'] = this.returnArrayObRankingsFromServer[i].id;
          this.returnObRankingsArray[i]['name'] = this.returnArrayObRankingsFromServer[i].name;
          this.returnObRankingsArray[i]['value'] = this.returnArrayObRankingsFromServer[i].value;
        }
        for(let i = 0; i < this.returnArrayTargetPestsFromServer.length;i++) {
          this.returnTargetPestsArray[i]=[];
          this.returnTargetPestsArray[i]['id'] = this.returnArrayTargetPestsFromServer[i].id;
          this.returnTargetPestsArray[i]['name'] = this.returnArrayTargetPestsFromServer[i].name;
        }
        this.isSelectedObs = this.returnOperationOpData.Data.isSelected;
        if(this.isSelectedObs!=0)
          this.functionObservationsRecommendations(this.isSelectedObs);
      }
    }).catch(error=>{
      this.functionGetObservationsOperation(branchId,inspctionType)
    });
  }
  async functionObservationsRecommendations(obId:any){
    this.branchId = await this.storage.get('branch_id');
    let sendValues = {'valId':obId,'type':'2','branchId':this.branchId};
    await this.inspectionpointsService.inspectionPointsTypeOperation(sendValues).then(async data=>{
      this.returnRecommendationsData = data;
      this.operationRecommendationsResult = this.returnRecommendationsData.Error.ErrorCode;
      if(this.operationRecommendationsResult==1){
        this.returnArrayRecommendationsFromServer = this.returnRecommendationsData.Data.recommendations;
        this.returnRecommendationsArray=[];
        for(let i = 0; i < this.returnArrayRecommendationsFromServer.length;i++) {
          this.returnRecommendationsArray[i]=[];
          this.returnRecommendationsArray[i]['id'] = this.returnArrayRecommendationsFromServer[i].id;
          this.returnRecommendationsArray[i]['name'] = this.returnArrayRecommendationsFromServer[i].name;
        }
      }
    });
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
  functionAddNewObservation(){
    if(this.observationName == undefined || this.observationName == ""){
      if(this.observationName ==0){
        if(this.observationCustom == undefined || this.observationCustom == ""){
          this.errorObservationName = "ionItemStyleError";
          this.isErrorObservationName = 0;
          this.isdisabled = false;
          return false;
        }
      }else{
        this.errorObservationName = "ionItemStyleError";
        this.isErrorObservationName = 0;
        this.isdisabled = false;
        return false;
      }
    }
    if(this.recommendationName == undefined || this.recommendationName == "" || this.recommendationName == 0){
      if(this.recommendationName == 0){
        if(this.customRecommendation == undefined || this.customRecommendation == ""){
          this.errorRecommendationName = "ionItemStyleError";
          this.isErrorRecommendationName = 0;
          this.isdisabled = false;
          return false;
        }
      }else{
        this.errorRecommendationName = "ionItemStyleError";
        this.isErrorRecommendationName = 0;
        this.isdisabled = false;
        return false;
      }
    }
    if(this.locations.length == 0){
      if(this.customLocations == undefined || this.customLocations == ""){
        this.errorLocationName = "ionItemStyleError";
        this.isErrorLocationName = 0;
        this.isdisabled = false;
        return false;
      }
    }
    if(this.ranking == undefined || this.ranking == "" || this.ranking == 0){
      this.errorRanking = "ionItemStyleError";
      this.isErrorRanking = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.targetPests.length == 0) {
      this.errorTargetPests = "ionItemStyleError";
      this.isErrorTargetPests = 0;
      this.isdisabled = false;
      return false;
    }
      let sendValues = {'zoneId':this.zoneId,'eventId':this.eventId,'inspId':this.inspId,'inspctionType':this.inspctionType,'observationName':this.observationName,'observationCustom':this.observationCustom,'recommendationName':this.recommendationName, 'customRecommendation':this.customRecommendation,'locations':this.locations,
        'customLocations':this.customLocations,'ranking':this.ranking,'targetPests':this.targetPests,'responsibility':this.responsibility};
      this.inspectionpointsService.addObservation(sendValues).then(async data=>{
        this.returnObservationResultData = data;
        let errorData = this.returnObservationResultData.Error.ErrorCode;
        if(errorData == 1){
          this.obId = this.returnObservationResultData.Data.obId;
          if(this.imageLink!=undefined && this.imageLink!=null && this.imageLink!=""){
            let sendValues = {'imageLink':this.imageLink,'obId':this.obId};
            this.http.post('https://fieldserv-elite.com/api/addObsImage',JSON.stringify(sendValues)).subscribe((response:any) => {
            }, (error:any) => {
            });
          }
          this.displayResult(this.observation_name_add_succ);
          this.modalController.dismiss({
            "key":1
          })
        }else if(errorData == 2){
          this.displayResult(this.observation_name_add_failed);
        }else if(errorData == 3 || errorData == 4 || errorData == 5){
          this.displayResult(this.observation_name_add_failed);
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
