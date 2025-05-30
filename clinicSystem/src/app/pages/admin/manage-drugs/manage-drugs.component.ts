import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Drug } from '../../../core/models/durg.model';
import { DrugService } from '../../../core/services/Drug/drug.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manage-drugs',
  imports: [RouterModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './manage-drugs.component.html',
  styleUrl: './manage-drugs.component.scss'
})
export class ManageDrugsComponent {
drugs: Drug[] = [];
  drugForm: FormGroup;
  isEditing = false;
  editDrugId: number | null = null;
  loading = false;
  errorMessage = '';

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
        this.drugs = data;
      },
      error: (err) => {
        this.errorMessage = 'حدث خطأ أثناء جلب قائمة الأدوية';
      }
    });
  }

  onSubmit() {
  if (this.drugForm.invalid) return;

  this.loading = true;

  if (this.isEditing && this.editDrugId !== null) {
    // تحديث دواء
    const updatedDrug: Drug = {
      id: this.editDrugId,
      name: this.drugForm.value.name
    };

    this.drugService.update(this.editDrugId, updatedDrug).subscribe({
      next: () => {
        this.loading = false;
        this.isEditing = false;
        this.editDrugId = null;
        this.drugForm.reset();
        this.loadDrugs();
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'فشل تحديث الدواء';
      }
    });

  } else {
    // توليد ID جديد بناءً على أعلى ID موجود
    const maxId = this.drugs.length > 0 ? Math.max(...this.drugs.map(d => d.id)) : 0;
    const newDrug: Drug = {
      id: maxId + 1,
      name: this.drugForm.value.name
    };

    this.drugService.add(newDrug).subscribe({
      next: () => {
        this.loading = false;
        this.drugForm.reset();
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
}
