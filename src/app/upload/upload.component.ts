import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    RouterModule,
  ]
})
export class UploadComponent {
  @Output() fileSelect = new EventEmitter<File[]>();
  files: File[] = [];

  onFileInputClick(): void {
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    input.click();
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.files = Array.from(input.files);
      this.fileSelect.emit(this.files);
    }
  }

  onDrop(event: any): void {
    this.files = [...this.files, ...event.dataTransfer.files];
    this.fileSelect.emit(this.files);
  }

  removeFile(index: number): void {
    this.files.splice(index, 1);
    this.fileSelect.emit(this.files);
  }
}