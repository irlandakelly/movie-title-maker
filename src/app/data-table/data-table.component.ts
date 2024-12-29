import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent {
  @Input() dataSource: any[] = [];
  @Input() displayedColumns: string[] = [];
}
