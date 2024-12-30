import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, Input, OnChanges, QueryList, ViewChildren } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

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
  @ViewChildren('nameInput') nameInputs!: QueryList<ElementRef>;

  requiredRoles: string[] = ['Director', 'Producer', 'Music Composer', 'Screenwriter'];
  tableData: { role: string; name: string }[] = [];
  editingIndex: number | null = null;
  private shouldFocus = false;

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
      const matchedEntry = this.dataSource.find((entry) => entry.role === role);
      return {
        role,
        name: matchedEntry?.name || 'Missing Data',
      };
    });
  }

  startEditing(index: number): void {
    this.editingIndex = index;
    this.shouldFocus = true;
  
    // Use setTimeout to ensure DOM updates
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
    this.editingIndex = null;
  }
}
