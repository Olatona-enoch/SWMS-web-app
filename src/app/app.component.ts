import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from "./features/dashboard/pages/dashboard/dashboard.component";
import { SidebarComponent } from "./features/sidebar/sidebar.component";
import { SchedulePickupPageComponent } from "./features/pickup/pages/schedule-pickup-page/schedule-pickup-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DashboardComponent, SidebarComponent, SchedulePickupPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'swms_web_app';
}
