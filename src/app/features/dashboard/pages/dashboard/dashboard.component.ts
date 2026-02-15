import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../header/header.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  userName: string = 'John Doe';
  userInitials: string = 'JD';

  ngOnInit(): void {
    // Fetch dashboard data here
  }
}
