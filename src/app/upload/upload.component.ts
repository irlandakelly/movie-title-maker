import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  ],
})
export class UploadComponent {
  @Input() hasFiles: boolean = false;
  @Output() fileSelect = new EventEmitter<File[]>();
  files: File[] = []; // Store all selected and dropped files

  // Trigger file input dialog
  onFileInputClick(): void {
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    input.click();
  }

  // Handle file input selection
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.addFiles(Array.from(input.files));
      input.value = ''; // Clear input to allow reselecting the same files
    }
  }

  // Handle drag-and-drop
  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      this.addFiles(Array.from(event.dataTransfer.files));
    }
  }

  // Prevent default behavior during drag-over
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  // Remove a file from the list
  removeFile(index: number): void {
    this.files.splice(index, 1);
    this.fileSelect.emit(this.files);
  }

  // Add new files to the list, avoiding duplicates
  private addFiles(newFiles: File[]): void {
    const existingFiles = new Set(this.files.map((file) => file.name));
    const uniqueFiles = newFiles.filter((file) => !existingFiles.has(file.name));
    this.files = [...this.files, ...uniqueFiles];
    this.fileSelect.emit(this.files);
  }
}
