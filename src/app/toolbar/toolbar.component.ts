import { Component, EventEmitter, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  imports: [MatToolbarModule, MatButtonModule],
})
export class ToolbarComponent {
  constructor(public homeService: HomeService) {}
  @Output() saveClick = new EventEmitter<void>();

  title = 'Movie Title Maker';

  onSaveClick(): void {
    this.saveClick.emit();
  }
}
