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
  templateUrl: './plant-form.component.html',
  styleUrls:['./plant-form.component.css'], 
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
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