import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HeaderComponent } from "../../../header/header.component";
import { ReactiveFormsModule } from '@angular/forms';

export interface ReportBinRequest {
  binId: string;
  issueType: string;
  location: string;
  photo?: File;
  notes?: string;
}

@Component({
  selector: 'app-report-bin',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ReactiveFormsModule],
  templateUrl: './report-bin.component.html',
  styleUrl: './report-bin.component.scss'
})
export class ReportBinComponent {
  reportForm!: FormGroup;
  isSubmitted: boolean = false;
  selectedFileName: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.reportForm = this.fb.group({
      binId: ['', [Validators.required, Validators.minLength(3)]],
      issueType: ['', Validators.required],
      location: ['', Validators.required],
      photo: [null],
      notes: ['', Validators.maxLength(500)]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.reportForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || this.isSubmitted));
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.reportForm.patchValue({ photo: file });
      this.selectedFileName = file.name;
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        this.reportForm.patchValue({ photo: file });
        this.selectedFileName = file.name;
      }
    }
  }

  onScanQR(): void {
    console.log('Scanning QR code...');
    // QR scanner logic would go here
    // For now, just log the action
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.reportForm.valid) {
      const formValue: ReportBinRequest = {
        binId: this.reportForm.get('binId')?.value,
        issueType: this.reportForm.get('issueType')?.value,
        location: this.reportForm.get('location')?.value,
        photo: this.reportForm.get('photo')?.value,
        notes: this.reportForm.get('notes')?.value
      };

      console.log('Report submitted:', formValue);
      
      // Service injection point:
      // this.reportService.submitReport(formValue).subscribe(...)
      
      // Reset after successful submission
      this.resetForm();
    } else {
      this.reportForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.reportForm.reset({
      binId: '',
      issueType: '',
      location: '',
      photo: null,
      notes: ''
    });
    this.isSubmitted = false;
    this.selectedFileName = '';
  }
}
