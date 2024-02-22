import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class WorkorderService {
  private baseUrl = "https://www.fieldserv-elite.com/api";
  public result:any;
  constructor(private http:HttpClient) {
  }
  httpOptionsVal = {
    headers: new HttpHeaders({
      'appKey': '13930b192274c5799a04f285bfc9e275',
      'Content-Type': 'application/json'
    })
  }
  async startRoutes(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"startRoutes",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async checkRoutsLog(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"checkRouteLog",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async getWorkorders(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"getWorkorders",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async deleteZonesPoints(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"deleteZonesPoints",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }

  async inprogressOrders(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"inprogressOrders",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async getRouteRode(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"getRouteRode",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async checkWorkordersRun(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"checkWorkordersRun",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async startWorkorders(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"startWorkorders",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async accountNotes(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"accountNotes",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async workOrderOperation(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"workOrderOperation",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async checkQrcodeOrBarcode(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"checkQrcodeOrBarcode",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async updateWorkOrderData(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"updateWorkOrderData",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async addFollowup(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"addFollowup",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async locationInformation(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"locationInformation",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async woFollowupInformation(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"woFollowupInformation",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async addLunchInTime(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"addLunchInTime",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async checkInspectionByOrder(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"checkInspectionByOrder",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async workOrderComplet(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"workOrderComplet",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async workOrderStatus(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"workOrderStatus",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async instructions(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"instructions",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async siteAdressZones(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"siteAdressZones",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async addZone(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"addZone",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async deleteZone(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"deleteZone",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async inspectionsPoints(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"inspectionsPoints",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
}
