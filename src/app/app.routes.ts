import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlantListComponent } from './plant-list/plant-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'plants', component: PlantListComponent }
];