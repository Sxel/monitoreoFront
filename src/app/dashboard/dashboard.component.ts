import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PlantListComponent } from '../plant-list/plant-list.component';
import { SensorMetricsComponent } from '../sensor-metrics/sensor-metrics.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, MatCardModule, MatIconModule, PlantListComponent, SensorMetricsComponent]
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
          { title: 'Lecturas OK', value: data.totalReadings, icon: 'check', iconClass: 'ok-icon' },
          { title: 'Alertas medias', value: data.totalMediumAlerts, icon: 'error', iconClass: 'warning-icon' },
          { title: 'Alertas rojas', value: data.totalRedAlerts, icon: 'warning', iconClass: 'danger-icon' },
          { title: 'Sensores deshabilitados', value: data.disabledSensorsCount, icon: 'close', iconClass: 'disabled-icon' }
        ];
      },
      (error) => {
        console.error('Error fetching monitoring data:', error);
      }
    );
  }
}