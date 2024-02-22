import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class InspectionpointsService {
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
  async inspectionpointsOperation(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"inspectionPointsOperation",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async addInspectionPoints(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"addInspectionPoints",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async editInspectionPoints(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"editInspectionPoints",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async targetPestsOperation(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"targetPestsOperation",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async targetPests(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"targetPests",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async deleteTargetPests(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"deleteTargetPests",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async observationsOperation(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"observationsOperation",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async editObservation(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"editObservation",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async addObservation(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"addObservation",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async observationsInformation(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"observationsInformation",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async observations(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"observations",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async addTargetPests(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"addTargetPests",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async checkInspectionPoints(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"checkInspectionPoints",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async materialsOperation(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"materialsOperation",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async editMaterials(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"editMaterials",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async plantsOperation(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"plantsOperation",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async deletePlants(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"deletePlants",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async addEquipment(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"addEquipment",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async editEquipment(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"editEquipment",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async addInspectionLocation(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"addInspectionLocation",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async deleteEquipment(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"deleteEquipment",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async endInspectionsPoints(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"endInspectionsPoints",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async deleteMaterials(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"deleteMaterials",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async deleteInspectionPoints(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"deleteInspectionPoints",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async deleteObservationImage(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"deleteObservationImage",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async deleteObservations(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"deleteObservations",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async equipment(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"equipment",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async equipmentOperation(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"equipmentOperation",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async addPlants(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"addPlants",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async editPlants(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"editPlants",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async plants(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"plants",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async addMaterials(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"addMaterials",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async materialsInformation(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"materialsInformation",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async materialsInformationByItem(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"materialsInformationByItem",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async materials(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"materials",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async inspectionPointsTypeOperation(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '13930b192274c5799a04f285bfc9e275')
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"inspectionPointsTypeOperation",JSON.stringify(item),{ headers }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
}
