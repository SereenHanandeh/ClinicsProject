import { Component } from '@angular/core';
import { Diagnosis } from '../../../core/models/diagnosis.model';
import { DiagnosisService } from '../../../core/services/diagnosis/diagnosis.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from "../../../shared/pips/translate.pipe";

@Component({
  selector: 'app-manage-diagnoses',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslatePipe],
  templateUrl: './manage-diagnoses.component.html',
  styleUrls: ['./manage-diagnoses.component.scss']
})
export class ManageDiagnosesComponent {
  diagnoses: Diagnosis[] = [];
  newDiagnosis: Diagnosis = { id: 0, name: '' };
  editDiagnosisId: number | null = null;
  editName: string = '';

  // بحث
  showSearch: boolean = true;
  searchTerm: string = '';

  // صفحات
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private diagnosisService: DiagnosisService) {}

  ngOnInit(): void {
    this.loadDiagnoses();
  }

  loadDiagnoses(): void {
    this.diagnosisService.getAll().subscribe(data => {
      this.diagnoses = data;
      this.currentPage = 1; // رجع للصفحة الأولى عند تحميل البيانات
    });
  }

  addDiagnosis(): void {
    if (!this.newDiagnosis.name.trim()) return;

    const maxId = this.diagnoses.length > 0 ? Math.max(...this.diagnoses.map(d => d.id)) : 0;
    const diagnosisToAdd: Diagnosis = {
      id: maxId + 1,
      name: this.newDiagnosis.name.trim()
    };

    this.diagnosisService.add(diagnosisToAdd).subscribe(d => {
      this.diagnoses.push(d);
      this.newDiagnosis = { id: 0, name: '' };
      this.currentPage = this.totalPages; // إذا أضفنا عنصر جديد، نروح آخر صفحة تلقائياً
    });
  }

  deleteDiagnosis(id: number): void {
    this.diagnosisService.delete(id).subscribe(() => {
      this.diagnoses = this.diagnoses.filter(d => d.id !== id);
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages; // ضبط الصفحة لو حذفنا آخر عنصر في الصفحة
      }
    });
  }

  startEdit(diagnosis: Diagnosis): void {
    this.editDiagnosisId = diagnosis.id;
    this.editName = diagnosis.name;
  }

  saveEdit(): void {
    if (this.editDiagnosisId === null) return;
    const updated: Diagnosis = { id: this.editDiagnosisId, name: this.editName.trim() };
    this.diagnosisService.update(updated.id, updated).subscribe(() => {
      const index = this.diagnoses.findIndex(d => d.id === updated.id);
      if (index !== -1) this.diagnoses[index] = updated;
      this.cancelEdit();
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

  // فلترة التشخيصات حسب البحث
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
