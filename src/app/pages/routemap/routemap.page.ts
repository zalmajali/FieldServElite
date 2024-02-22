import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import {Storage} from '@ionic/storage-angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {UsersService} from "../../service/users.service";
import {WorkorderService} from "../../service/workorder.service";
declare var google:any;
@Component({
  selector: 'app-routemap',
  templateUrl: './routemap.page.html',
  styleUrls: ['./routemap.page.scss'],
})
export class RoutemapPage implements OnInit {
  public pageTitle: any;
  public isdisabled:boolean=true;
  public map: any;
  public teamId: any;
  public branchId: any;
  public inDayes:any = 2;
  public routId:any;
  public routLogId:any;
  public returnGeolocationData:any;
  public returnArrayGeolocationFromServer:any;
  public returnGeolocationArray:any = [];
  public operationGeolocationResult:any;
  public geolocation:any = 2;
  public end:any;
  public start:any;
  public allpath:any = [];
  public directionsService:any;
  public directionsDisplay:any;
  public error_no_orders_large:any;
  public error_no_orders_small:any;
  //check login
  public fullName:any;
  public userId:any;
  public username:any;
  public password:any;
  //check route Log
  public returnCheckRoutsLog:any;
  public operationResultCheckRoutsLog:any;
  public employeesLogArray:any = [];
  public checkRoute:any = 2;
  //add for all pages
  public menuDirection: any;
  public menuDirectionTow: any;
  public checkLanguage: any=0;
  public language: any;
  public showMenueValue: any=2;
  public showNotificationIcon: any=1;
  constructor(private workorderService: WorkorderService,private usersService: UsersService,private globalization: Globalization, private translate: TranslateService,private modalController: ModalController,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
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
    this.translate.get('routemap_title').subscribe((res: string) => {
      this.pageTitle = res;
    });
    this.translate.get('error_no_orders_large').subscribe((res: string) => {
      this.error_no_orders_large = res;
    });
    this.translate.get('error_no_orders_small').subscribe((res: string) => {
      this.error_no_orders_small = res;
    });
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    await this.checkLoginUser();
    this.teamId = await this.storage.get('team_id');
    this.inDayes = await this.storage.get('inDayes');
    this.branchId = await this.storage.get('branch_id');
    if(this.teamId == null || this.teamId == 0 || this.teamId == undefined || this.branchId == undefined || this.branchId == 0 || this.branchId == null)
      this.navCtrl.navigateRoot('login');
    this.functionCheckRoutsLog(this.teamId,this.branchId);
  }
  async functionCheckRoutsLog(teamId:any,branchId:any){
    let sendValues = {'teamId':this.teamId,'branchId':this.branchId};
    await this.workorderService.checkRoutsLog(sendValues).then(async data=>{
      this.returnCheckRoutsLog = data;
      this.operationResultCheckRoutsLog = this.returnCheckRoutsLog.Error.ErrorCode;
      if(this.operationResultCheckRoutsLog==1){
        this.checkRoute = 0;
        this.routId = this.returnCheckRoutsLog.Data.routId;
        this.routLogId = this.returnCheckRoutsLog.Data.routLogId;
        await this.storage.set('routeLogId',this.returnCheckRoutsLog.Data.routLogId);
        await this.storage.set('routeId',this.routId);
        this.functionGetGeolocation(this.routId,branchId,this.routLogId)
      }
      else{
        this.checkRoute = 1;
      }
    })
  }
  async functionGetGeolocation(routId:any,branchId:any,routeLogId:any){
    let sendValues = {'routId':routId,'branchId':branchId,'routeLogId':routeLogId};
    this.workorderService.getRouteRode(sendValues).then(async data=>{
      this.returnGeolocationData = data;
      this.operationGeolocationResult = this.returnGeolocationData.Error.ErrorCode;
      if(this.operationGeolocationResult==1){
        this.returnArrayGeolocationFromServer = this.returnGeolocationData.Data.geolocation;
        for(let i = 0; i < this.returnArrayGeolocationFromServer.length;i++) {
          this.allpath[i] = {location: {lat:parseFloat(this.returnArrayGeolocationFromServer[i].startLat), lng:parseFloat(this.returnArrayGeolocationFromServer[i].startLong)}}
        }
        this.start = {lat:parseFloat(this.returnGeolocationData.Data.startLat), lng:parseFloat(this.returnGeolocationData.Data.startLong)};
        this.end = {lat:parseFloat(this.returnGeolocationData.Data.endLat), lng:parseFloat(this.returnGeolocationData.Data.endLong)};
        let countOfData = this.allpath.length;
        if(countOfData == 0)
          this.geolocation = 0;
        else{
          this.geolocation = 1;
          await this.loadMap()
        }
      }else
        this.geolocation = 0;
    }).catch(error=>{
      this.functionGetGeolocation(routId,branchId,routeLogId)
    });
  }

 loadMap() {
    // Create a map options object
    let mapOptions = {
      zoom: 8,
      center: {lat:32.106282, lng:36.095882}
    };
    // Create the map
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    // Initialize the directions service and display
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      map: this.map,
    });
    // Set the start and end locations and request the directions
    let start = this.end;
    let end = this.end;
    let request = {
      origin: start,
      destination: end,
      waypoints: this.allpath,
      optimizeWaypoints: false,
      travelMode: 'DRIVING'
    };
    this.directionsService.route(request, (result:any, status:any) => {
      if (status === google.maps.DirectionsStatus.OK) {
        let distanceCount = 0;
        for(let i = 0; i < result.routes[0].legs.length;i++) {
          distanceCount+=result.routes[0].legs[i].distance.value;
          //this.totalTimeCount+=result.routes[0].legs[i].duration.value;
        }
        //this.totalKmCount = Math.floor(distanceCount/1000);
        //this.totalTimeCountHours = Math.ceil(this.totalTimeCount/3600);
        let directionsRenderer = new google.maps.DirectionsRenderer({
          suppressMarkers: false,
          polylineOptions: {
            geodesic: true,
            strokeColor: "#FF7901",
            strokeOpacity: 1.0,
            strokeWeight: 2,
          },  markerOptions: {
            icon: {
              // Specify the icon image
              url: '../assets/images/log.png',
            },

          }
        });
        directionsRenderer.setMap(this.map);
        directionsRenderer.setDirections(result);
      }
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
}
