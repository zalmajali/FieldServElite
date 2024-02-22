import { Component, OnInit } from '@angular/core';
import {AlertController,LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import {Storage} from '@ionic/storage-angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import {UsersService} from "../../service/users.service";
import {WorkorderService} from "../../service/workorder.service";
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';
import {CustomerinfoComponent} from "../customerinfo/customerinfo.component";
import {AccountnotesComponent} from "../accountnotes/accountnotes.component";
import {InstructionsComponent} from "../instructions/instructions.component";
import {CompletetasksComponent} from "../completetasks/completetasks.component";
import {WorkorderstatusComponent} from "../workorderstatus/workorderstatus.component";
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import {HttpClient,HttpHeaders } from "@angular/common/http";
import {PropertynumberComponent} from "../propertynumber/propertynumber.component";
import {StartlunchComponent} from "../startlunch/startlunch.component";
import {FollowupComponent} from "../followup/followup.component";
import {LocationinformationComponent} from "../locationinformation/locationinformation.component";
import {WorkordernoteComponent} from "../workordernote/workordernote.component";
@Component({
  selector: 'app-inprogress',
  templateUrl: './inprogress.page.html',
  styleUrls: ['./inprogress.page.scss'],
})
export class InprogressPage implements OnInit {
  public pageTitle: any;
  public isdisabled:boolean=true;
  public workorders_options_one: any;
  public workorders_options_tow: any;
  public workorders_options_three: any;
  public workorders_options_fore: any;
  public workorders_options_five: any;
  public workorders_options_six: any;
  public workorders_options_seven: any;
  public workorders_options_nine: any;
  public workorders_call_msg: any;
  public workorders_loc_msg_one: any;
  public workorders_loc_msg_tow: any;
  public workorders_filter: any;
  public teamId: any;
  public branchId: any;
  public branchType: any;
  public inDayes:any = 2;
  public routId:any;
  public error_no_inprogress_orders_large:any;
  public error_no_inprogress_orders_small:any;
  public start_route:any;
  public error_select_employee_routes:any;
  public returnWorkordersData:any;
  public returnArrayWorkordersFromServer:any;
  public returnWorkordersArray:any = [];
  public operationWorkordersResult:any;
  public workorders:any;
  public critical:any;
  public high:any;
  public medium:any;
  public low:any;
  public returnStartWorkordersData:any;
  public operationStartWorkordersResult:any;
  public complete_tasks:any;
  public returnCheckInspectionOperationData:any;
  public check_inspection_num:any;
  public tasks_status_one:any;
  public tasks_status_tow:any;
  public tasks_status_three:any;
  public tasks_status_for:any;
  public tasks_status_five:any;
  public barcode:any;
  public ip_add_barcode_failed:any;
  public returncheckQrcodeOrBarcodeData:any;
  public yes:any;
  public no:any;
  public check_bar_site:any;
  public check_qr_site:any;
  public save_barcode_succ:any;
  public save_barcode_failed:any;
  public returnUpdateWorkOrderData:any;
  public ip_add_image_succ: any;
  public ip_add_image_failed: any;
  public imageLink: any;
  public save_location_succ: any;
  public save_location_failed: any;
  public routeLogId: any;
  public routeId: any;
  public showLunchButton: any=0;
  public workorder_followup: any;
  //check route Log
  public returnCheckRoutsLog:any;
  public operationResultCheckRoutsLog:any;
  public employeesLogArray:any = [];
  public checkRoute:any = 2;
  //check login
  public fullName:any;
  public userId:any;
  public username:any;
  public password:any;
  //add for all pages
  public menuDirection: any;
  public floatD: any;
  public menuDirectionTow: any;
  public checkLanguage: any=0;
  public language: any;
  public showMenueValue: any=2;
  public showNotificationIcon: any=1;
  public lat: any;
  public lng: any;
  constructor(private http:HttpClient,private camera: Camera,private alertController:AlertController,private barcodeScanner: BarcodeScanner,private geolocation: Geolocation,private launchNavigator: LaunchNavigator,private workorderService: WorkorderService,private usersService: UsersService,private callNumber: CallNumber,private globalization: Globalization, private translate: TranslateService,private modalController: ModalController,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
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
    this.translate.get('inprogress_title').subscribe((res: string) => {
      this.pageTitle = res;
    });
    this.translate.get('workorders_options_one').subscribe((res: string) => {
      this.workorders_options_one = res;
    });
    this.translate.get('workorders_options_tow').subscribe((res: string) => {
      this.workorders_options_tow = res;
    });
    this.translate.get('follow_up_information').subscribe((res: string) => {
      this.workorders_options_three = res;
    });
    this.translate.get('workorders_options_fore').subscribe((res: string) => {
      this.workorders_options_fore = res;
    });
    this.translate.get('workorders_options_five').subscribe((res: string) => {
      this.workorders_options_five = res;
    });
    this.translate.get('workorders_options_six').subscribe((res: string) => {
      this.workorders_options_six = res;
    });
    this.translate.get('workorders_options_seven').subscribe((res: string) => {
      this.workorders_options_seven = res;
    });
    this.translate.get('workorders_options_nine').subscribe((res: string) => {
      this.workorders_options_nine = res;
    });
    this.translate.get('workorders_call_msg').subscribe((res: string) => {
      this.workorders_call_msg = res;
    });
    this.translate.get('workorders_loc_msg_one').subscribe((res: string) => {
      this.workorders_loc_msg_one = res;
    });
    this.translate.get('workorders_loc_msg_tow').subscribe((res: string) => {
      this.workorders_loc_msg_tow = res;
    });
    this.translate.get('workorders_filter').subscribe((res: string) => {
      this.workorders_filter = res;
    });
    this.translate.get('workorders_filter').subscribe((res: string) => {
      this.workorders_filter = res;
    });
    this.translate.get('error_no_inprogress_orders_large').subscribe((res: string) => {
      this.error_no_inprogress_orders_large = res;
    });
    this.translate.get('error_no_inprogress_orders_small').subscribe((res: string) => {
      this.error_no_inprogress_orders_small = res;
    });
    this.translate.get('critical').subscribe((res: string) => {
      this.critical = res;
    });
    this.translate.get('high').subscribe((res: string) => {
      this.high = res;
    });
    this.translate.get('medium').subscribe((res: string) => {
      this.medium = res;
    });
    this.translate.get('low').subscribe((res: string) => {
      this.low = res;
    });
    this.translate.get('complete_tasks').subscribe((res: string) => {
      this.complete_tasks = res;
    });
    this.translate.get('floatD').subscribe((res: string) => {
      this.floatD = res;
    });
    this.translate.get('tasks_status_one').subscribe((res: string) => {
      this.tasks_status_one = res;
    });
    this.translate.get('tasks_status_tow').subscribe((res: string) => {
      this.tasks_status_tow = res;
    });
    this.translate.get('tasks_status_three').subscribe((res: string) => {
      this.tasks_status_three = res;
    });
    this.translate.get('tasks_status_for').subscribe((res: string) => {
      this.tasks_status_for = res;
    });
    this.translate.get('tasks_status_five').subscribe((res: string) => {
      this.tasks_status_five = res;
    });
    this.translate.get('ip_add_barcode_failed').subscribe((res: string) => {
      this.ip_add_barcode_failed = res;
    });
    this.translate.get('check_bar_site').subscribe((res: string) => {
      this.check_bar_site = res;
    });
    this.translate.get('check_qr_site').subscribe((res: string) => {
      this.check_qr_site = res;
    });
    this.translate.get('yes').subscribe((res: string) => {
      this.yes = res;
    });
    this.translate.get('no').subscribe((res: string) => {
      this.no = res;
    });
    this.translate.get('save_barcode_succ').subscribe((res: string) => {
      this.save_barcode_succ = res;
    });
    this.translate.get('save_barcode_failed').subscribe((res: string) => {
      this.save_barcode_failed = res;
    });
    this.translate.get('ip_add_image_succ').subscribe((res: string) => {
      this.ip_add_image_succ = res;
    });
    this.translate.get('ip_add_image_failed').subscribe((res: string) => {
      this.ip_add_image_failed = res;
    });
    this.translate.get('save_location_succ').subscribe((res: string) => {
      this.save_location_succ = res;
    });
    this.translate.get('save_location_failed').subscribe((res: string) => {
      this.save_location_failed = res;
    });
    this.translate.get('workorder_followup').subscribe((res: string) => {
      this.workorder_followup = res;
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
    this.teamId = await this.storage.get('team_id');
    this.inDayes = await this.storage.get('inDayes');
    this.branchId = await this.storage.get('branch_id');
    this.branchType = await this.storage.get('branch_type');
    this.routeLogId = await this.storage.get('routeLogId');
    this.routeId = await this.storage.get('routeId');
    if(this.routeId != null && this.routeId != 0 && this.routeId != undefined && this.routeLogId != undefined && this.routeLogId != 0 && this.routeLogId != null)
    this.showLunchButton = 1;
    if(this.teamId == null || this.teamId == 0 || this.teamId == undefined || this.branchId == undefined || this.branchId == 0 || this.branchId == null)
      this.navCtrl.navigateRoot('login');
    this.functionCheckRoutsLog(this.teamId,this.branchId);
    await loading.present();
  }
  async functionCheckRoutsLog(teamId:any,branchId:any){
    let sendValues = {'teamId':this.teamId,'branchId':this.branchId};
    await this.workorderService.checkRoutsLog(sendValues).then(async data=>{
      this.returnCheckRoutsLog = data;
      this.operationResultCheckRoutsLog = this.returnCheckRoutsLog.Error.ErrorCode;
      if(this.operationResultCheckRoutsLog==1){
        this.checkRoute = 0;
        this.routId = this.returnCheckRoutsLog.Data.routId;
        await this.storage.set('routeLogId',this.returnCheckRoutsLog.Data.routLogId);
        await this.storage.set('routeId',this.routId);
        this.functionGetWorkorders(this.routId,branchId)
      }
      else{
        this.checkRoute = 1;
      }
    })
  }
  async functionEmployeeStartRoute(){
    this.navCtrl.navigateRoot('employees');
    this.displayResult(this.error_select_employee_routes);
  }
async functionReadeBarcode(workSiteAddressId:any){
  this.barcodeScanner.scan().then(async barcodeData => {
    this.barcode = barcodeData.text
    let sendValues = {'workSiteAddressId':workSiteAddressId,barcode:this.barcode,type:1};
    this.workorderService.checkQrcodeOrBarcode(sendValues).then(async data=>{
      this.returncheckQrcodeOrBarcodeData = data;
      let errorData = this.returncheckQrcodeOrBarcodeData.Error.ErrorCode;
      if(errorData == 1){
        const alert = await this.alertController.create({
          cssClass: 'alertBac',
          mode: 'ios',
          message:this.check_bar_site,
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
                let sendValues = {'workSiteAddressId':workSiteAddressId,'val':this.barcode,'type':1};
                this.workorderService.updateWorkOrderData(sendValues).then(async data=>{
                  this.returnUpdateWorkOrderData = data;
                  let errorData = this.returnUpdateWorkOrderData.Error.ErrorCode;
                  if(errorData==1){
                    this.displayResult(this.save_barcode_succ);
                  }
                  else if(errorData==5)
                    this.displayResult(this.save_barcode_failed);
                  else
                    this.displayResult(this.save_barcode_failed);
                }).catch(error=>{
                  this.displayResult(this.save_barcode_failed);
                });
              }
            }
          ]
        });
        await alert.present();
      }else{
        let sendValues = {'workSiteAddressId':workSiteAddressId,'val':this.barcode,'type':1};
        this.workorderService.updateWorkOrderData(sendValues).then(async data=>{
          this.returnUpdateWorkOrderData = data;
          let errorData = this.returnUpdateWorkOrderData.Error.ErrorCode;
          if(errorData==1){
            this.displayResult(this.save_barcode_succ);
          }
          else if(errorData==5)
            this.displayResult(this.save_barcode_failed);
          else
            this.displayResult(this.save_barcode_failed);
        }).catch(error=>{
          this.displayResult(this.save_barcode_failed);
        });
      }
    });
  }).catch(err => {
    this.displayResult(this.ip_add_barcode_failed)
  });
}
  async functionSaveLocation(workSiteAddressId:any){
    await this.geolocation.getCurrentPosition().then(async (resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
    })
    let valLocation = this.lat+','+ this.lng;
    let sendValues = {'workSiteAddressId':workSiteAddressId,'val':valLocation,'type':3};
    this.workorderService.updateWorkOrderData(sendValues).then(async data=>{
      this.returnUpdateWorkOrderData = data;
      let errorData = this.returnUpdateWorkOrderData.Error.ErrorCode;
      if(errorData==1){
        this.displayResult(this.save_location_succ);
      }
      else if(errorData==5)
        this.displayResult(this.save_location_failed);
      else
        this.displayResult(this.save_location_failed);
    }).catch(error=>{
      this.displayResult(this.save_location_failed);
    });
  }
 async functionPropertyNumber(eventId:any,ordersId:any,workSiteAddressId:any){
    let model = await this.modalController.create({
      component:PropertynumberComponent,
      animated:true,
      componentProps:{eventId:eventId,ordersId:ordersId,workSiteAddressId:workSiteAddressId},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
    });
    await model.present();
  }
  async functionWorkordernote(eventId:any,ordersId:any,workSiteAddressId:any){
    let model = await this.modalController.create({
      component:WorkordernoteComponent,
      animated:true,
      componentProps:{eventId:eventId,ordersId:ordersId,workSiteAddressId:workSiteAddressId},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
    });
    await model.present();
  }
async functionTaskImage(workSiteAddressId:any){
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
    let sendValues = {'workSiteAddressId':workSiteAddressId,'val':this.imageLink,'type':4};
    let headers = new HttpHeaders()
      .set('appKey', '13930b192274c5799a04f285bfc9e275')
      .set('Content-Type', 'application/json');
    this.http.post('https://fieldserv-elite.com/api/updateWorkOrderData',JSON.stringify(sendValues),{ headers }).subscribe((response:any) => {
    }, (error:any) => {
    });
    this.displayResult(this.ip_add_image_succ)
  }, (err) => {
    this.displayResult(this.ip_add_image_failed)
  });
  }
  async functionGetWorkorders(routId:any,branchId:any){
    let sendValues = {'routId':routId,'branchId':branchId};
    this.workorderService.inprogressOrders(sendValues).then(async data=>{
      this.returnWorkordersData = data;
      this.operationWorkordersResult = this.returnWorkordersData.Error.ErrorCode;
      if(this.operationWorkordersResult==1){
        this.returnArrayWorkordersFromServer = this.returnWorkordersData.Data.orders;
        this.returnWorkordersArray=[];
        for(let i = 0; i < this.returnArrayWorkordersFromServer.length;i++) {
          this.returnWorkordersArray[i]=[];
          this.returnWorkordersArray[i]['scheid'] = this.returnArrayWorkordersFromServer[i].scheid;//this from workorder_event_schedule.id
          this.returnWorkordersArray[i]['startDate'] = this.returnArrayWorkordersFromServer[i].startDate;//this from workorder_event_schedule.start_date هذا التاريخ مهم على شان سحب االاوردر من تاريخ الى تاريخ
          this.returnWorkordersArray[i]['scheduledTimeType'] = this.returnArrayWorkordersFromServer[i].scheduledTimeType;//this from workorder_event_schedule.scheduled_time_type نوع الوقت الخاص بالراوت هل هو من وقت الى وقت او من خلال وقت مفتوح      done
          this.returnWorkordersArray[i]['specificTime'] = this.returnArrayWorkordersFromServer[i].specificTime;//this from workorder_event_schedule.specific_time تحدد الوتق اللازم للعمل عندما تكون القيمة scheduled_time_type تكون 1      done
          this.returnWorkordersArray[i]['timeRange'] = this.returnArrayWorkordersFromServer[i].timeRange;//this from workorder_event_schedule.time_range تحدد الوتق اللازم للعمل عندما تكون القيمة scheduled_time_type تكون 2      done
          this.returnWorkordersArray[i]['rangeStartTime'] = this.returnArrayWorkordersFromServer[i].rangeStartTime;//this from workorder_event_schedule.range_start_time تحدد الوتق اللازم للعمل عندما تكون القيمة scheduled_time_type تكون 2      done
          this.returnWorkordersArray[i]['rangeEndTime'] = this.returnArrayWorkordersFromServer[i].rangeEndTime;//this from workorder_event_schedule.range_end_time تحدد الوتق اللازم للعمل عندما تكون القيمة scheduled_time_type تكون 2      done
          this.returnWorkordersArray[i]['eventId'] = this.returnArrayWorkordersFromServer[i].eventId;//this event_id from workorder_events      done
          this.returnWorkordersArray[i]['eventName'] = this.returnArrayWorkordersFromServer[i].eventName;//this event_name from workorder_events       done
          this.returnWorkordersArray[i]['ordersId'] = this.returnArrayWorkordersFromServer[i].ordersId;//this id from workorders       done
          this.returnWorkordersArray[i]['sourceName'] = this.returnArrayWorkordersFromServer[i].sourceName;//this source_name from workorders
          this.returnWorkordersArray[i]['ordType'] = this.returnArrayWorkordersFromServer[i].ordType;//this source_name from workorders
          if(this.returnArrayWorkordersFromServer[i].priority == 1)
            this.returnWorkordersArray[i]['priority'] =this.critical;
          if(this.returnArrayWorkordersFromServer[i].priority == 2)
            this.returnWorkordersArray[i]['priority'] =this.high;
          if(this.returnArrayWorkordersFromServer[i].priority == 3)
            this.returnWorkordersArray[i]['priority'] =this.medium;
          if(this.returnArrayWorkordersFromServer[i].priority == 4)
            this.returnWorkordersArray[i]['priority'] =this.low
          this.returnWorkordersArray[i]['firstName'] = this.returnArrayWorkordersFromServer[i].firstName;//this first_name from workorder_customer_info    done
          this.returnWorkordersArray[i]['middleName'] = this.returnArrayWorkordersFromServer[i].middleName;//this middle_name from workorder_customer_info    done
          this.returnWorkordersArray[i]['lastName'] = this.returnArrayWorkordersFromServer[i].lastName;//this last_name from workorder_customer_info    done
          this.returnWorkordersArray[i]['businessName'] = this.returnArrayWorkordersFromServer[i].businessName;//this business_name from workorder_customer_info      done
          this.returnWorkordersArray[i]['extraPhone'] = this.returnArrayWorkordersFromServer[i].extraPhone;//this id from workorder_site_address
          this.returnWorkordersArray[i]['extraMobile'] = this.returnArrayWorkordersFromServer[i].extraPhone;//this id from workorder_site_address
          this.returnWorkordersArray[i]['extraFax'] = this.returnArrayWorkordersFromServer[i].extraPhone;//this id from workorder_site_address
          this.returnWorkordersArray[i]['streetNo'] = this.returnArrayWorkordersFromServer[i].streetNo;//this street_no from workorder_site_address      done
          this.returnWorkordersArray[i]['streetName'] = this.returnArrayWorkordersFromServer[i].streetName;//this street_name from workorder_site_address      done
          this.returnWorkordersArray[i]['addressLineOne'] = this.returnArrayWorkordersFromServer[i].addressLineOne;//this address_line_1 from workorder_site_address       done
          this.returnWorkordersArray[i]['propertyName'] = this.returnArrayWorkordersFromServer[i].propertyName;//this property_name from workorder_site_address      done
          this.returnWorkordersArray[i]['propertyNumberRequired'] = this.returnArrayWorkordersFromServer[i].propertyNumberRequired;//this property_number_required from workorder_site_address
          this.returnWorkordersArray[i]['propertyNumber'] = this.returnArrayWorkordersFromServer[i].propertyNumber;//this property_number from workorder_site_address
          this.returnWorkordersArray[i]['barcodeRequired'] = this.returnArrayWorkordersFromServer[i].barcodeRequired;//this barcode_required from workorder_site_address
          this.returnWorkordersArray[i]['siteAddBarcode'] = this.returnArrayWorkordersFromServer[i].siteAddBarcode;//this barcode from workorder_site_address
          this.returnWorkordersArray[i]['qrCode'] = this.returnArrayWorkordersFromServer[i].qrCode;//this qr_code from workorder_site_address
          this.returnWorkordersArray[i]['siteAddGeolocation'] = this.returnArrayWorkordersFromServer[i].siteAddGeolocation;//this geolocation from workorder_site_address
          this.returnWorkordersArray[i]['siteAddImage'] = this.returnArrayWorkordersFromServer[i].siteAddImage;//this image from workorder_site_address
          this.returnWorkordersArray[i]['workSiteAddressId'] = this.returnArrayWorkordersFromServer[i].workSiteAddressId;//this id from workorder_site_address
          this.returnWorkordersArray[i]['eventEventId'] = this.returnArrayWorkordersFromServer[i].eventEventId;//this id from events
        }
        let countOfData = this.returnWorkordersArray.length;
        if(countOfData == 0)
          this.workorders = 0;
        else{
          this.workorders = 1;
        }
      }else
        this.workorders = 0;
    }).catch(error=>{
      this.functionGetWorkorders(routId,branchId)
    });
  }
  async functionStartWorkorder(eventName:any,eventId:any,ordersId:any,workSiteAddressId:any,eventEventId:any){
    this.navCtrl.navigateRoot(['/zones', {eventName:eventName,eventId:eventId,ordersId:ordersId,workSiteAddressId:workSiteAddressId,eventEventId:eventEventId}]);
  }
  functionCallNumber(numer:any){
    this.callNumber.callNumber(numer, true)
      .then(async res =>{
      })
      .catch(err =>{
        this.displayResult(this.workorders_call_msg);
      });
  }
  functionGoLocation(location:any){
    this.geolocation.getCurrentPosition().then(position=>{
      let options: LaunchNavigatorOptions = {
        app: this.launchNavigator.APP.GOOGLE_MAPS,
      };
      let res = location.split(",");
      this.launchNavigator.navigate([res[0], res[1]],options)
        .then(success =>{
          this.displayResult(this.workorders_loc_msg_tow);
        },error=>{
          this.displayResult(this.workorders_loc_msg_tow);
        })
    }).catch(e=>{
      this.displayResult(this.workorders_loc_msg_one);
    })
  }
  async functionCustomerInformation(firstName:any,middleName:any,lastName:any,businessName:any,extraPhone:any,extraMobile:any,extraFax:any){
    let model = await this.modalController.create({
      component:CustomerinfoComponent,
      animated:true,
      componentProps:{firstName:firstName,middleName:middleName,lastName:lastName,businessName:businessName,extraPhone:extraPhone,extraMobile:extraMobile,extraFax:extraFax},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{

    });
    await model.present();
  }
  async functionAccountNotes(eventId:any,orderId:any){
    let model = await this.modalController.create({
      component:AccountnotesComponent,
      animated:true,
      componentProps:{eventId:eventId,orderId:orderId},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
    });
    await model.present();
  }
 async functionFollowupWorkorder(eventId:any,ordersId:any){
    let model = await this.modalController.create({
      component:FollowupComponent,
      animated:true,
      componentProps:{eventId:eventId,ordersId:ordersId},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
    });
    await model.present();
  }
  async functionLocatioInformation(eventId:any,ordersId:any,workSiteAddressId:any){
    let model = await this.modalController.create({
      component:LocationinformationComponent,
      animated:true,
      componentProps:{eventId:eventId,ordersId:ordersId,workSiteAddressId:workSiteAddressId},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
    });
    await model.present();
  }
 async functionStartLunch(routeId:any,routeLogId:any){
   this.navCtrl.navigateRoot(['lunchinformation',{routeId:routeId,routeLogId:routeLogId}]);
  }
  async functionInstructions(eventId:any,orderId:any){
    let model = await this.modalController.create({
      component:InstructionsComponent,
      animated:true,
      componentProps:{eventId:eventId,orderId:orderId},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
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
  async functionCompleteTasks(eventId:any,ordersId:any,workSiteAddressId:any,barcodeRequired:any,type:any){
    if(type == 6){
      let model = await this.modalController.create({
        component:CompletetasksComponent,
        animated:true,
        componentProps:{eventId:eventId,ordersId:ordersId,workSiteAddressId:workSiteAddressId,barcodeRequired:barcodeRequired},
        cssClass:"modalFilterSortCss"
      });
      model.onDidDismiss().then((data):any=>{
        this.ngOnInit();
      });
      await model.present();
    }else{
      let model = await this.modalController.create({
        component:WorkorderstatusComponent,
        animated:true,
        componentProps:{eventId:eventId,ordersId:ordersId,workSiteAddressId:workSiteAddressId,type:type},
        cssClass:"modalFilterSortCss"
      });
      model.onDidDismiss().then((data):any=>{
        this.ngOnInit();
      });
      await model.present();
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
