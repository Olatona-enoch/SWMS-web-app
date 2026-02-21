import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DashboardComponent } from "./features/dashboard/pages/dashboard/dashboard.component";
import { SidebarComponent } from "./features/sidebar/sidebar.component";
import { SchedulePickupPageComponent } from "./features/pickup/pages/schedule-pickup-page/schedule-pickup-page.component";
import { CommonModule } from '@angular/common';
import { RegisterComponent } from "./features/auth/pages/register/register.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, RegisterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'swms_web_app';
  signedIn: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.signedIn == false) {
      this.navigateToLogin();
    }else
    if (this.signedIn == true) {
      this.navigateToDashboard();
    }
  }
  navigateToDashboard() {
      this.router.navigate(['/dashboard']);

  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
