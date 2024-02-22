import { NgModule,NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {HttpClientModule, HttpClient} from "@angular/common/http";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FormsModule } from '@angular/forms';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';
import {ZonesaddComponent} from "./pages/zonesadd/zonesadd.component";
import {ObservationsaddComponent} from "./pages/observationsadd/observationsadd.component";
import {ObservationseditComponent} from "./pages/observationsedit/observationsedit.component";
import {TargetpestsaddComponent} from "./pages/targetpestsadd/targetpestsadd.component";
import {MaterialsaddComponent} from "./pages/materialsadd/materialsadd.component";
import {MaterialseditComponent} from "./pages/materialsedit/materialsedit.component";
import {PlantseditComponent} from "./pages/plantsedit/plantsedit.component";
import {PlantsaddComponent} from "./pages/plantsadd/plantsadd.component";
import {EquipmenteditComponent} from "./pages/equipmentedit/equipmentedit.component";
import {EquipmentaddComponent} from "./pages/equipmentadd/equipmentadd.component";
import {ShowdataComponent} from "./pages/showdata/showdata.component";
import {CustomerinfoComponent} from "./pages/customerinfo/customerinfo.component";
import {AccountnotesComponent} from "./pages/accountnotes/accountnotes.component";
import {InstructionsComponent} from "./pages/instructions/instructions.component";
import {CompletetasksComponent} from "./pages/completetasks/completetasks.component";
import {WorkorderstatusComponent} from "./pages/workorderstatus/workorderstatus.component";
import {PropertynumberComponent} from "./pages/propertynumber/propertynumber.component";
import {StartlunchComponent} from "./pages/startlunch/startlunch.component";
import {FollowupComponent} from "./pages/followup/followup.component";
import {DatepickerComponent} from "./pages/datepicker/datepicker.component";
import {LocationinformationComponent} from "./pages/locationinformation/locationinformation.component";
import {WorkordernoteComponent} from "./pages/workordernote/workordernote.component";
import {NotifiComponent} from "./pages/notifi/notifi.component";
@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  declarations: [AppComponent,ZonesaddComponent,ObservationsaddComponent,WorkordernoteComponent,NotifiComponent,ShowdataComponent,DatepickerComponent,LocationinformationComponent,FollowupComponent,ObservationseditComponent,StartlunchComponent,PropertynumberComponent,WorkorderstatusComponent,CompletetasksComponent,TargetpestsaddComponent,InstructionsComponent,AccountnotesComponent,CustomerinfoComponent,MaterialsaddComponent,MaterialseditComponent,PlantseditComponent,PlantsaddComponent,EquipmenteditComponent,EquipmentaddComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,IonicStorageModule.forRoot(),FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },Globalization,LaunchNavigator,Geolocation,StatusBar,Network,SQLite,CallNumber,BarcodeScanner,Camera,FileTransfer,File],
  bootstrap: [AppComponent],
})
export class AppModule {}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
