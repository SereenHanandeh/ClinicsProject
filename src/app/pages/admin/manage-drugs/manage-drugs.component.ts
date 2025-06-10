import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Drug } from '../../../core/models/durg.model';
import { DrugService } from '../../../core/services/Drug/drug.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from "../../../shared/pips/translate.pipe";

@Component({
  selector: 'app-manage-drugs',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './manage-drugs.component.html',
  styleUrl: './manage-drugs.component.scss'
})
export class ManageDrugsComponent {
  allDrugs: Drug[] = [];        // جميع الأدوية
  filteredDrugs: Drug[] = [];   // الأدوية بعد التصفية
  paginatedDrugs: Drug[] = [];  // الأدوية في الصفحة الحالية

  drugForm: FormGroup;
  isEditing = false;
  editDrugId: number | null = null;
  loading = false;
  errorMessage = '';
  searchTerm: string = '';

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  constructor(private drugService: DrugService, private fb: FormBuilder) {
    this.drugForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadDrugs();
  }

  loadDrugs() {
    this.drugService.getAll().subscribe({
      next: (data) => {
        this.allDrugs = data;
        this.filterDrugs(); // تصفية مبدئية (بدون بحث)
      },
      error: () => {
        this.errorMessage = 'حدث خطأ أثناء جلب قائمة الأدوية';
      }
    });
  }

  filterDrugs() {
    const term = this.searchTerm.trim().toLowerCase();

    if (term) {
      this.filteredDrugs = this.allDrugs.filter(d =>
        d.name.toLowerCase().includes(term)
      );
    } else {
      this.filteredDrugs = [...this.allDrugs];
    }

    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredDrugs.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedDrugs = this.filteredDrugs.slice(start, end);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }

  onSubmit() {
    if (this.drugForm.invalid) return;
    this.loading = true;

    if (this.isEditing && this.editDrugId !== null) {
      const updatedDrug: Drug = {
        id: this.editDrugId,
        name: this.drugForm.value.name
      };

      this.drugService.update(this.editDrugId, updatedDrug).subscribe({
        next: () => {
          this.loading = false;
          this.resetForm();
          this.loadDrugs();
        },
        error: () => {
          this.loading = false;
          this.errorMessage = 'فشل تحديث الدواء';
        }
      });

    } else {
      const maxId = this.allDrugs.length > 0 ? Math.max(...this.allDrugs.map(d => d.id)) : 0;
      const newDrug: Drug = {
        id: maxId + 1,
        name: this.drugForm.value.name
      };

      this.drugService.add(newDrug).subscribe({
        next: () => {
          this.loading = false;
          this.resetForm();
          this.loadDrugs();
        },
        error: () => {
          this.loading = false;
          this.errorMessage = 'فشل إضافة الدواء';
        }
      });
    }
  }

  editDrug(drug: Drug) {
    this.isEditing = true;
    this.editDrugId = drug.id;
    this.drugForm.patchValue({
      name: drug.name
    });
  }

  cancelEdit() {
    this.resetForm();
  }

  resetForm() {
    this.isEditing = false;
    this.editDrugId = null;
    this.drugForm.reset();
    this.errorMessage = '';
  }

  deleteDrug(id: number) {
    if (!confirm('هل أنت متأكد من حذف هذا الدواء؟')) return;

    this.drugService.delete(id).subscribe({
      next: () => {
        this.loadDrugs();
      },
      error: () => {
        this.errorMessage = 'فشل حذف الدواء';
      }
    });
  }
  onSearchChange() {
  this.filterDrugs();
}

}
