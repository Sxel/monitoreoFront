import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-sensor-metrics',
  standalone: true,
  templateUrl: './sensor-metrics.component.html',
  styleUrls: ['./sensor-metrics.component.css'],
  imports: [CommonModule, MatCardModule, MatIconModule]
})
export class SensorMetricsComponent implements OnInit {
  sensorMetrics: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getSensorMetrics();
  }

  getSensorMetrics() {
    this.apiService.getSensorMetrics().subscribe(
      (data) => {
        this.sensorMetrics = data;
      },
      (error) => {
        console.error('Error fetching sensor metrics:', error);
        this.sensorMetrics = [
          { title: 'Temperatura', icon: 'thermostat', okValue: 100, warningValue: 20, dangerValue: 3 },
          { title: 'Presión', icon: 'speed', okValue: 100, warningValue: 20, dangerValue: 3 },
          { title: 'Viento', icon: 'air', okValue: 100, warningValue: 20, dangerValue: 3 },
          { title: 'Niveles', icon: 'waves', okValue: 100, warningValue: 20, dangerValue: 3 },
          { title: 'Energía', icon: 'show_chart', okValue: 100, warningValue: 20, dangerValue: 3 },
          { title: 'Tensión', icon: 'bolt', okValue: 100, warningValue: 20, dangerValue: 3 },
          { title: 'Monóxido de carbono', icon: 'cloud', okValue: 100, warningValue: 20, dangerValue: 3 },
          { title: 'Otros gases', icon: 'bubble_chart', okValue: 100, warningValue: 20, dangerValue: 3 }
        ];
      }
    );
  }
}