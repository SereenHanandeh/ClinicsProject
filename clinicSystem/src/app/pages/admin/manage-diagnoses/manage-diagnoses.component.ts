import { Component } from '@angular/core';
import { Diagnosis } from '../../../core/models/diagnosis.model';
import { DiagnosisService } from '../../../core/services/diagnosis/diagnosis.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manage-diagnoses',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './manage-diagnoses.component.html',
  styleUrl: './manage-diagnoses.component.scss'
})
export class ManageDiagnosesComponent {
diagnoses: Diagnosis[] = [];
  newDiagnosis: Diagnosis = { id: 0, name: '' };
  editDiagnosisId: number | null = null;
  editName: string = '';

  constructor(private diagnosisService: DiagnosisService) {}

  ngOnInit(): void {
    this.loadDiagnoses();
  }

  loadDiagnoses(): void {
    this.diagnosisService.getAll().subscribe(data => {
      this.diagnoses = data;
    });
  }

  addDiagnosis(): void {
    if (!this.newDiagnosis.name.trim()) return;
    this.diagnosisService.add(this.newDiagnosis).subscribe(d => {
      this.diagnoses.push(d);
      this.newDiagnosis = { id: 0, name: '' };
    });
  }

  deleteDiagnosis(id: number): void {
    this.diagnosisService.delete(id).subscribe(() => {
      this.diagnoses = this.diagnoses.filter(d => d.id !== id);
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
}
