import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataTableComponent } from '../data-table/data-table.component';

@Component({
  selector: 'app-data-display',
  standalone: true,
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.scss'],
  imports: [DataTableComponent],
})
export class DataDisplayComponent {
  @Input() tableData: { role: string; name: string }[] = [];
  @Input() tableColumns: string[] = [];
  @Output() dataChange = new EventEmitter<{ role: string; name: string }[]>();

  onDataChange(updatedData: { role: string; name: string }[]): void {
    console.log('DataDisplay emitting:', updatedData);
    this.dataChange.emit(updatedData);
  }
}
