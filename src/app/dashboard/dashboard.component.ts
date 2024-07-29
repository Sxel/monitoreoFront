import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { MatCardModule } from '@angular/material/card';
import { PlantListComponent } from '../plant-list/plant-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, PlantListComponent],
  template: `
    <div class="dashboard">
      <h1>Monitoreo global</h1>
      <div class="metrics">
        <mat-card class="metric" *ngFor="let metric of metrics">
          <mat-card-content>
            <span class="metric-title">{{ metric.title }}</span>
            <span class="metric-value">{{ metric.value }}</span>
          </mat-card-content>
        </mat-card>
      </div>
      <app-plant-list></app-plant-list>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 20px;
    }
    .metrics {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    .metric {
      flex: 1;
      margin: 0 10px;
      text-align: center;
    }
    .metric-title {
      font-size: 14px;
      color: #666;
    }
    .metric-value {
      font-size: 24px;
      font-weight: bold;
      display: block;
      margin-top: 10px;
    }
  `]
})
export class DashboardComponent implements OnInit {
  metrics: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getMonitoringData();
  }

  getMonitoringData() {
    this.apiService.getMonitoringData().subscribe(
      (data) => {
        this.metrics = [
          { title: 'Lecturas OK', value: data.totalReadings },
          { title: 'Alertas medias', value: data.totalMediumAlerts },
          { title: 'Alertas rojas', value: data.totalRedAlerts },
          { title: 'Sensores deshabilitados', value: data.disabledSensorsCount }
        ];
      },
      (error) => {
        console.error('Error fetching monitoring data:', error);
      }
    );
  }
}