import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UploadComponent } from '../upload/upload.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { DataDisplayComponent } from '../data-display/data-display.component';
import { CommonModule } from '@angular/common';
import { ArtworkPaneComponent } from '../artwork-pane/artwork-pane.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MatCardModule, ToolbarComponent, UploadComponent, DataDisplayComponent, CommonModule, ArtworkPaneComponent],
})
export class HomeComponent {
  files: File[] = [];

  get hasFiles(): boolean {
    return this.files && this.files.length > 0;
  }

  movieData = {
    title: '',
    genre: '',
    credits: [] as { role: string; name: string }[],
  };

  constructor() {
    this.generateMovieData();
  }

  onFileSelect(files: File[]): void {
    this.files = files;
    this.generateMovieData();
  }

  generateMovieData(): void {
    const titles = ['The Great Adventure', 'Haunted Nights', 'Cosmic Voyage', 'Love in Paris'];
    const genres = ['horror', 'romance', 'scifi', 'suspense'];
    const roles = ['Director', 'Producer', 'Screenwriter', 'Music Composer'];
    const persons = [
      'John Smith', 'Jane Doe', 'Alice Johnson', 'Robert Brown',
      'Emily Davis', 'Michael Wilson', 'Sarah Miller', 'David Anderson',
      'Laura Thomas', 'James Jackson', 'Linda White', 'Daniel Harris',
      'Maria Martinez', 'Charles Thompson', 'Patricia Garcia', 'Thomas Martin',
      'Jennifer Rodriguez', 'Brian Robinson', 'Jessica Scott', 'William Young',
      'Susan Hall', 'Paul King', 'Karen Adams', 'Mark Baker',
      'Margaret Gonzalez', 'Steven Nelson', 'Donna Lee', 'Kenneth Perez',
    ];
  
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomGenre = genres[Math.floor(Math.random() * genres.length)];
  
    const randomCredits = roles.map((role) => ({
      role,
      name: Math.random() > 0.3 ? persons[Math.floor(Math.random() * persons.length)] : '', // 30% chance to leave empty
    }));
  
    this.movieData = {
      title: randomTitle,
      genre: randomGenre,
      credits: randomCredits,
    };
  }
  
  updateCredits(updatedCredits: { role: string; name: string }[]): void {
    console.log('Updating Credits in HomeComponent:', updatedCredits);
    this.movieData.credits = updatedCredits;
  }
  
  
}