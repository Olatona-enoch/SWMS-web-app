import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';
import { SchedulePickupPageComponent } from './features/pickup/pages/schedule-pickup-page/schedule-pickup-page.component';

export const routes: Routes = [
    { path: '', redirectTo: '/schedule-pickup', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'schedule-pickup', component: SchedulePickupPageComponent }

];
