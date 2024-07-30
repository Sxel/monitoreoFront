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
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css'],
  imports: [CommonModule, MatTableModule, MatButtonModule, MatDialogModule]
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