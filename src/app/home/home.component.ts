import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UploadComponent } from '../upload/upload.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { DataDisplayComponent } from '../data-display/data-display.component';
import { CommonModule } from '@angular/common';
import { ArtworkPaneComponent } from '../artwork-pane/artwork-pane.component';
import { HomeService } from '../services/home.service';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MatCardModule, ToolbarComponent, UploadComponent, DataDisplayComponent, CommonModule, ArtworkPaneComponent],
})
export class HomeComponent {
  files: File[] = [];
  isSaveDisabled: boolean = true;

  get hasFiles(): boolean {
    return this.files && this.files.length > 0;
  }

  movieData = {
    title: '',
    genre: '',
    credits: [] as { role: string; name: string }[],
  };

  constructor(private homeService: HomeService) {
    this.generateMovieData();
    this.homeService.shouldShowAlert = true;
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
      name: Math.random() > 0.3 ? persons[Math.floor(Math.random() * persons.length)] : '',
    }));

    this.movieData = {
      title: randomTitle,
      genre: randomGenre,
      credits: randomCredits,
    };

    this.homeService.checkForMissingData(this.movieData.credits);
  }

  updateCredits(updatedCredits: { role: string; name: string }[]): void {
    this.movieData.credits = updatedCredits;
    this.homeService.checkForMissingData(this.movieData.credits);
  }

  downloadArtwork(): void {
    const artworkPane = document.querySelector('.artwork-container') as HTMLElement;
    if (artworkPane) {
      html2canvas(artworkPane).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'artwork.png';
        link.click();
      });
    }
  }
}