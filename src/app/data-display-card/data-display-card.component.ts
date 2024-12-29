import { Component, Input } from '@angular/core';
import { DataTableComponent } from '../data-table/data-table.component';

@Component({
  selector: 'app-data-display-card',
  standalone: true,
  templateUrl: './data-display-card.component.html',
  styleUrls: ['./data-display-card.component.scss'],
  imports: [DataTableComponent],
})
export class DataDisplayCardComponent {
  @Input() tableData: any[] = [];
  @Input() tableColumns: string[] = [];
}
