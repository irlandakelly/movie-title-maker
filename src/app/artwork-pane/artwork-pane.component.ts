import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-artwork-pane',
  standalone: true,
  templateUrl: './artwork-pane.component.html',
  styleUrls: ['./artwork-pane.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class ArtworkPaneComponent {
  @Input() movieTitle: string = 'Movie Title';
  @Input() credits: { role: string; name: string }[] = [];
  @Input() genre: string = 'default'; // Default genre

  // Determine background image based on genre
  get backgroundImage(): string {
    const genreToImageMap: Record<string, string> = {
      horror: 'horror.png',
      romance: 'romance.png',
      scifi: 'scifi.png',
      suspense: 'suspense.png',
      default: 'default.png',
    };
    return genreToImageMap[this.genre] || 'default.png'; // Fallback to a default image
  }

  artworkStyle = {
    fontSize: '24px',
    color: '#FFF',
  };
}
