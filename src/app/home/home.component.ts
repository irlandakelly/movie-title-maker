import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UploadComponent } from '../upload/upload.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { DataDisplayComponent } from '../data-display/data-display.component';
import { CommonModule } from '@angular/common';
import { PreviewComponent } from "../preview/preview.component";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MatCardModule, ToolbarComponent, UploadComponent, DataDisplayComponent, CommonModule, PreviewComponent],
})
export class HomeComponent {
  files: File[] = [];

  // Trigger file input click
  onFileInputClick(): void {
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    input.click();
  }

  // Handle file selection
  onFileSelect(files: File[]): void {
    this.files = files;
    console.log('Selected files:', this.files);
  }
}
