import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, OnChanges, Output, QueryList, ViewChildren } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatButtonModule, MatIconModule, FormsModule, MatInputModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnChanges, AfterViewChecked {
  @Input() dataSource: { role: string; name: string }[] = [];
  @Input() displayedColumns: string[] = ['role', 'name', 'edit'];
  @Output() dataChange = new EventEmitter<{ role: string; name: string }[]>();
  @ViewChildren('nameInput') nameInputs!: QueryList<ElementRef>;

  requiredRoles: string[] = ['Director', 'Producer', 'Screenwriter', 'Music Composer'];
  tableData: { role: string; name: string }[] = [];
  editingIndex: number | null = null;
  private shouldFocus = false;

  constructor(private homeService: HomeService) {}

  ngOnChanges(): void {
    this.generateTableData();
    console.log('editingIndex', this.editingIndex);
  }

  ngAfterViewChecked(): void {
    if (this.shouldFocus && this.editingIndex !== null) {
      const inputToFocus = document.querySelector(`#input-${this.editingIndex}`) as HTMLInputElement;
      if (inputToFocus) {
        inputToFocus.focus();
        this.shouldFocus = false;
      }
    }
  }

  generateTableData(): void {
    this.tableData = this.requiredRoles.map((role) => {
      const match = this.dataSource.find((entry) => entry.role === role);
      return {
        role,
        name: match?.name || 'Missing Data',
      };
    });
  }

  startEditing(index: number): void {
    const row = this.tableData[index];
    if (row.name === 'Missing Data') {
      row.name = '';
    }
    this.editingIndex = index;
    this.shouldFocus = true;

    setTimeout(() => {
      const inputToFocus = document.querySelector(`#input-${index}`) as HTMLInputElement;
      if (inputToFocus) {
        inputToFocus.focus();
      }
    }, 0);
  }


  stopEditing(index: number): void {
    this.editingIndex = null;
  }

  updateName(index: number, newName: string): void {
    this.tableData[index].name = newName.trim() || 'Missing Data';
    this.syncDataSource();
    this.editingIndex = null;
    this.homeService.checkForMissingData(this.tableData);
  }

  syncDataSource(): void {
    this.dataSource = this.tableData.map((row) => ({ ...row }));
    this.dataChange.emit([...this.dataSource]);
  }

}
