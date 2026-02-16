import { Component } from '@angular/core';
import { HeaderComponent } from "../../../header/header.component";
import { CommonModule } from '@angular/common';

interface NotificationItem {
  id: number;
  title: string;
  description: string;
  time: string;
  type: 'success' | 'warning' | 'info' | 'primary';
  read: boolean;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {
  notifications: NotificationItem[] = [];

  ngOnInit(): void {
    this.initializeNotifications();
  }

  private initializeNotifications(): void {
    this.notifications = [
      {
        id: 1,
        title: 'Pickup scheduled successfully',
        description: 'Your waste pickup has been scheduled for Feb 15, 2026 at 09:00 AM',
        time: '10 minutes ago',
        type: 'success',
        read: false
      },
      {
        id: 2,
        title: 'Payment under review',
        description: 'Your payment of $25.00 is being verified by our team',
        time: '1 hour ago',
        type: 'warning',
        read: false
      },
      {
        id: 3,
        title: 'Pickup completed',
        description: 'Your scheduled pickup for Feb 12, 2026 has been completed',
        time: '2 hours ago',
        type: 'success',
        read: false
      },
      {
        id: 4,
        title: 'Payment confirmed',
        description: 'Your payment of $25.00 has been confirmed successfully',
        time: '3 hours ago',
        type: 'primary',
        read: false
      },
      {
        id: 5,
        title: 'Bin report resolved',
        description: 'Your bin report #BR-3421 has been resolved and marked as complete',
        time: '5 hours ago',
        type: 'info',
        read: false
      },
      {
        id: 6,
        title: 'Pickup reminder',
        description: 'Your pickup is scheduled for tomorrow at 09:00 AM',
        time: '6 hours ago',
        type: 'primary',
        read: false
      },
      {
        id: 7,
        title: 'Bin report received',
        description: 'Your bin report has been received and is being reviewed',
        time: '8 hours ago',
        type: 'success',
        read: false
      },
      {
        id: 8,
        title: 'Payment due reminder',
        description: 'Your monthly payment of $25.00 is due on Feb 15, 2026',
        time: '12 hours ago',
        type: 'warning',
        read: false
      },
      {
        id: 9,
        title: 'Pickup completed',
        description: 'Your scheduled pickup for Feb 10, 2026 has been completed',
        time: '1 day ago',
        type: 'success',
        read: true
      },
      {
        id: 10,
        title: 'Payment confirmed',
        description: 'Your payment of $25.00 for January 2026 has been confirmed',
        time: '2 days ago',
        type: 'primary',
        read: true
      }
    ];
  }

  markAllAsRead(): void {
    this.notifications = this.notifications.map(notification => ({
      ...notification,
      read: true
    }));
    console.log('All notifications marked as read');
  }

  toggleRead(id: number): void {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.read = !notification.read;
      console.log(`Notification ${id} read status:`, notification.read);
    }
  }
}
