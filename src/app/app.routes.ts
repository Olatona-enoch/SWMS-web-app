import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';
import { SchedulePickupPageComponent } from './features/pickup/pages/schedule-pickup-page/schedule-pickup-page.component';
import { ReportBinComponent } from './features/bin-reports/pages/report-bin/report-bin.component';
import { MakePaymentComponent } from './features/payments/pages/make-payment/make-payment.component';

export const routes: Routes = [
    { path: '', redirectTo: '/schedule-pickup', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'schedule-pickup', component: SchedulePickupPageComponent },
    { path: 'report-bin', component: ReportBinComponent },
    { path: 'payments', component: MakePaymentComponent }



];
