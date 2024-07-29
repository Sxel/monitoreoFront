import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { PlantFormComponent } from '../plant-form/plant-form.component';

@Component({
  selector: 'app-plant-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatDialogModule],
  template: `
    <div class="plant-list">
      <h2>Plantas</h2>
      <button mat-raised-button color="primary" (click)="openCreatePlantDialog()">+ Crear nueva planta</button>
      <table mat-table [dataSource]="plants" class="mat-elevation-z8">
        <ng-container matColumnDef="country">
          <th mat-header-cell *matHeaderCellDef>País</th>
          <td mat-cell *matCellDef="let plant">
            <img [src]="plant.flag" alt="Flag" class="country-flag"> {{ plant.country }}
          </td>
        </ng-container>
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Nombre de la planta</th>
          <td mat-cell *matCellDef="let plant">{{ plant.name }}</td>
        </ng-container>
        <ng-container matColumnDef="readings">
          <th mat-header-cell *matHeaderCellDef>Lecturas</th>
          <td mat-cell *matCellDef="let plant">{{ plant.readings }}</td>
        </ng-container>
        <ng-container matColumnDef="mediumAlerts">
          <th mat-header-cell *matHeaderCellDef>Alertas medias</th>
          <td mat-cell *matCellDef="let plant">{{ plant.mediumAlerts }}</td>
        </ng-container>
        <ng-container matColumnDef="redAlerts">
          <th mat-header-cell *matHeaderCellDef>Alertas rojas</th>
          <td mat-cell *matCellDef="let plant">{{ plant.redAlerts }}</td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Acciones</th>
          <td mat-cell *matCellDef="let plant">
            <button mat-button color="primary" (click)="openEditPlantDialog(plant)">Editar</button>
            <button mat-button color="warn" (click)="deletePlant(plant.id)">Eliminar</button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styles: [`
    .plant-list {
      padding: 20px;
    }
    table {
      width: 100%;
      margin-top: 20px;
    }
    .country-flag {
      width: 20px;
      margin-right: 5px;
    }
  `]
})
export class PlantListComponent implements OnInit {
  plants: any[] = [];
  displayedColumns: string[] = ['country', 'name', 'readings', 'mediumAlerts', 'redAlerts', 'actions'];

  constructor(private apiService: ApiService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadPlants();
  }

  loadPlants() {
    this.apiService.getPlants().subscribe(
      data => this.plants = data,
      error => console.error('Error fetching plants', error)
    );
  }

  openCreatePlantDialog() {
    const dialogRef = this.dialog.open(PlantFormComponent, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPlants();
      }
    });
  }

  openEditPlantDialog(plant: any) {
    const dialogRef = this.dialog.open(PlantFormComponent, {
      width: '400px',
      data: plant
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPlants();
      }
    });
  }

  deletePlant(id: number) {
    if (confirm('¿Está seguro de que desea eliminar esta planta?')) {
      this.apiService.deletePlant(id).subscribe(
        () => this.loadPlants(),
        error => console.error('Error deleting plant', error)
      );
    }
  }
}