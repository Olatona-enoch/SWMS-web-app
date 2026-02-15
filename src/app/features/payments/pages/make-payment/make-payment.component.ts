import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../../header/header.component";
import { CommonModule } from '@angular/common';

type PaymentState = 'initial' | 'review' | 'confirmed';

@Component({
  selector: 'app-make-payment',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './make-payment.component.html',
  styleUrl: './make-payment.component.scss'
})
export class MakePaymentComponent {
  paymentState: PaymentState = 'initial';

  constructor(private router: Router) {}

  copyAccountNumber(): void {
    const accountNumber = '0123456789';
    navigator.clipboard.writeText(accountNumber).then(() => {
      console.log('Account number copied to clipboard');
      // Optional: Show toast notification
    });
  }

  onPaymentSubmitted(): void {
    this.paymentState = 'review';
    console.log('Payment submitted for verification');
    setTimeout(() => {
      this.paymentState = 'confirmed';
    }, 3000);
  }

  onCancel(): void {
    console.log('Payment cancelled');
    this.router.navigate(['/dashboard']);
  }

  onBackToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  onDownloadReceipt(): void {
    console.log('Downloading receipt...');
    // Receipt download logic would go here
  }

  // Dev utility to simulate payment confirmation
  simulateConfirmation(): void {
    this.paymentState = 'confirmed';
    console.log('Payment confirmed (simulated)');
  }
}
