import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-plant-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ isEdit ? 'Editar' : 'Crear' }} planta</h2>
    <mat-dialog-content>
      <form (ngSubmit)="onSubmit()">
        <mat-form-field>
          <input matInput placeholder="Nombre planta" [(ngModel)]="plant.name" name="name" required>
        </mat-form-field>
        <mat-form-field>
          <input matInput placeholder="País" [(ngModel)]="plant.country" name="country" required>
        </mat-form-field>
        <mat-form-field>
          <input matInput type="number" placeholder="Cantidad de lecturas" [(ngModel)]="plant.readings" name="readings" required>
        </mat-form-field>
        <mat-form-field>
          <input matInput type="number" placeholder="Alertas medias" [(ngModel)]="plant.mediumAlerts" name="mediumAlerts" required>
        </mat-form-field>
        <mat-form-field>
          <input matInput type="number" placeholder="Alertas rojas" [(ngModel)]="plant.redAlerts" name="redAlerts" required>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="dialogRef.close()">Cancelar</button>
      <button mat-raised-button color="primary" (click)="onSubmit()">{{ isEdit ? 'Actualizar' : 'Crear' }}</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-form-field {
      width: 100%;
      margin-bottom: 15px;
    }
  `]
})
export class PlantFormComponent {
  plant: any = {};
  isEdit: boolean;

  constructor(
    public dialogRef: MatDialogRef<PlantFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService
  ) {
    this.isEdit = !!data;
    if (this.isEdit) {
      this.plant = {...data};
    }
  }

  onSubmit() {
    if (this.isEdit) {
      this.apiService.updatePlant(this.plant.id, this.plant).subscribe(
        () => this.dialogRef.close(true),
        error => console.error('Error updating plant', error)
      );
    } else {
      this.apiService.createPlant(this.plant).subscribe(
        () => this.dialogRef.close(true),
        error => console.error('Error creating plant', error)
      );
    }
  }
}