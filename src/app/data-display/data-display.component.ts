import { Component, Input } from '@angular/core';
import { DataTableComponent } from '../data-table/data-table.component';

@Component({
  selector: 'app-data-display',
  standalone: true,
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.scss'],
  imports: [DataTableComponent],
})
export class DataDisplayComponent {
  @Input() tableData: any[] = [];
  @Input() tableColumns: string[] = [];
}
