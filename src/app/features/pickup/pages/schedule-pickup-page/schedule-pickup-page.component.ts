import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../../header/header.component";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedule-pickup-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ReactiveFormsModule],
  templateUrl: './schedule-pickup-page.component.html',
  styleUrl: './schedule-pickup-page.component.scss'
})
export class SchedulePickupPageComponent implements OnInit {

  pickupForm!: FormGroup;
  minDate!: string;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.setMinDate();
  }
  //to get todays date in the right format and set it as the min date for a pickup
  private setMinDate(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    this.minDate = `${year}-${month}-${day}`;
  }

  private initForm(): void {
    this.pickupForm = this.fb.group({
      location: ['', Validators.required],
      binType: ['', Validators.required],
      pickupDate: ['', Validators.required],
      timeSlot: ['', Validators.required],
      notes: ['']
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.pickupForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.pickupForm.valid) {
      console.log('Form submitted:', this.pickupForm.value);
      // Add your submission logic here
    } else {
      this.pickupForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.initForm();
  }

}
