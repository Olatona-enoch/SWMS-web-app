import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../header/header.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HeaderComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {

  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  
  isEditingProfile: boolean = false;
  isProfileSubmitted: boolean = false;
  isPasswordSubmitted: boolean = false;

  // Password visibility toggles
  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  notifications = {
    pickupReminders: true,
    paymentUpdates: true,
    binReportUpdates: false,
    systemAnnouncements: true
  };

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initProfileForm();
    this.initPasswordForm();
  }

  private initProfileForm(): void {
    this.profileForm = this.fb.group({
      fullName: ['John Doe', Validators.required],
      email: ['john.doe@example.com', [Validators.required, Validators.email]],
      phone: ['+234 123 456 7890', [Validators.required, Validators.minLength(10)]],
      homeAddress: ['123 Main Street, Lagos', Validators.required]
    });

    this.profileForm.disable();
  }

  private initPasswordForm(): void {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    if (!newPassword || !confirmPassword) {
      return null;
    }

    return newPassword.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  isFieldInvalid(fieldName: string, form: FormGroup, isSubmitted: boolean): boolean {
    const field = form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || isSubmitted));
  }

  togglePasswordVisibility(field: 'current' | 'new' | 'confirm'): void {
    switch(field) {
      case 'current':
        this.showCurrentPassword = !this.showCurrentPassword;
        break;
      case 'new':
        this.showNewPassword = !this.showNewPassword;
        break;
      case 'confirm':
        this.showConfirmPassword = !this.showConfirmPassword;
        break;
    }
  }

  onProfileAction(): void {
    if (!this.isEditingProfile) {
      this.isEditingProfile = true;
      this.profileForm.enable();
      this.isProfileSubmitted = false;
    } else {
      this.isProfileSubmitted = true;

      if (this.profileForm.valid) {
        console.log('Profile updated:', this.profileForm.value);
        this.isEditingProfile = false;
        this.profileForm.disable();
        this.isProfileSubmitted = false;
      } else {
        this.profileForm.markAllAsTouched();
      }
    }
  }

  onPasswordUpdate(): void {
    this.isPasswordSubmitted = true;

    if (this.passwordForm.valid) {
      console.log('Password updated:', {
        currentPassword: this.passwordForm.get('currentPassword')?.value,
        newPassword: this.passwordForm.get('newPassword')?.value
      });

      this.passwordForm.reset();
      this.isPasswordSubmitted = false;
      
      // Reset visibility toggles
      this.showCurrentPassword = false;
      this.showNewPassword = false;
      this.showConfirmPassword = false;
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }

  onLogout(): void {
    console.log('Logging out...');
    this.router.navigate(['/login']);
  }

  onDeleteAccount(): void {
    const confirmed = confirm('Are you sure you want to delete your account? This action cannot be undone.');
    
    if (confirmed) {
      console.log('Deleting account...');
    }
  }
}
