import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatButtonModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnChanges {
  @Input() dataSource: { role: string; name: string }[] = [];
  @Input() displayedColumns: string[] = ['role', 'name'];

  requiredRoles: string[] = ['Director', 'Producer', 'Music Composer', 'Screenwriter'];
  tableData: { role: string; name: string }[] = [];

  ngOnChanges(): void {
    this.generateTableData();
  }

  generateTableData(): void {
    // Map required roles to fixed table rows
    this.tableData = this.requiredRoles.map((role) => {
      const matchedEntry = this.dataSource.find((entry) => entry.role === role);
      return {
        role,
        name: matchedEntry?.name || 'Missing Data', // Placeholder if name is missing
      };
    });
  }
}
