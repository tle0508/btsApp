import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BtsHomeComponent } from './bts-home/bts-home.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { ExtensionBtsComponent } from './extension-bts/extension-bts.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'bts-home', component: BtsHomeComponent },
  { path: 'extension-bts', component: ExtensionBtsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
