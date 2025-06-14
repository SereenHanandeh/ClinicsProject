import { Component } from '@angular/core';
import { Diagnosis } from '../../../core/models/diagnosis.model';
import { DiagnosisService } from '../../../core/services/diagnosis/diagnosis.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from "../../../shared/pips/translate.pipe";
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-manage-diagnoses',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslatePipe, ToastModule],
  providers: [MessageService],
  templateUrl: './manage-diagnoses.component.html',
  styleUrls: ['./manage-diagnoses.component.scss']
})
export class ManageDiagnosesComponent {
  diagnoses: Diagnosis[] = [];
  newDiagnosis: Diagnosis = { id: 0, name: '' };
  editDiagnosisId: number | null = null;
  editName: string = '';

  // Search
  showSearch: boolean = true;
  searchTerm: string = '';

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(
    private diagnosisService: DiagnosisService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadDiagnoses();
  }

  loadDiagnoses(): void {
    this.diagnosisService.getAll().subscribe({
      next: (data) => {
        this.diagnoses = data;
        this.currentPage = 1;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Diagnoses loaded successfully'
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load diagnoses'
        });
      }
    });
  }

  addDiagnosis(): void {
    if (!this.newDiagnosis.name.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please enter a diagnosis name'
      });
      return;
    }

    const maxId = this.diagnoses.length > 0 ? Math.max(...this.diagnoses.map(d => d.id)) : 0;
    const diagnosisToAdd: Diagnosis = {
      id: maxId + 1,
      name: this.newDiagnosis.name.trim()
    };

    this.diagnosisService.add(diagnosisToAdd).subscribe({
      next: (d) => {
        this.diagnoses.push(d);
        this.newDiagnosis = { id: 0, name: '' };
        this.currentPage = this.totalPages;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Diagnosis added successfully'
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to add diagnosis'
        });
      }
    });
  }

deleteDiagnosis(id: number): void {
  this.diagnosisService.delete(id).subscribe({
    next: () => {
      this.diagnoses = this.diagnoses.filter(d => d.id !== id);
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Diagnosis deleted successfully'
      });
    },
    error: () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to delete diagnosis'
      });
    }
  });
}


  onConfirmDelete(id: number): void {
    this.diagnosisService.delete(id).subscribe({
      next: () => {
        this.diagnoses = this.diagnoses.filter(d => d.id !== id);
        if (this.currentPage > this.totalPages) {
          this.currentPage = this.totalPages;
        }
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Diagnosis deleted successfully'
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete diagnosis'
        });
      }
    });
    this.messageService.clear('confirm');
  }

  onRejectDelete(): void {
    this.messageService.clear('confirm');
  }

  startEdit(diagnosis: Diagnosis): void {
    this.editDiagnosisId = diagnosis.id;
    this.editName = diagnosis.name;
  }

  saveEdit(): void {
    if (this.editDiagnosisId === null) return;
    
    if (!this.editName.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please enter a diagnosis name'
      });
      return;
    }

    const updated: Diagnosis = { id: this.editDiagnosisId, name: this.editName.trim() };
    this.diagnosisService.update(updated.id, updated).subscribe({
      next: () => {
        const index = this.diagnoses.findIndex(d => d.id === updated.id);
        if (index !== -1) this.diagnoses[index] = updated;
        this.cancelEdit();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Diagnosis updated successfully'
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update diagnosis'
        });
      }
    });
  }

  cancelEdit(): void {
    this.editDiagnosisId = null;
    this.editName = '';
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.searchTerm = '';
      this.currentPage = 1;
    }
  }

  get filteredDiagnoses(): Diagnosis[] {
    if (!this.searchTerm.trim()) {
      return this.diagnoses;
    }
    const term = this.searchTerm.trim().toLowerCase();
    return this.diagnoses.filter(d => d.name.toLowerCase().includes(term));
  }

  get pagedDiagnoses(): Diagnosis[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredDiagnoses.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredDiagnoses.length / this.itemsPerPage) || 1;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}