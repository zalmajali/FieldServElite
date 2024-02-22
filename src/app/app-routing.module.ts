import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./pages/forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },
  {
    path: 'normal',
    loadChildren: () => import('./pages/normal/normal.module').then( m => m.NormalPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./pages/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'employees',
    loadChildren: () => import('./pages/employees/employees.module').then( m => m.EmployeesPageModule)
  },
  {
    path: 'routemap',
    loadChildren: () => import('./pages/routemap/routemap.module').then( m => m.RoutemapPageModule)
  },
  {
    path: 'customers',
    loadChildren: () => import('./pages/customers/customers.module').then( m => m.CustomersPageModule)
  },
  {
    path: 'workorders',
    loadChildren: () => import('./pages/workorders/workorders.module').then( m => m.WorkordersPageModule)
  },
  {
    path: 'inprogress',
    loadChildren: () => import('./pages/inprogress/inprogress.module').then( m => m.InprogressPageModule)
  },
  {
    path: 'inspectionpoints',
    loadChildren: () => import('./pages/inspectionpoints/inspectionpoints.module').then( m => m.InspectionpointsPageModule)
  },
  {
    path: 'inspectionpointsadd',
    loadChildren: () => import('./pages/inspectionpointsadd/inspectionpointsadd.module').then( m => m.InspectionpointsaddPageModule)
  },
  {
    path: 'zones',
    loadChildren: () => import('./pages/zones/zones.module').then( m => m.ZonesPageModule)
  },
  {
    path: 'observations',
    loadChildren: () => import('./pages/observations/observations.module').then( m => m.ObservationsPageModule)
  },
  {
    path: 'targetpests',
    loadChildren: () => import('./pages/targetpests/targetpests.module').then( m => m.TargetpestsPageModule)
  },
  {
    path: 'materials',
    loadChildren: () => import('./pages/materials/materials.module').then( m => m.MaterialsPageModule)
  },  {
    path: 'plants',
    loadChildren: () => import('./pages/plants/plants.module').then( m => m.PlantsPageModule)
  },
  {
    path: 'equipment',
    loadChildren: () => import('./pages/equipment/equipment.module').then( m => m.EquipmentPageModule)
  },
  {
    path: 'lunchinformation',
    loadChildren: () => import('./pages/lunchinformation/lunchinformation.module').then( m => m.LunchinformationPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
